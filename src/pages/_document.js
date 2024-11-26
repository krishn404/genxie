import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Import Google Fonts for professional document editing */}
        <link
          href="https://fonts.googleapis.com/css2?family=Baskerville:ital,wght@0,400;0,700;1,400;1,700&family=Courier+Prime&family=Garamond:wght@400;700&family=Lora:wght@400;700&family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600;700&family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500;700&family=Source+Code+Pro:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
