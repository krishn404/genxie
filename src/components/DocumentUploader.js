import React from 'react';

const DocumentUploader = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="mb-4">
      <input
        type="file"
        accept=".docx"
        onChange={handleFileChange}
        className="border rounded-lg p-2"
      />
    </div>
  );
};

export default DocumentUploader; 