import axios from 'axios';
import { supabase } from '@/lib/supabaseClient';
import withCors from '@/cors';
import {
  MANTINE_BUTTON,
  MANTINE_BUTTON_STYLED,
  MANTINE_CALENDAR,
  MANTINE_FORM,
  TAILWIND_BUTTON,
  TAILWIND_BUTTON_STYLED,
  TAILWIND_CALENDAR,
  TAILWIND_FORM,
} from '@/constants';
import { cleanCode, removeTripleBackticksAndJsx } from '@/utils';

async function handler(req: any, res: any) {
  const { text, technology } = req.body;

  if (!text) {
    return res.status(500).json({ response: 'No prompt given' });
  }

  // Try to insert into Supabase, but continue even if it fails
  let logId = null;
  try {
    console.log('Attempting to insert into Supabase logs table...');
    const { data, error: insertError }: any = await supabase
      .from('logs')
      .insert([{ technology, prompt: text }])
      .select();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
    }

    if (data && Array.isArray(data) && data.length > 0) {
      logId = data[0].id;
      console.log('Successfully inserted log with ID:', logId);
    } else {
      console.warn('No data returned from Supabase insert, continuing without log ID');
    }
  } catch (dbError) {
    console.error('Exception during Supabase operation:', dbError);
    // Continue execution even if Supabase fails
  }

  const library = technology === 'tailwind' ? 'Tailwind CSS' : '@mantine/core';
  const backticks = '```';

  const systemMessage = `
You are a senior frontend developer writing production-ready React components.

Your task:
- Use the selected UI library (Tailwind CSS or @mantine/core)
- Write clean, elegant, responsive, and accessible JSX
- Prioritize visual hierarchy, spacing, and good UX principles
- Use semantic HTML where possible
- Never use external CSS files or libraries not explicitly mentioned
- Never wrap code with markdown, triple backticks, or explanations
- For images, use: https://source.unsplash.com/random
- Always return a single valid React functional component only
`.trim();

  const messages = [
    {
      role: 'system',
      content: systemMessage,
    },
    {
      role: 'user',
      content: `Create a React functional component + ${library} code for a Button, generate text on it. The functional component should not receive any props.`,
    },
    {
      role: 'assistant',
      content: technology === 'tailwind' ? TAILWIND_BUTTON : MANTINE_BUTTON,
    },
    {
      role: 'user',
      content: `Create a React functional component + ${library} code for a Button with black background, generate text on it. The functional component should not receive any props.`,
    },
    {
      role: 'assistant',
      content:
        technology === 'tailwind'
          ? TAILWIND_BUTTON_STYLED
          : MANTINE_BUTTON_STYLED,
    },
    {
      role: 'user',
      content: `Create a React functional component + ${library} code for a form, make it beautiful. The functional component should not receive any props.`,
    },
    {
      role: 'assistant',
      content: technology === 'tailwind' ? TAILWIND_FORM : MANTINE_FORM,
    },
    {
      role: 'user',
      content: `Create a React functional component + ${library} code for a calendar, make it beautiful. The functional component should not receive any props.`,
    },
    {
      role: 'assistant',
      content: technology === 'tailwind' ? TAILWIND_CALENDAR : MANTINE_CALENDAR,
    },
    {
      role: 'user',
      content: `Please write a visually elegant, responsive, and accessible React functional component using ${library}. Follow modern design practices: use semantic HTML, Tailwind utility classes for spacing and layout, and clean component structure. Do not wrap output in any markdown syntax. No text or comments—only the JSX component. Do not use any external CSS file or library.`,
    },
    { role: 'user', content: text },
  ];

  // Check if API key is available
  const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_CHATGPT_API_KEY;
  if (!apiKey) {
    console.error('OpenAI API key is missing');
    return res.status(500).json({ error: 'API key configuration error' });
  }

  try {
    console.log('Making request to OpenAI API...');
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [...messages],
        model: 'gpt-4-1106-preview',
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    
    console.log('Received response from OpenAI API');

    const code = response.data?.choices[0]?.message?.content || '';
    const codeWithoutBackticks = removeTripleBackticksAndJsx(code);
    const initialCode = cleanCode(codeWithoutBackticks);
    
    // Self-critique and improvement step
    console.log('Performing self-critique and improvement...');
    let finalCode = initialCode;
    
    try {
      // Create a critique prompt based on the technology
      const critiqueCriteria = technology === 'tailwind' ?
        "Rewrite this component to better follow Tailwind spacing and semantic layout conventions." :
        "Please review the following JSX component and suggest improvements in spacing, responsiveness, accessibility, or semantic structure.";
      
      const selfCritiqueResponse = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          messages: [
            {
              role: 'system',
              content: systemMessage,
            },
            {
              role: 'user',
              content: `${critiqueCriteria}\n\n${initialCode}`,
            },
          ],
          model: 'gpt-4-1106-preview',
          temperature: 0.5, // Lower temperature for more focused improvements
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      
      const improvedCode = selfCritiqueResponse.data?.choices[0]?.message?.content || '';
      const cleanImprovedCode = cleanCode(removeTripleBackticksAndJsx(improvedCode));
      
      // Only use the improved code if it's valid and not empty
      if (cleanImprovedCode && cleanImprovedCode.trim().length > 0) {
        finalCode = cleanImprovedCode;
        console.log('Self-critique improvements applied successfully');
      } else {
        console.log('Self-critique did not produce valid improvements, using original code');
      }
    } catch (critiqueError) {
      console.error('Error during self-critique process:', critiqueError);
      console.log('Using original code due to critique error');
      // Continue with the original code if the critique process fails
    }
    
    const codeWithoutExtraText = finalCode;

    // Only update the log if we have a valid logId
    if (logId) {
      try {
        await supabase
          .from('logs')
          .update({
            generated_code: codeWithoutExtraText,
            initial_code: initialCode, // Store the initial code before self-critique
            was_improved: initialCode !== finalCode, // Flag to indicate if improvements were made
          })
          .eq('id', logId);
      } catch (updateError) {
        console.error('Failed to update log with generated code:', updateError);
        // Continue even if update fails
      }
    }

    return res.status(200).json({
      response: codeWithoutExtraText,
      code_id: logId || 'temp-' + Date.now(), // Provide a fallback ID if Supabase failed
    });
  } catch (error: any) {
    console.error('Error in OpenAI API call:', error);
    
    // Provide more detailed error information
    let errorMessage = 'An unknown error occurred';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('OpenAI API error response:', error.response.data);
      errorMessage = error.response.data?.error?.message || 
                    `API error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from API server';
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message || 'Unknown error occurred';
    }
    
    return res.status(500).json({ error: errorMessage });
  }
}

export default withCors(handler);
