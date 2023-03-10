import axios from 'axios';
import { supabase } from '@/lib/supabaseClient';
import withCors from '@/cors';

async function handler(req: any, res: any) {
  const { text, technology } = req.body;

  if (!text) {
    return res.status(500).json({ response: 'No prompt given' });
  }

  await supabase
    .from('logs')
    .insert([{ content: `${technology}-${text}`, type: 'prompt' }]);

  const library = technology === 'tailwind' ? 'tailwind css' : '@mantine/core';
  const backticks = '```';
  const assistantCode =
    technology === 'mantine'
      ? `
    import React from 'react';
    import { Button, Flex, TextInput, Text, Textarea } from '@matine/core';
    import { Calendar } from '@mantine/dates';

    const MyComponent = () => {
      return (
        <Flex direction="column" justify="center" align="center">
          <Calendar />
          <Text weight="bold">Hello World</Text>
          <Button color="dark">Click Me!</Button>
        </Flex>
      );
    };
    export default MyComponent;
  `
      : `
    import React from 'react';

    const MyComponent = () => {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-bold mb-4">Hello World</h1>
          <p className="text-lg mb-4">Welcome to my Next.js component using Tailwind CSS</p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">Click Me</button>
        </div>
      );
    };
    export default MyComponent;
  `;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [
          {
            role: 'system',
            content: 'You are a Frontend developer.',
          },
          {
            role: 'user',
            content: `Create a Next.js functional component + ${library} code for a Button, with dark background color, generate text on it. Please create a complete Next.js component. The functional component should not receive any props. Please return only code.`,
          },
          {
            role: 'assistant',
            content: assistantCode,
          },
          {
            role: 'user',
            content: `Please create the code that renders the following Next.js functional component, using the ${library} UI library, return code only and DO NOT wrap the code with ${backticks}, ${backticks}jsx, triple backtick, triple backquote or any other string character. Return code only without any instructions or text, avoid using any theme from Mantine. Always return a Next.js functional component. If images are used, please use random images from unsplash using the url https://source.unsplash.com/random.`,
          },
          { role: 'user', content: text },
        ],
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHATGPT_API_KEY}`,
        },
      }
    );

    return res
      .status(200)
      .json({ response: response.data.choices[0].message.content });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export default withCors(handler);
