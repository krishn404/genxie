// import axios from 'axios';

// export const getFormattedDocument = async (prompt, pages) => {
//   const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
//   const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

//   const wordsPerPage = 500;
//   const totalWords = pages * wordsPerPage;

//   try {
//     const response = await axios.post(
//       url,
//       {
//         contents: [{ 
//           parts: [{ 
//             text: `Generate a well-formatted document with HTML tags for the following prompt: ${prompt}. 
//             The document should be approximately ${totalWords} words long to fill ${pages} A4 pages.
//             Include a title, introduction, main content with multiple sections, and a conclusion.
//             Use appropriate HTML tags for formatting and insert <div class="page-break"></div> tag 
//             approximately every ${wordsPerPage} words to create natural page breaks.
//             Format the content with proper headings, paragraphs, and lists to ensure good readability.`
//           }] 
//         }]
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         params: {
//           key: apiKey,
//         },
//       }
//     );

//     if (response.data && response.data.candidates && response.data.candidates[0].content) {
//       const formattedText = response.data.candidates[0].content.parts[0].text;
      
//       const processedText = formattedText
//         .replace(/<div class="page-break"><\/div>/g, '<p class="page-break">&nbsp;</p>')
//         .replace(/<h1>(.*?)<\/h1>/g, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
//         .replace(/<h2>(.*?)<\/h2>/g, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
//         .replace(/<p>/g, '<p class="mb-4">');

//       const styledHtml = `
//         <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//           ${processedText}
//         </div>
//       `;
      
//       const titleMatch = formattedText.match(/<h1.*?>(.*?)<\/h1>/);
//       const title = titleMatch ? titleMatch[1] : 'Generated Document';

//       return { 
//         formattedText: styledHtml,
//         title: title
//       };
//     } else {
//       throw new Error('Unexpected response structure');
//     }
//   } catch (error) {
//     console.error('Error generating document:', error);
//     return null;
//   }
// };


const generateDocument = async (prompt,pages) => {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt,
      pages
    }),
  });

  if (response.ok) {
    const data = await response.json();
 return data
  } else {
   throw new Error( response.json());
  }
};
