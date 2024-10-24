import { useState } from 'react';
import { getFormattedDocument } from '../lib/gemini.js';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import RichTextEditor from '../components/RichTextEditor';
import DocumentTypeSelector from '../components/DocumentTypeSelector';
import PageSelector from '../components/PageSelector'; 
import { AppleStyleDock } from '../components/AppleStyleDock';
import Navbar from '../components/Navbar'; 

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

  const exportAsPDF = () => {
    const doc = new jsPDF();
    const htmlContent = documentContent || 'No content';
    doc.html(htmlContent, {
      callback: function (doc) {
        doc.save(`${documentTitle}.pdf`);
      },
      x: 10,
      y: 10,
    });
  };

  const convertHtmlToPlainText = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.innerText || tmp.textContent || '';
  };

  const exportAsDocx = async () => {
    const plainText = convertHtmlToPlainText(documentContent || 'No content');
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [new TextRun(plainText)],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${documentTitle}.docx`);
  };

  // Function to toggle the theme
const toggleTheme = () => {
    console.log('Theme toggled'); 
    setIsDarkTheme((prev) => !prev);
};


  return (
    <div className={`container mx-auto p-6 ${isDarkTheme ? 'bg-black' : 'bg-[#b9d8f2]'} min-h-screen flex flex-col`}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 flex-grow">
        {/* Left Side - Document Generator */}
        <div className="md:col-span-1 bg-white bg-opacity-80  h-[625px] backdrop-blur-md p-6 mt-8 rounded-lg shadow-2xl space-y-5 sticky top-0">
          <h2 className="text-xl font-bold mb-2">Document Generator</h2>
          <p className="text-sm text-gray-500 mb-4">Enter a prompt to generate a formatted document.</p>
          <textarea
            className="w-full h-64 p-4 border rounded-lg bg-gray-100 resize-none shadow-inner"
            placeholder="Enter your document prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          
          {/* <PageSelector pages={pages} setPages={setPages} /> */}

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

        {/* Right Side - Document Preview */}
        <div className="md:col-span-4 bg-[#F7F7F7] mt-8 bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-lg overflow-y-auto h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
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
            <div className="flex justify-between">
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

      <div className="flex justify-center mt-4 sticky bottom-0 bg-white"> 
        <Navbar onThemeToggle={toggleTheme} />
      </div>
    </div>
  );
}
