import { FC, useEffect, useRef, useState } from 'react';
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

const mantineCode =
  'import { Button } from "@mantine/core"; \n \nconst MyButton = () => <Button>Hello World</Button>;\n \nexport default MyButton;';
const tailwindCode =
  'const MyButton = () => <button className="m-2 px-3 py-1 bg-blue-400 rounded text-white">Hello World</button>;\n \nexport default MyButton;';
const darkTextGradient = [
  '#F08080',
  '#FFA07A',
  '#FFDAB9',
  '#F0E68C',
  '#98FB98',
];
const lightTextGradient = ['#000', '#3f0d12', '#3a7bd5', '#00d2ff'];
const shareUrl = 'https://www.microapp.ai/ai-component-generator';

const Home: FC = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [technology] = useState<string>('tailwind');
  const [data, setData] = useState<string>(mantineCode);
  const [_, setCodeWasShown] = useState<boolean>(false);

  const ref = useRef<any>('');

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
    if (technology === 'mantine') {
      setData(mantineCode);
    } else {
      setData(tailwindCode);
    }
  }, [technology]);

  const generateTextWithGpt = async () => {
    if (ref?.current?.value) {
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
            body: JSON.stringify({ text: ref?.current?.value, technology }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const { response: generatedText } = await response.json();

        if (generatedText !== 'No prompt given') {
          setData(generatedText);
        }

        open();
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
        <GradientColorText
          colors={isDark ? darkTextGradient : lightTextGradient}
        >
          <Title order={1} align="center" weight="bold" size={60}>
            AI Component Generator
          </Title>
        </GradientColorText>

        <Title order={2} align="center" weight="bold" size={28}>
          Create React <Image src={reactLogo} alt="react" /> + Tailwind CSS{' '}
          <Image src={tailwindLogo} alt="tailwind" /> components using AI
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
                  label={copied ? 'Copied' : 'Copy'}
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
          {technology === 'mantine' ? (
            <Sandpack
              key="1"
              template="react"
              theme={colorScheme}
              options={{
                showTabs: false,
                showInlineErrors: false,
                showLineNumbers: false,
                closableTabs: false,
                editorHeight: 'calc(100vh - 300px)',
              }}
              files={{
                '/App.js': data,
              }}
              customSetup={{
                dependencies: {
                  '@emotion/react': '^11.10.6',
                  '@emotion/server': '^11.10.0',
                  '@mantine/core': '5.10.4',
                  '@mantine/hooks': '5.10.4',
                  '@mantine/next': '5.10.4',
                  '@mantine/dates': '5.10.4',
                  '@mantine/form': '5.10.4',
                  dayjs: '1.11.7',
                },
              }}
            />
          ) : (
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
          )}
        </Collapse>

        <Container size="sm">
          <Autocomplete
            mt="xl"
            ref={ref}
            label="Describe your component here:"
            placeholder="e.g a tip calculator"
            data={[
              { value: 'a mortgage calculator', group: 'Most used' },
              { value: 'a tip calculator', group: 'Most used' },
              { value: 'a password generator', group: 'Most used' },
              { value: 'a calendar', group: 'Most used' },
              { value: 'a product card', group: 'Most used' },
            ]}
            onKeyDown={getHotkeyHandler([['Enter', generateTextWithGpt]])}
          />

          <Button
            mt={30}
            color="dark"
            onClick={generateTextWithGpt}
            disabled={isLoading}
            fullWidth
            size="lg"
          >
            Make magic 🪄
          </Button>

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

      <Container size="xs" mb="lg">
        <Text weight="bold" align="center">
          Did you like it?
        </Text>

        <Badge
          sx={{ cursor: 'pointer' }}
          mt={4}
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
              'nextjs',
              'tailwindcss',
              'mantine',
            ]}
            title="Check out this AI component generator"
            url={shareUrl}
          >
            SHARE IT ON TWITTER
          </TwitterShareButton>
        </Badge>
      </Container>
    </>
  );
};

export default Home;
