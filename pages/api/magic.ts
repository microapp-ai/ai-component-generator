import axios from 'axios';
import { supabase } from '@/lib/supabaseClient';
import withCors from '@/cors';
import {
  cleanCode,
  Component,
  ComponentType,
  getCode,
  removeTripleBackticksAndJsx,
} from '@/utils';

async function handler(req: any, res: any) {
  const { text, frontend, ui } = req.body;

  if (!text) {
    return res.status(500).json({ response: 'No prompt given' });
  }

  const { data }: any = await supabase
    .from('logs')
    .insert([{ technology: frontend, ui: ui, prompt: text }])
    .select();

  const uiLibrary = 'Tailwind CSS';
  const backticks = '```';
  let frontendTech;

  switch (frontend) {
    case 'svelte':
      frontendTech = Component.SVELTE;
      break;
    case 'vue':
      frontendTech = Component.VUE;
      break;
    default:
      frontendTech = Component.REACT;
      break;
  }

  const messages = [
    {
      role: 'system',
      content:
        'Assume you are a Frontend developer and you are generating code to be used in production environment. Only generate code without any explanations. If images are used, please use random images from unsplash using the url https://source.unsplash.com/random.',
    },
    {
      role: 'user',
      content: `Create a ${frontend} component + ${uiLibrary} code for a Button, generate text on it. The functional component should not receive any props.`,
    },
    {
      role: 'assistant',
      content: getCode(frontendTech, ComponentType.BUTTON),
    },
    {
      role: 'user',
      content: `Create a ${frontend} component + ${uiLibrary} code for a Button with indigo background, generate text on it. The functional component should not receive any props.`,
    },
    {
      role: 'assistant',
      content: getCode(frontendTech, ComponentType.BUTTON_STYLED),
    },
    {
      role: 'user',
      content: `Create a ${frontend} component + ${uiLibrary} code for a form, make it beautiful. The functional component should not receive any props.`,
    },
    {
      role: 'assistant',
      content: getCode(frontendTech, ComponentType.FORM),
    },
    {
      role: 'user',
      content: `Create a ${frontend} component + ${uiLibrary} code for a calendar, make it beautiful. The functional component should not receive any props.`,
    },
    {
      role: 'assistant',
      content: getCode(frontendTech, ComponentType.CALENDAR),
    },
    {
      role: 'user',
      content: `Please create the code that renders the following ${frontend} component, using the ${uiLibrary} UI library, return code only and DO NOT wrap the code with ${backticks}, ${backticks}jsx, triple backtick, triple backquote or any other string character. DO NOT use any external library other than the one that was provided. Return code only without any instructions or text, avoid using any theme from Mantine. Always return a ${frontend} component and do not import any external style css file`,
    },
    { role: 'user', content: text },
  ];

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        messages: [...messages],
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

    const code = response.data?.choices[0]?.message?.content || '';
    const codeWithoutBackticks = removeTripleBackticksAndJsx(code);
    const codeWithoutExtraText = cleanCode(codeWithoutBackticks);

    await supabase
      .from('logs')
      .update({
        generated_code: codeWithoutExtraText,
      })
      .eq('id', data[0].id);

    return res.status(200).json({
      response: codeWithoutExtraText,
      code_id: data[0].id,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export default withCors(handler);
