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

  const messages = [
    {
      role: 'system',
      content:
        'Assume you are a Frontend developer and you are generating code to be used in production environment. Only generate code without any explanations. If images are used, please use random images from unsplash using the url https://source.unsplash.com/random.',
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
      content: `Please create the code that renders the following React functional component, using the ${library} UI library, return code only and DO NOT wrap the code with ${backticks}, ${backticks}jsx, triple backtick, triple backquote or any other string character. DO NOT use any external library other than the one that was provided. Return code only without any instructions or text, avoid using any theme from Mantine. Always return a React functional component and do not import any external style css file`,
    },
    { role: 'user', content: text },
  ];

  try {
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
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_CHATGPT_API_KEY}`,
        },
      }
    );

    const code = response.data?.choices[0]?.message?.content || '';
    const codeWithoutBackticks = removeTripleBackticksAndJsx(code);
    const codeWithoutExtraText = cleanCode(codeWithoutBackticks);

    // Only update the log if we have a valid logId
    if (logId) {
      try {
        await supabase
          .from('logs')
          .update({
            generated_code: codeWithoutExtraText,
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
    return res.status(500).json({ error: error.message });
  }
}

export default withCors(handler);
