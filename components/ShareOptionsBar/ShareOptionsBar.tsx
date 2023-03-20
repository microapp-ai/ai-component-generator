import { FC } from 'react';
import { Flex, Text, ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import Image from 'next/image';
import {
  TwitterShareButton,
  FacebookShareButton,
  LinkedinShareButton,
} from 'next-share';
import {
  shareFacebookIcon,
  shareLinkedInIcon,
  shareLinkIcon,
  shareTwitterIcon,
} from '@/assets';
import { IconCheck } from '@tabler/icons-react';

const url = 'https://www.microapp.ai/ai-component-generator';

interface ShareOptionsBarProps {
  id: string;
  style?: React.CSSProperties | undefined;
}

const ShareOptionsBar: FC<ShareOptionsBarProps> = ({ id, style }) => {
  const shareUrl = `${url}/?id=${id}`;

  return (
    <Flex
      style={style}
      justify="space-between"
      align="center"
      gap={5}
      px={10}
      py={1}
      sx={{
        border: '1px solid #D9D9D9',
        borderRadius: 120,
      }}
    >
      <Text weight={600} size={20}>
        SHARE IT
      </Text>
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
            <ActionIcon onClick={copy}>
              <Image src={shareLinkIcon} alt="copy link" />
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
      <Tooltip label="Share it on Twitter" withArrow position="top">
        <TwitterShareButton
          hashtags={[
            'microapp',
            'ai',
            'chatgpt',
            'react',
            'nextjs',
            'tailwindcss',
          ]}
          title="Check out this React + Tailwind CSS component generated with AI"
          url={shareUrl}
        >
          <Image src={shareTwitterIcon} alt="share it on Twitter" />
        </TwitterShareButton>
      </Tooltip>
      <Tooltip label="Share it on Facebook" withArrow position="top">
        <FacebookShareButton
          url={shareUrl}
          quote={
            'Check out this React + Tailwind CSS component generated with AI'
          }
          hashtag={'#microapp, #ai, #chatgpt, #react, #nextjs, #tailwindcss'}
        >
          <Image src={shareFacebookIcon} alt="share it on Facebook" />
        </FacebookShareButton>
      </Tooltip>
      <Tooltip label="Share it on LinkedIn" withArrow position="top">
        <LinkedinShareButton url={shareUrl}>
          <Image src={shareLinkedInIcon} alt="share it on LinkedIn" />
        </LinkedinShareButton>
      </Tooltip>
    </Flex>
  );
};

export default ShareOptionsBar;
