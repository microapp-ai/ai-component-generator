import { FC } from 'react';
import Head from 'next/head';

const HeadSeo: FC = () => {
  return (
    <Head>
      <title>
        Microapp.ai - AI component generator using React + Tailwind CSS
      </title>
      <meta
        name="description"
        content="Create React + Tailwind CSS components using AI."
      />
      <meta
        name="keywords"
        content="AI, react, tailwind, mantine, ui, components"
      />
      <meta
        property="og:url"
        content="https://www.microapp.ai/component-generator"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Microapp.ai - AI component generator using React + Tailwind CSS"
      />
      <meta
        property="og:description"
        content="Create and Preview React + Tailwind CSS components using AI."
      />
      <meta
        property="og:image"
        content="https://ai-component-generator-delta.vercel.app/og.png"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="microapp.ai" />
      <meta
        property="twitter:url"
        content="https://www.microapp.ai/component-generator"
      />
      <meta
        name="twitter:title"
        content="Microapp.ai - AI component generator using React + Tailwind CSS"
      />
      <meta
        name="twitter:description"
        content="Create and Preview React + Tailwind CSS components using AI."
      />
      <meta
        name="twitter:image"
        content="https://ai-component-generator-delta.vercel.app/og.png"
      />
    </Head>
  );
};

export default HeadSeo;
