import React from 'react';

const templates = {
  Abstract: `# Abstract\n\n**Background:**\n\n**Methods:**\n\n**Results:**\n\n**Conclusion:**`,
  Synopsis: `# Synopsis\n\n**Introduction:**\n\n**Problem Statement:**\n\n**Literature Review:**\n\n**Proposed Solution:**\n\n**Project Scope:**\n\n**System Architecture:**\n\n**Modules and Functionalities:**\n\n**Database Design:**\n\n**Expected Results:**\n\n**Conclusion:**`,
  Resume: `# Resume\n\n**Contact Information:**\n\n**Objective:**\n\n**Education:**\n\n**Experience:**\n\n**Skills:**\n\n**References:**`,
  // Add more templates as needed
};

export default function DocumentTemplatePreview({ documentType }) {
  return (
    <div className="mt-4 p-4 border rounded-md bg-gray-100">
      <h2 className="text-lg font-bold">Template Preview</h2>
      <pre className="whitespace-pre-wrap">{templates[documentType] || 'Select a document type to see the template.'}</pre>
    </div>
  );
}