// components/DocumentTypeSelector.js

import React from 'react';

const documentTypes = [
  
  'Abstract',
  'Synopsis',
  'Resume',
  // Add more document types as needed
];

export default function DocumentTypeSelector({ selectedType, onChange }) {
  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Document Type:</label>
      <select
        value={selectedType}
        onChange={onChange}
        className="block w-full p-2 border rounded-md bg-gray-100"
      >
        {documentTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}
