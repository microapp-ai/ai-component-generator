import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
          {/* Add preload for critical JavaScript */}
          <link rel="preload" href="/_next/static/chunks/main.js" as="script" />
          <link rel="preload" href="/_next/static/chunks/webpack.js" as="script" />
          <link rel="preload" href="/_next/static/chunks/pages/_app.js" as="script" />
          <link rel="preload" href="/_next/static/chunks/pages/index.js" as="script" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
