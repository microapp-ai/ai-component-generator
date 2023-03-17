import React from 'react';
import { ActionIcon, Flex } from '@mantine/core';
import { PromptButton } from '@/components';
import Image from 'next/image';
import { magicIcon, promptIcon, shareIcon } from '@/assets';

const ActionBar = () => {
  return (
    <Flex
      p="xs"
      bg="#fff"
      justify="space-between"
      align="center"
      gap="sm"
      sx={{
        border: '1px solid #D9D9D9',
        borderRadius: 50,
        position: 'absolute',
        bottom: 5,
      }}
    >
      <PromptButton
        size="sm"
        leftIcon={<Image src={magicIcon} height={19} alt="new component" />}
        title="NEW"
        ariaLabel="new component"
        onClick={() => console.log('clicked')}
      />
      <ActionIcon p="md" sx={{ border: '1px solid black', borderRadius: 20 }}>
        <Image src={promptIcon} alt="prompt" />
      </ActionIcon>
      <ActionIcon p="md" sx={{ border: '1px solid black', borderRadius: 20 }}>
        <Image src={shareIcon} alt="share" />
      </ActionIcon>
    </Flex>
  );
};

export default ActionBar;
