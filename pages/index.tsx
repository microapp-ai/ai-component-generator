import { FC, useEffect, useRef, useState } from 'react';
import {
  Flex,
  Button,
  Box,
  Text,
  Collapse,
  Autocomplete,
  useMantineColorScheme,
  Container,
  Badge,
  ActionIcon,
  Loader,
  SegmentedControl,
  Center,
  Transition,
} from '@mantine/core';
import Image from 'next/image';
import { Sandpack } from '@codesandbox/sandpack-react';
import { getHotkeyHandler, useDisclosure } from '@mantine/hooks';
import Head from 'next/head';
import { IconBrandTwitter } from '@tabler/icons-react';
// import { TwitterShareButton } from 'next-share';
import { GradientColorText, TypeWriter } from '@/components';
import { removeTripleBackticksAndJsx, cleanCode } from '@/utils';
import { mantineLogo, tailwindLogo } from '@/assets';

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
  const [opened, { toggle }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [technology, setTechnology] = useState<string>('mantine');
  const [data, setData] = useState<string>(mantineCode);
  const [codeWasShown, setCodeWasShown] = useState<boolean>(false);

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

      try {
        const response = await fetch(
          process.env.NODE_ENV === 'production'
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/magic`
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
          const codeWithoutBackticks =
            removeTripleBackticksAndJsx(generatedText);
          const codeWithoutExtraText = cleanCode(codeWithoutBackticks);
          setData(codeWithoutExtraText);
        }

        if (!codeWasShown) {
          toggle();
          setCodeWasShown(true);
        }

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
          Microapp.ai - AI component generator for Tailwind CSS and Mantine
        </title>
        <meta
          name="description"
          content="Create Next.js + Tailwind CSS/Mantine components using AI."
        />
        <meta
          name="keywords"
          content="AI, next.js, next, tailwind, mantine, ui, components"
        />
        <meta
          property="og:url"
          content="https://www.microapp.ai/component-generator"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Microapp.ai - AI component generator for Tailwind CSS and Mantine"
        />
        <meta
          property="og:description"
          content="Create Next.js + Tailwind CSS/Mantine components using AI."
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
          content="Microapp.ai - AI component generator for Tailwind CSS and Mantine"
        />
        <meta
          name="twitter:description"
          content="Create Next.js + Tailwind CSS/Mantine components using AI."
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
          <TypeWriter
            texts={[
              'calendar',
              'tip calculator',
              'product card',
              'password generator',
            ]}
          />
        </GradientColorText>

        <Text align="center" weight="bold" size={30}>
          Create Next.js + Tailwind CSS/Mantine components using AI
        </Text>

        <Flex w="100%" mt={30} justify="center" align="center" gap="lg">
          <SegmentedControl
            value={technology}
            onChange={setTechnology}
            data={[
              {
                label: (
                  <Center>
                    <Image src={tailwindLogo} alt="tailwind" height={13} />
                    <Box ml={5}>Tailwind CSS</Box>
                  </Center>
                ),
                value: 'tailwind',
              },
              {
                label: (
                  <Center>
                    <Image src={mantineLogo} alt="mantine" height={13} />
                    <Box ml={5}>Mantine</Box>
                  </Center>
                ),
                value: 'mantine',
              },
            ]}
          />
        </Flex>

        <Collapse
          mt="xl"
          transitionDuration={700}
          transitionTimingFunction="linear"
          in={opened}
        >
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
                editorHeight: 'calc(100vh - 380px)',
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
                editorHeight: 'calc(100vh - 380px)',
              }}
              files={{
                '/App.js': data,
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

      <Container size="xs">
        <Text weight="bold" align="center">
          Did you like it?
        </Text>
        {/* <TwitterShareButton
          hashtags={[
            '#microapp',
            '#ai',
            '#chatgpt',
            '#nextjs',
            '#tailwindcss',
            '#mantine',
          ]}
          title="Check out this AI component generator"
          url={shareUrl}
        > */}
        <Badge
          sx={{ cursor: 'pointer' }}
          mt={4}
          pl={8}
          size="lg"
          color={isDark ? 'yellow' : 'indigo'}
          radius="xl"
          leftSection={twitterIcon}
        >
          Share it on Twitter
        </Badge>
        {/* </TwitterShareButton> */}
      </Container>
    </>
  );
};

export default Home;
