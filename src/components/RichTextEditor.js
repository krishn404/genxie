// src/components/RichTextEditor.js

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import React from 'react';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = ({ value, onChange }) => {
  return (
    <div className="bg-white border rounded-lg p-4 min-h-[300px] mb-4">
      <ReactQuill 
        value={value} 
        onChange={onChange} 
        modules={{
          toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            [{ 'align': [] }],
            ['clean'] // remove formatting button
          ],
        }}
        placeholder="Your content here..."
      />
    </div>
  );
};

export default RichTextEditor;
