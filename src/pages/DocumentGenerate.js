import { useState } from 'react';
import { getFormattedDocument } from '../lib/gemini.js';
import { jsPDF } from 'jspdf';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import RichTextEditor from '../components/RichTextEditor';
import DocumentTypeSelector from '../components/DocumentTypeSelector';
import DocumentUploader from '../components/DocumentUploader';
import { AppleStyleDock } from '../components/AppleStyleDock';
import Navbar from '../components/Navbar'; 
import InlineToolbar from '../components/InlineToolbar';
import mammoth from 'mammoth'; // Import mammoth for .docx conversion

export default function DocumentGenerate() {
  const [prompt, setPrompt] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [documentType, setDocumentType] = useState('Report');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0, visible: false });

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
        .then((result) => {
          setDocumentContent(result.value); // Set the HTML content to the editor
        })
        .catch((err) => {
          console.error("Error converting .docx to HTML:", err);
        });
    };
    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
  };

  const generateDocument = async () => {
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await getFormattedDocument(prompt);
      
      if (result && result.formattedText) {
        setDocumentContent(result.formattedText);
        setDocumentTitle(result.title || 'Generated Document Title'); 
      } else {
        setDocumentContent('Error: Could not generate document.');
      }
    } catch (error) {
      console.error('Error generating document:', error);
      setDocumentContent('Error: Could not generate document.');
    } finally {
      setIsLoading(false);
    }
  };

  // Define the toggleTheme function
  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  // Define the handleBold function
  const handleBold = () => {
    // Implement bold functionality
    // This is a placeholder; you should implement the actual logic to toggle bold formatting
    console.log("Bold action triggered");
  };

  // Define the handleItalic function
  const handleItalic = () => {
    // Implement italic functionality
    // This is a placeholder; you should implement the actual logic to toggle italic formatting
    console.log("Italic action triggered");
  };

  // Define the exportAsPDF function
  const exportAsPDF = async () => {
    const pdf = new jsPDF();
    pdf.text(documentContent || 'No content', 10, 10); // Add content to PDF
    pdf.save(`${documentTitle}.pdf`); // Save the PDF with the document title
  };

  // Define the exportAsDocx function
  const exportAsDocx = async () => {
    const doc = new Document({
      sections: [
        {
          children: parseHtmlToDocx(documentContent || 'No content'),
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${documentTitle}.docx`);
  };

  const parseHtmlToDocx = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;

    const children = [];
    Array.from(tmp.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        switch (node.tagName) {
          case 'H1':
            children.push(new Paragraph({
              children: [new TextRun({ text: node.innerText, bold: true, size: 32 })],
            }));
            break;
          case 'H2':
            children.push(new Paragraph({
              children: [new TextRun({ text: node.innerText, bold: true, size: 24 })],
            }));
            break;
          case 'P':
            children.push(new Paragraph({
              children: [new TextRun({ text: node.innerText })],
            }));
            break;
          default:
            break;
        }
      }
    });

    return children;
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-black' : 'bg-[#b9d8f2]'}`}>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Side - Document Generator - Now sticky */}
          <div className="w-full md:w-1/5 flex-shrink-0">
            <DocumentUploader onUpload={handleUpload} />
            <div className="sticky top-6 bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-2xl space-y-5">
              <h2 className="text-xl font-bold mb-2">Document Generator</h2>
              <p className="text-sm text-gray-500 mb-4">Enter a prompt to generate a formatted document.</p>
              <textarea
                className="w-full h-64 p-4 border rounded-lg bg-gray-100 resize-none shadow-inner"
                placeholder="Enter your document prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <DocumentTypeSelector 
                selectedType={documentType} 
                onChange={(e) => setDocumentType(e.target.value)} 
              />

              <div className="flex space-x-2">
                <button
                  className="bg-gray-200 text-black px-4 py-2 rounded-full shadow-sm transition-transform transform hover:scale-105"
                  onClick={() => setPrompt('')}
                >
                  Clear
                </button>
                <button
                  className="bg-[#f8b9b3] text-black px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
                  onClick={generateDocument}
                  disabled={isLoading}
                >
                  {isLoading ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Document Preview - Scrollable */}
          <div className="flex-grow w-full">
            <div className="bg-[#F7F7F7] bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg">
              <input
                type="text"
                className="text-2xl font-bold mb-2 w-full border-0 focus:ring-0 bg-transparent"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="Document Title"
              />
              <p className="text-sm text-gray-500 mb-4">Here you can see your formatted document.</p>
              <RichTextEditor 
                value={documentContent}
                onChange={setDocumentContent}
              />
              {documentContent && (
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-gray-200 text-black px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
                    onClick={exportAsPDF}
                  >
                    Export to PDF
                  </button>
                  <button
                    className="bg-gray-200 text-black px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
                    onClick={exportAsDocx}
                  >
                    Export to DOCX
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white">
        <Navbar onThemeToggle={toggleTheme} />
      </div>
      <InlineToolbar position={toolbarPosition} onBold={handleBold} onItalic={handleItalic} />
    </div>
  );
}