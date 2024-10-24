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
    ]
  },
};

export default function FormatHandler({ documentType, setEditorContent }) {
  useEffect(() => {
    const format = formatConfig[documentType];

    if (!format) return;

    // Apply formatting (you can call setEditorContent or directly modify editor settings)
    // Set font, font size, and other configurations
    const formattedContent = format.sections.map(section => `# ${section}\n`).join('\n');

    // Assuming this function will add formatted content
    setEditorContent(formattedContent);
  }, [documentType, setEditorContent]);

  return null;
}
