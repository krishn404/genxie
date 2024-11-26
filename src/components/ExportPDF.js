import React from 'react';

const ExportPDF = ({ onClick }) => {
  return (
    <button
      className="bg-gray-200 text-black px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      Export to PDF
    </button>
  );
};

export default ExportPDF; 