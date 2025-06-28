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
import { Sandpack } from '@codesandbox/sandpack-react';
import { getHotkeyHandler, useDisclosure } from '@mantine/hooks';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import Lottie from 'lottie-react';
import {
  LoadingTextChanger,
  PromptButton,
  PromptInput,
  HeadSeo,
} from '@/components';
import { reactLogo, tailwindLogo, loadingAnimation } from '@/assets';
import { supabase } from '@/lib/supabaseClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import ActionBar from '@/components/ActionBar';
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
    if (code) {
      setData(code);
      setPromptInputValue(prompt);
      setAuxPromptValue(prompt);
      open();
    }
  }, [code, open, prompt]);

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
      <HeadSeo />
      <Box component="main" w="100%" h="100%">
        <Transition
          mounted={!opened}
          transition="fade"
          duration={400}
          timingFunction="ease"
        >
          {(style) => (
            <Box style={style} mt={50}>
              <Title order={1} align="center" weight="bold" size={42}>
                AI-Powered Component Generator
              </Title>
              <Title
                mt={20}
                order={2}
                align="center"
                weight={400}
                size={26}
                color="#6F7175"
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

        <Collapse
          mt="xl"
          transitionDuration={400}
          transitionTimingFunction="linear"
          in={opened}
          sx={{
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', top: 5, right: 15, zIndex: 999 }}>
            <CopyButton value={data} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Code Copied' : 'Copy Code'}
                  withArrow
                  position="right"
                >
                  <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
                    {copied ? (
                      <IconCheck size="1rem" />
                    ) : (
                      <IconCopy size="1rem" />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Box>

          {data && typeof data === 'string' && data.trim() !== '' ? (
            <Sandpack
              key="1"
              template="react"
              theme={colorScheme}
              options={{
                rtl: true,
                showTabs: false,
                showInlineErrors: false,
                showLineNumbers: false,
                closableTabs: false,
                externalResources: ['https://cdn.tailwindcss.com'],
                editorHeight: 'calc(100vh - 250px)',
              }}
              files={{
                '/App.js': data,
              }}
              customSetup={{
                dependencies: {
                  'date-fns': '2.29.3',
                },
              }}
            />
          ) : (
            <Box p="md" bg="#f8d7da" style={{ borderRadius: 8, color: '#721c24', border: '1px solid #f5c6cb' }}>
              Unable to render code preview. Please check your input or try again.
            </Box>
          )}
        </Collapse>

        <Container size="sm" fluid mt={40}>
          <Transition
            mounted={!opened && !isLoading}
            transition="fade"
            duration={200}
            timingFunction="ease"
          >
            {(style) => (
              <Box style={style}>
                <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                  <Flex justify="center" align="center" direction="column">
                    <PromptInput
                      value={promptInputValue}
                      onChange={setPromptInputValue}
                      placeholder="e.g a tip calculator"
                      onKeyDown={getHotkeyHandler([
                        ['Enter', generateTextWithGpt],
                      ])}
                    />
                    <PromptButton
                      mt="md"
                      title="MAKE MAGIC"
                      onClick={generateTextWithGpt}
                      disabled={isLoading}
                      ariaLabel="generate component"
                    />
                  </Flex>
                </MediaQuery>

                <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
                  <Flex
                    justify="center"
                    align="flex-end"
                    p="md"
                    sx={{ border: '1px solid #D9D9D9', borderRadius: 120 }}
                  >
                    <Box w="78%">
                      <PromptInput
                        value={promptInputValue}
                        onChange={setPromptInputValue}
                        placeholder="e.g a tip calculator"
                        onKeyDown={getHotkeyHandler([
                          ['Enter', generateTextWithGpt],
                        ])}
                      />
                    </Box>

                    <Box w="22%" ml="xs">
                      <PromptButton
                        title="MAKE MAGIC"
                        onClick={generateTextWithGpt}
                        isLoading={isLoading}
                        ariaLabel="generate component"
                      />
                    </Box>
                  </Flex>
                </MediaQuery>
              </Box>
            )}
          </Transition>
        </Container>
      </Box>

      <Transition
        mounted={opened || isLoading}
        transition="fade"
        duration={300}
        timingFunction="ease"
      >
        {(style) => (
          <Container
            w="100%"
            size="lg"
            mb="sm"
            style={style}
            sx={{ position: 'fixed', bottom: 0, zIndex: 999 }}
          >
            <Flex justify="center" align="center">
              <ActionBar
                value={promptInputValue}
                onChange={setPromptInputValue}
                placeholder="e.g a tip calculator"
                onKeyDown={getHotkeyHandler([['Enter', generateTextWithGpt]])}
                onClick={generateTextWithGpt}
                inputSize="sm"
                disabled={isLoading}
                shareId={codeId || generated_id}
                prompt={auxPromptValue}
              />
            </Flex>
          </Container>
        )}
      </Transition>
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
