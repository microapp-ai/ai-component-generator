import { FC, useEffect, useState } from 'react';
import {
  Flex,
  Box,
  Text,
  Title,
  Collapse,
  useMantineColorScheme,
  Container,
  ActionIcon,
  Transition,
  CopyButton,
  Tooltip,
  MediaQuery,
} from '@mantine/core';
import Image from 'next/image';
import { getHotkeyHandler, useDisclosure } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import Lottie from 'lottie-react';
import {
  LoadingTextChanger,
  PromptButton,
  PromptInput,
} from '@/components';
import { reactLogo, tailwindLogo, loadingAnimation } from '@/assets';
import { supabase } from '@/lib/supabaseClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import CodePlayground from '@/components/CodePlayground';
import { LOADING_TEXTS } from '@/constants';
import { useRouter } from 'next/router';

interface HomeProps {
  code: string;
  prompt: string;
  generated_id: string;
}

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  code,
  prompt,
  generated_id,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [technology] = useState<string>('tailwind');
  const [promptInputValue, setPromptInputValue] = useState('');
  const [auxPromptValue, setAuxPromptValue] = useState('');
  const [data, setData] = useState<string>(
    'const MyComponent = () => <button>Hello!</button>; export default MyComponent;'
  );
  const [codeId, setCodeId] = useState<string>('');
  const [_, setCodeWasShown] = useState<boolean>(false);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const router = useRouter();

  useEffect(() => {
    if (code && generated_id) {
      // Only open the preview if we have a real generated_id (not empty string)
      setData(code);
      setPromptInputValue(prompt);
      setAuxPromptValue(prompt);
      open();
    }
  }, [code, open, prompt, generated_id]);

  const generateTextWithGpt = async () => {
    if (promptInputValue) {
      setIsLoading(true);
      setAuxPromptValue(promptInputValue);
      setCodeWasShown(false);
      close();

      try {
        console.log('Sending request to API with prompt:', promptInputValue);
        const response = await fetch(
          process.env.NODE_ENV === 'production'
            ? 'https://ai-component-generator-delta.vercel.app/api/magic'
            : '/api/magic',
          {
            method: 'POST',
            body: JSON.stringify({ text: promptInputValue, technology }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const responseJson = await response.json();
        console.log('API Response:', responseJson);
        
        const { response: generatedText, code_id, error } = responseJson;

        if (error) {
          console.error('API Error:', error);
          alert(`Error: ${error}`);
          setData('// Error generating component. Please try again.');
        } else if (generatedText !== 'No prompt given') {
          console.log('Setting generated code:', generatedText);
          setData(generatedText);
          setCodeId(code_id);
        }

        setTimeout(() => open(), 500);
        setCodeWasShown(true);
        setPromptInputValue('');
        setIsLoading(false);
      } catch (e: any) {
        console.error('Exception in API call:', e);
        setData('// Error: ' + (e.message || 'Unknown error'));
        setIsLoading(false);
        setPromptInputValue('');
      }
    }
  };

  return (
    <>
      <Box component="main" w="100%" h="100%">
        <Transition
          mounted={!opened}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(style) => (
            <Box style={style} mt={50}>
              <Title 
                order={1} 
                align="center" 
                weight={700} 
                size={48}
                sx={(theme) => ({
                  color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                  letterSpacing: '-0.5px',
                  fontFamily: '"Inter", sans-serif',
                })}
              >
                AI-Powered Component Generator
              </Title>
              <Title
                mt={16}
                order={2}
                align="center"
                weight={400}
                size={20}
                sx={(theme) => ({
                  color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[6],
                  lineHeight: 1.5,
                  fontFamily: '"Inter", sans-serif',
                })}
              >
                Create and preview <Image src={reactLogo} alt="react" />{' '}
                <Text span color={isDark ? '#fff' : '#202123'} weight={600}>
                  React
                </Text>{' '}
                + <Image src={tailwindLogo} alt="tailwind" />{' '}
                <Text span color={isDark ? '#fff' : '#202123'} weight={600}>
                  Tailwind CSS
                </Text>{' '}
                components using AI
              </Title>
            </Box>
          )}
        </Transition>

        <Transition
          mounted={isLoading}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(style) => (
            <Flex style={style} justify="center" align="center" gap="lg">
              <Lottie
                style={{ width: 290, marginTop: 60 }}
                animationData={loadingAnimation}
                loop
              />
              <LoadingTextChanger texts={LOADING_TEXTS} />
            </Flex>
          )}
        </Transition>

        <Box
          sx={{
            display: opened ? 'block' : 'none',
            height: 'calc(100vh - 120px)',
            width: '68%',
            position: 'fixed',
            top: '20px',
            right: '16px',
            zIndex: 100,
            padding: '0',
            borderLeft: '1px solid #eaeaea',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            marginBottom: '20px',
          }}
        >
          <CodePlayground 
            code={data} 
            title={auxPromptValue}
            externalResources={['https://cdn.tailwindcss.com']}
          />
        </Box>

        <Container 
          size="md" 
          mt={20} 
          mb={40}
          sx={{
            width: opened ? '28%' : '100%',
            transition: 'all 0.3s ease',
            paddingRight: opened ? '0' : undefined,
            marginLeft: opened ? '16px' : 'auto',
            marginRight: opened ? '0' : 'auto',
          }}
        >
          <Transition
            mounted={!opened && !isLoading}
            transition="fade"
            duration={200}
            timingFunction="ease"
          >
            {(style) => (
              <Box style={style}>
                <Box
                  sx={(theme) => ({
                    maxWidth: '700px',
                    margin: '0 auto',
                    position: 'relative',
                  })}
                >
                  <Box sx={{ position: 'relative' }}>
                    <PromptInput
                      value={promptInputValue}
                      onChange={setPromptInputValue}
                      placeholder="Ask anything"
                      onKeyDown={getHotkeyHandler([
                        ['Enter', generateTextWithGpt],
                      ])}
                      size="md"
                      radius="xl"
                      autoFocus
                    />
                    
                    <Box sx={{ position: 'absolute', right: '12px', bottom: '12px' }}>
                      <PromptButton
                        onClick={generateTextWithGpt}
                        disabled={isLoading}
                        ariaLabel="generate component"
                        radius="xl"
                        iconSize={18}
                      />
                    </Box>
                  </Box>
                </Box>
                
                {/* Examples section */}
                <Box mt={30} sx={(theme) => ({
                  maxWidth: '700px',
                  margin: '0 auto',
                })}>
                  <Text 
                    size="sm" 
                    mb={16} 
                    sx={(theme) => ({
                      color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[6],
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500,
                      letterSpacing: '0.3px',
                    })}
                  >
                    Examples
                  </Text>
                  <Box sx={(theme) => ({
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '12px',
                  })}>
                    {[
                      'a responsive pricing table with 3 tiers',
                      'a dark mode toggle switch with animation',
                      'a testimonial carousel with avatar images',
                      'a contact form with validation',
                      'a product card with hover effects'
                    ].map((example, index) => (
                      <Box 
                        key={index} 
                        onClick={() => {
                          setPromptInputValue(example);
                        }}
                        sx={(theme) => ({
                          padding: '12px 16px',
                          cursor: 'pointer',
                          borderRadius: theme.radius.md,
                          border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                            transform: 'translateY(-2px)',
                            boxShadow: theme.colorScheme === 'dark' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.05)',
                          }
                        })}
                      >
                        <Text 
                          size="sm" 
                          sx={(theme) => ({
                            fontFamily: '"Inter", sans-serif',
                            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                          })}
                        >
                          {example}
                        </Text>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
          </Transition>
        </Container>
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  query,
}) => {
  const { id } = query;

  const fallbackCode = `const MyComponent = () => <button>Hello from fallback!</button>; export default MyComponent;`;

  if (id) {
    const { data }: any = await supabase.from('logs').select('*').eq('id', id);
    const code = data?.[0]?.generated_code || fallbackCode;
    const prompt = data?.[0]?.prompt || '';
    const generated_id = data?.[0]?.id || '';
    return {
      props: {
        code,
        prompt,
        generated_id,
      },
    };
  }

  return { props: { code: fallbackCode, prompt: '', generated_id: '' } };

};

export default Home;
