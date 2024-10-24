import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import React, { useRef } from 'react';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const RichTextEditor = ({ value, onChange }) => {
  const quillRef = useRef(); // Create a ref for ReactQuill

  const modules = {
    toolbar: {
      container: [
        [{ 
          'header': [1, 2, false] 
        }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'font': [] }], // Added font style
        [{ 'size': ['small', false, 'large', 'huge'] }], // Added font size
        ['link', 'image'],
        [{ 'align': [] }],
        ['clean']
      ]
    },
    clipboard: {
      matchVisual: false,
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

  // Add a custom image handler
  const imageHandler = () => {
    if (quillRef.current && quillRef.current.getEditor) { // Check if quillRef is defined and has getEditor
      const editor = quillRef.current.getEditor(); // Get the editor instance
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const range = editor.getSelection();
          editor.insertEmbed(range.index, 'image', reader.result);
          editor.setSelection(range.index + 1);
        };
        reader.readAsDataURL(file);
      };
    }
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

        // Add custom image button functionality
        const imageButton = toolbar.querySelector('.ql-image');
        if (imageButton) {
          imageButton.onclick = imageHandler; // Call imageHandler directly
        }
      }
    };

    // Wait for toolbar to be rendered
    setTimeout(addTooltips, 100);
  }, [tooltipContent]); // Added tooltipContent as a dependency

  return (
    <div className="bg-gray-100 border rounded-lg p-4 mt-5 min-h-[500px] mb-4">
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
        ref={quillRef} // Attach the ref here
        value={value} 
        onChange={onChange} 
        modules={modules}
        placeholder="Your content here..."
        onRef={(instance) => { quillRef.current = instance }} // Ensure ref is set
      />
    </div>
  );
};

export default RichTextEditor;
