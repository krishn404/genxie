import { useState } from 'react';
import { getFormattedDocument } from '../lib/gemini';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [documentContent, setDocumentContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');

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
        setDocumentTitle(result.title || 'Generated Document Title'); // Set dynamic title from result or fallback
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
    const plainText = stripHtml(documentContent || 'No content');
    doc.text(plainText, 10, 10);
    doc.save(`${documentTitle}.pdf`); // Use documentTitle for saving
  };

  // Exporting the formatted content as DOCX
  const exportAsDocx = async () => {
    const plainText = stripHtml(documentContent || 'No content');
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
    saveAs(blob, `${documentTitle}.docx`); // Use documentTitle for saving
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side - Document Generator */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Document Generator</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter a prompt to generate a formatted document.
          </p>
          <textarea
            className="w-full h-64 p-4 border rounded-lg mb-4 bg-gray-100 resize-none"
            placeholder="Enter your document prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-4"
            placeholder="Enter document title..."
            value={documentTitle}
            onChange={(e) => setDocumentTitle(e.target.value)} // Input for document title
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
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              className="bg-gray-300 text-black px-4 py-2 rounded flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit
            </button>
          </div>
        </div>

        {/* Right Side - Document Preview */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-2">Document Preview</h2>
          <p className="text-sm text-gray-600 mb-4">
            This is how your document will be formatted.
          </p>
          <input
            type="text"
            className="w-full p-2 border rounded-lg mb-4"
            value={documentTitle} // Editable title for preview
            onChange={(e) => setDocumentTitle(e.target.value)} // Update title in real-time
          />
          <div className="bg-white border rounded-lg p-4 min-h-[300px] mb-4">
            {documentContent ? (
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: documentContent }} />
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold mb-4">Introduction</h1>
                <p className="mb-4">
                  This is a sample document generated based on the users prompt. The
                  content and formatting will adjust dynamically as the user updates
                  the prompt.
                </p>
                <h2 className="text-xl font-bold mb-2">Key Highlights</h2>
                <ul className="list-disc pl-5 mb-4">
                  <li>Clean, professional layout</li>
                  <li>Automatic formatting based on prompt</li>
                  <li>Export to PDF or DOCX</li>
                  <li>Edit document directly in the tool</li>
                </ul>
                <h2 className="text-xl font-bold mb-2">Conclusion</h2>
                <p>
                  This document generator tool provides a seamless experience for
                  creating professional-looking documents with minimal effort.
                </p>
              </div>
            )}
          </div>
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
