import { FC } from 'react';
import {
  Flex,
  Text,
  ActionIcon,
  CopyButton,
  Tooltip,
  useMantineColorScheme,
  Box,
} from '@mantine/core';
import Image from 'next/image';
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from 'next-share';
import {
  shareFacebookIconLight,
  shareLinkedInIconLight,
  shareLinkIconLight,
  shareTwitterIconLight,
  shareFacebookIconDark,
  shareLinkIconDark,
  shareLinkedInIconDark,
  shareTwitterIconDark,
} from '@/assets';
import { IconCheck } from '@tabler/icons-react';

const url = 'https://www.microapp.ai/build';

interface ShareOptionsBarProps {
  id: string;
  style?: React.CSSProperties | undefined;
}

const ShareOptionsBar: FC<ShareOptionsBarProps> = ({ id, style }) => {
  const shareUrl = `${url}/?id=${id}`;
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const shareLinkIcon = isDark ? shareLinkIconDark : shareLinkIconLight;
  const shareTwitterIcon = isDark
    ? shareTwitterIconDark
    : shareTwitterIconLight;
  const shareLinkedInIcon = isDark
    ? shareLinkedInIconDark
    : shareLinkedInIconLight;
  const shareFacebookIcon = isDark
    ? shareFacebookIconDark
    : shareFacebookIconLight;

  return (
    <Flex
      style={style}
      justify="space-between"
      align="center"
      gap={16}
      px={16}
      py={8}
      sx={(theme) => ({
        border: `1px solid ${
          isDark ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        borderRadius: theme.radius.xl,
        transition: 'all 0.2s ease',
        backgroundColor: isDark ? '#202123' : '#FFFFFF',
      })}
    >
      <Text 
        weight={500} 
        size={16}
        sx={{
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.01em',
        }}
        color={isDark ? '#fff' : '#202123'}
      >
        Share
      </Text>
      <Box sx={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <CopyButton value={shareUrl} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={
                copied ? (
                  <Flex justify="center" align="center" gap={2}>
                    Link Copied
                    <IconCheck size="1rem" />
                  </Flex>
                ) : (
                  'Copy Link'
                )
              }
              withArrow
              position="top"
            >
              <ActionIcon 
                onClick={copy}
                sx={(theme) => ({
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    backgroundColor: 'transparent',
                  },
                })}
              >
                <Image src={shareLinkIcon} alt="copy link" width={20} height={20} />
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
        <Tooltip label="Share on Twitter" withArrow position="top">
          <TwitterShareButton
            hashtags={[
              'microapp',
              'ai',
              'chatgpt',
              'react',
              'nextjs',
              'tailwindcss',
            ]}
            title="Check out this React + Tailwind CSS component generated with AI @microappai"
            url={shareUrl}
          >
            <ActionIcon 
              sx={(theme) => ({
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: 'transparent',
                },
              })}
            >
              <Image src={shareTwitterIcon} alt="share it on Twitter" width={20} height={20} />
            </ActionIcon>
          </TwitterShareButton>
        </Tooltip>
        <Tooltip label="Share on Facebook" withArrow position="top">
          <FacebookShareButton
            url={shareUrl}
            quote={
              'Check out this React + Tailwind CSS component generated with AI'
            }
            hashtag={'#microapp, #ai, #chatgpt, #react, #nextjs, #tailwindcss'}
          >
            <ActionIcon 
              sx={(theme) => ({
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: 'transparent',
                },
              })}
            >
              <Image src={shareFacebookIcon} alt="share it on Facebook" width={20} height={20} />
            </ActionIcon>
          </FacebookShareButton>
        </Tooltip>
        <Tooltip label="Share on LinkedIn" withArrow position="top">
          <LinkedinShareButton url={shareUrl}>
            <ActionIcon 
              sx={(theme) => ({
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  backgroundColor: 'transparent',
                },
              })}
            >
              <Image src={shareLinkedInIcon} alt="share it on LinkedIn" width={20} height={20} />
            </ActionIcon>
          </LinkedinShareButton>
        </Tooltip>
      </Box>
    </Flex>
  );
};

export default ShareOptionsBar;
