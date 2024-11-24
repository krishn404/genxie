// components/FormatHandler.js
import { useEffect } from 'react';

const formatConfig = {
  synopsis: {
    font: 'Times New Roman',
    fontSize: {
      body: 12,
      heading: 14
    },
    lineSpacing: 1.5,
    margins: '1 inch',
    sections: [
      'Introduction',
      'Problem Statement',
      'Literature Review',
      'Proposed Solution',
      'Project Scope',
      'System Architecture',
      'Modules and Functionalities',
      'Database Design',
      'Expected Results',
      'Conclusion'
    ],
    prompt: 'Create a detailed synopsis for the following topic:'
  },
  resume: {
    font: 'Arial',
    fontSize: {
      body: 11,
      heading: 14
    },
    lineSpacing: 1.15,
    margins: '0.5 inch',
    sections: [
      'Contact Information',
      'Objective',
      'Education',
      'Experience',
      'Skills',
      'References'
    ],
    prompt: 'Generate a professional resume for the following details:'
  },
  abstract: {
    font: 'Georgia',
    fontSize: {
      body: 12,
      heading: 14
    },
    lineSpacing: 1.5,
    margins: '1 inch',
    sections: [
      'Background',
      'Methods',
      'Results',
      'Conclusion'
    ],
    prompt: 'Summarize the following research in an abstract:'
  },
};

export default function FormatHandler({ documentType, setEditorContent }) {
  useEffect(() => {
    const format = formatConfig[documentType];

    if (!format) return;

    // Apply formatting (you can call setEditorContent or directly modify editor settings)
    // Set font, font size, and other configurations
    const formattedContent = format.sections.map(section => `# ${section}\n`).join('\n');

    // Use the specific prompt for the document type
    const prompt = format.prompt;

    // Assuming this function will add formatted content
    setEditorContent(`${prompt}\n\n${formattedContent}`);
  }, [documentType, setEditorContent]);

  return null;
}
