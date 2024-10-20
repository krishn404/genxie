import axios from 'axios';

export const getFormattedDocument = async (prompt) => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

  try {
    const response = await axios.post(
      url,
      {
        contents: [{ parts: [{ text: `Generate a well-formatted document with HTML tags for the following prompt: ${prompt}. Include a title, introduction, key points as a bullet list, and a conclusion. Use appropriate HTML tags for formatting.` }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          key: apiKey,
        },
      }
    );

    if (response.data && response.data.candidates && response.data.candidates[0].content) {
      const formattedText = response.data.candidates[0].content.parts[0].text;
      // Wrap the response in a div with some basic styling
      const styledHtml = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          ${formattedText}
        </div>
      `;
      return { formattedText: styledHtml };
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error generating document:', error);
    return null;
  }
};