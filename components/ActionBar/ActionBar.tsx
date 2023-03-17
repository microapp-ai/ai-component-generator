import React, { FC, KeyboardEventHandler, useState } from 'react';
import { ActionIcon, Box, Flex, MantineSize, Transition } from '@mantine/core';
import { PromptButton, PromptInput } from '@/components';
import Image from 'next/image';
import { magicIcon, promptIcon, shareIcon } from '@/assets';

interface ActionBarProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  inputSize: MantineSize | undefined;
}

const ActionBar: FC<ActionBarProps> = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  inputSize,
}) => {
  const [isInputVisible, setInputVisible] = useState<boolean>(false);

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
        onClick={() => setInputVisible((prev) => !prev)}
        width={100}
      />
      <Transition
        mounted={isInputVisible}
        transition="scale-x"
        duration={400}
        timingFunction="ease"
        onEnter={() => console.log('onEnter')}
        onEntered={() => console.log('onEntered')}
        onExit={() => console.log('onExit')}
        onExited={() => console.log('onExited')}
      >
        {(style) => (
          <Box w={500} style={style}>
            <PromptInput
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              onKeyDown={onKeyDown}
              size={inputSize}
            />
          </Box>
        )}
      </Transition>
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
