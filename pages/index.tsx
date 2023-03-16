import { FC, useEffect, useState } from 'react';
import {
  Flex,
  Button,
  Box,
  Text,
  Title,
  Collapse,
  Autocomplete,
  useMantineColorScheme,
  Container,
  Badge,
  ActionIcon,
  Loader,
  Transition,
  CopyButton,
  Tooltip,
} from '@mantine/core';
import Image from 'next/image';
import { Sandpack } from '@codesandbox/sandpack-react';
import { getHotkeyHandler, useDisclosure } from '@mantine/hooks';
import Head from 'next/head';
import { IconBrandTwitter, IconCheck, IconCopy } from '@tabler/icons-react';
import { TwitterShareButton } from 'next-share';
import { GradientColorText } from '@/components';
import { reactLogo, tailwindLogo } from '@/assets';
import { supabase } from '@/lib/supabaseClient';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

interface HomeProps {
  code: string;
  prompt: string;
}

const darkTextGradient = [
  '#F08080',
  '#FFA07A',
  '#FFDAB9',
  '#F0E68C',
  '#98FB98',
];
const lightTextGradient = ['#000', '#3f0d12', '#3a7bd5', '#00d2ff'];
const shareUrl = 'https://www.microapp.ai/ai-component-generator';

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  code,
  prompt,
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [technology] = useState<string>('tailwind');
  const [promptInputValue, setPromptInputValue] = useState('');
  const [data, setData] = useState<string>(
    'const MyComponent = () => <div />;'
  );
  const [codeId, setCodeId] = useState<string>('');
  const [_, setCodeWasShown] = useState<boolean>(false);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const twitterIcon = (
    <ActionIcon
      size="xs"
      color={isDark ? 'yellow' : 'indigo'}
      radius="xl"
      variant="transparent"
    >
      <IconBrandTwitter size={20} />
    </ActionIcon>
  );

  useEffect(() => {
    if (code) {
      setData(code);
      setPromptInputValue(prompt);
      open();
    }
  }, [code, open, prompt]);

  const generateTextWithGpt = async () => {
    if (promptInputValue) {
      setIsLoading(true);
      setCodeWasShown(false);
      close();

      try {
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

        const { response: generatedText, code_id } = await response.json();

        if (generatedText !== 'No prompt given') {
          setData(generatedText);
          setCodeId(code_id);
        }

        setTimeout(() => open(), 300);
        setCodeWasShown(true);
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
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
      <Box component="main" pb={40} mt={50} w="100%" h="100%">
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
          Create and preview React <Image src={reactLogo} alt="react" /> +
          Tailwind CSS <Image src={tailwindLogo} alt="tailwind" /> components
          using AI
        </Title>

        <Collapse
          mt="xl"
          transitionDuration={700}
          transitionTimingFunction="linear"
          in={opened}
          sx={{
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', bottom: 5, left: 5, zIndex: 999 }}>
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
          <Sandpack
            key="2"
            template="react"
            theme={colorScheme}
            options={{
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
        </Collapse>

        <Container size="sm" fluid mt="xl">
          <Flex justify="center" align="flex-end">
            <Box w="75%">
              <Autocomplete
                mt="xl"
                size="xl"
                withinPortal
                value={promptInputValue}
                onChange={setPromptInputValue}
                placeholder="e.g a tip calculator"
                data={[
                  {
                    value:
                      'a white board to draw with the mouse, a color picker and a reset button',
                    group: 'Most used',
                  },
                  { value: 'a mortgage calculator', group: 'Most used' },
                  { value: 'a tip calculator', group: 'Most used' },
                  { value: 'a password generator', group: 'Most used' },
                  { value: 'a calendar', group: 'Most used' },
                  { value: 'a product card', group: 'Most used' },
                ]}
                onKeyDown={getHotkeyHandler([['Enter', generateTextWithGpt]])}
              />
            </Box>

            <Box w="25%" ml="md">
              <Button
                mt={30}
                color="dark"
                onClick={generateTextWithGpt}
                disabled={isLoading}
                fullWidth
                size="xl"
                aria-label="generate component"
              >
                🪄 MAKE MAGIC
              </Button>
            </Box>
          </Flex>

          {isLoading && (
            <Transition
              mounted={isLoading}
              transition="fade"
              duration={400}
              timingFunction="ease"
            >
              {(style) => (
                <Flex style={style} mt="lg" justify="center" align="center">
                  <Loader
                    size="xs"
                    mr={4}
                    color={isDark ? 'yellow' : 'indigo'}
                  />
                  <Text weight="bold">
                    Please hang on while the AI is doing some magic 🎩🪄...
                  </Text>
                </Flex>
              )}
            </Transition>
          )}
        </Container>
      </Box>

      {(codeId || code) && (
        <Container size="xs" mb="lg">
          <Flex justify="center" align="center" gap="xs">
            <Badge
              sx={{ cursor: 'pointer' }}
              pl={8}
              size="lg"
              color={isDark ? 'yellow' : 'indigo'}
              radius="xl"
              leftSection={twitterIcon}
            >
              <TwitterShareButton
                hashtags={[
                  'microapp',
                  'ai',
                  'chatgpt',
                  'react',
                  'nextjs',
                  'tailwindcss',
                ]}
                title="Checkout this React + Tailwind CSS component created with AI"
                url={`${shareUrl}?id=${codeId}`}
              >
                SHARE YOUR COMPONENT
              </TwitterShareButton>
            </Badge>
            <CopyButton value={`${shareUrl}?id=${codeId}`} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'URL Copied' : 'Copy URL'}
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
          </Flex>
        </Container>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  query,
}) => {
  const { id } = query;

  if (id) {
    const { data }: any = await supabase.from('logs').select('*').eq('id', id);

    return {
      props: { code: data[0]?.generated_code, prompt: data[0]?.prompt },
    };
  }

  return { props: { code: '', prompt: '' } };
};

export default Home;
