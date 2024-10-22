import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import React from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = ({ value, onChange }) => {
  const modules = {
    toolbar: {
      container: [
        [{ 
          'header': [1, 2, false] 
        }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean']
      ]
    }
  };

  // Define tooltip contents
  const tooltipContent = {
    'header': 'Heading Style',
    'bold': 'Bold',
    'italic': 'Italic',
    'underline': 'Underline',
    'strike': 'Strikethrough',
    'list': 'List',
    'link': 'Insert Link',
    'image': 'Insert Image',
    'align': 'Text Alignment',
    'clean': 'Clear Formatting'
  };

  // Add tooltips after component mounts
  React.useEffect(() => {
    const addTooltips = () => {
      const toolbar = document.querySelector('.ql-toolbar');
      if (toolbar) {
        const buttons = toolbar.querySelectorAll('button');
        buttons.forEach(button => {
          // Get the format from the class name
          const format = Array.from(button.classList)
            .find(className => className.startsWith('ql-'))
            ?.replace('ql-', '');

          if (format && tooltipContent[format]) {
            // Add tooltip attributes
            button.setAttribute('title', tooltipContent[format]);
            
            // Add hover styles
            button.className = `${button.className} relative transition-all duration-200`;
            
            // Add hover styles with CSS
            button.style.cssText = `
              position: relative;
              cursor: pointer;
            `;

            // Add hover effect
            button.addEventListener('mouseenter', () => {
              button.style.backgroundColor = '#f3f4f6';
              button.style.borderRadius = '4px';
            });

            button.addEventListener('mouseleave', () => {
              button.style.backgroundColor = 'transparent';
            });
          }
        });
      }
    };

    // Wait for toolbar to be rendered
    setTimeout(addTooltips, 100);
  }, []);

  return (
    <div className="bg-white border rounded-lg p-4 min-h-[300px] mb-4">
      <style jsx global>{`
        .ql-toolbar button {
          padding: 4px 8px;
          margin: 2px;
        }
        
        .ql-toolbar button:hover {
          background-color: #f3f4f6;
          border-radius: 4px;
        }
      `}</style>
      <ReactQuill 
        value={value} 
        onChange={onChange} 
        modules={modules}
        placeholder="Your content here..."
      />
    </div>
  );
};

export default RichTextEditor;