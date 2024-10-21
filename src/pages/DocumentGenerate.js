import { useState } from 'react';
import { getFormattedDocument } from '../lib/gemini.js';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import RichTextEditor from '../components/RichTextEditor';
import DocumentTypeSelector from '../components/DocumentTypeSelector'; // Import the new component

export default function DocumentGenerate() {
  const [prompt, setPrompt] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [documentType, setDocumentType] = useState('Report'); // New state for document type

  // Function to generate the formatted document from the Gemini API
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

  // Function to strip HTML tags and decode entities
  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  // Exporting the formatted content as PDF
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

  // Function to convert HTML to plain text
  const convertHtmlToPlainText = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.innerText || tmp.textContent || '';
  };

  // Exporting the formatted content as DOCX
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

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Side - Document Generator */}
        <div className="md:col-span-1 bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-bold mb-2">Document Generator</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter a prompt to generate a formatted document.
          </p>
          <textarea
            className="w-full h-64 p-4 border rounded-lg bg-gray-100 resize-none"
            placeholder="Enter your document prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          {/* Document Type Selector */}
          <DocumentTypeSelector 
            selectedType={documentType} 
            onChange={(e) => setDocumentType(e.target.value)} 
          />

          <div className="flex space-x-2">
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={() => setPrompt('')}
            >
              Clear
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={generateDocument}
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </div>
  
        {/* Right Side - Document Preview */}
        <div className="md:col-span-4 bg-white p-6 rounded-lg shadow">
          <input
            type="text"
            className="text-2xl font-bold mb-2 w-full border-0 focus:ring-0"
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)}
            placeholder="Document Title"
          />
          <p className="text-sm text-gray-600 mb-4">
            Here you can see your formatted document.
          </p>
          <RichTextEditor 
            value={documentContent}
            onChange={setDocumentContent}
          />
          {documentContent && (
            <div className="flex justify-between">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={exportAsPDF}
              >
                Export to PDF
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded"
                onClick={exportAsDocx}
              >
                Export to DOCX
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
