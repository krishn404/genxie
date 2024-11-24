import React from 'react';

const InlineToolbar = ({ position, onBold, onItalic }) => {
  return (
    <div
      className="inline-toolbar"
      style={{
        position: 'absolute',
        top: position.top,
        left: position.left,
        backgroundColor: 'white',
        border: '1px solid #ccc',
        padding: '5px',
        borderRadius: '5px',
        display: position.visible ? 'block' : 'none',
      }}
    >
      <button style={{ minWidth: '30px' }} onClick={onBold} title="Bold">B</button>
      <button style={{ minWidth: '30px' }} onClick={onItalic} title="Italic">I</button>
      {/* Add more buttons as needed */}
    </div>
  );
};

export default InlineToolbar;