import { useState } from 'react';
import { getFormattedDocument } from '../lib/gemini.js';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import RichTextEditor from '../components/RichTextEditor';
import DocumentTypeSelector from '../components/DocumentTypeSelector';
import { AppleStyleDock } from '../components/AppleStyleDock';
import Navbar from '../components/Navbar'; 
import html2canvas from 'html2canvas';

export default function DocumentGenerate() {
  const [prompt, setPrompt] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [documentType, setDocumentType] = useState('Report');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [pages, setPages] = useState(1);
  
  const generateDocument = async () => {
    if (!prompt) {
      alert('Please enter a prompt');
      return;
    }
    
    setIsLoading(true);
    try {
      const result = await getFormattedDocument(prompt, pages);
      
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

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const exportAsPDF = async () => {
    const doc = new jsPDF();
    const htmlContent = documentContent || 'No content';

    // Use the RichTextEditor content for better formatting
    const formattedContent = convertHtmlToPlainText(htmlContent); // Convert HTML to plain text for PDF
    const lines = doc.splitTextToSize(formattedContent, 190); // Adjust width as needed
    doc.text(lines, 10, 10);
    
    doc.save(`${documentTitle}.pdf`);
  };

  const convertHtmlToPlainText = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.innerText || tmp.textContent || '';
  };

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
              children: [new TextRun({ text: node.innerText, bold: true, size: 28 })],
            }));
            break;
          case 'H3':
            children.push(new Paragraph({
              children: [new TextRun({ text: node.innerText, bold: true, size: 24 })],
            }));
            break;
          case 'P':
            children.push(new Paragraph({
              children: [new TextRun(node.innerText)],
            }));
            break;
          case 'UL':
            Array.from(node.children).forEach((li) => {
              children.push(new Paragraph({
                children: [new TextRun(`• ${li.innerText}`)],
              }));
            });
            break;
          default:
            break;
        }
      }
    });

    return children;
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-black' : 'bg-[#b9d8f2]'}`}>
      <div className="container mx-auto p-6">
        <div className="flex gap-6">
          {/* Left Side - Document Generator - Now sticky */}
          <div className="w-1/5 flex-shrink-0">
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
          <div className="flex-grow">
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
    </div>
  );
}