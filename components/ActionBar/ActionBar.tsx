import React, { FC, KeyboardEventHandler, useState } from 'react';
import { ActionIcon, Box, Flex, MantineSize, Transition } from '@mantine/core';
import { PromptButton, PromptInput } from '@/components';
import Image from 'next/image';
import { magicIcon, promptIcon, shareIcon } from '@/assets';
import { useStyles } from './style';

interface ActionBarProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  inputSize: MantineSize | undefined;
  onClick: () => void;
}

const ActionBar: FC<ActionBarProps> = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  inputSize,
  onClick,
}) => {
  const { classes } = useStyles();
  const [isInputVisible, setInputVisible] = useState<boolean>(false);

  return (
    <Flex
      className={classes.container}
      p="xs"
      justify="space-between"
      align="center"
      gap="sm"
    >
      <Transition
        mounted={!isInputVisible}
        transition="fade"
        duration={200}
        timingFunction="ease"
      >
        {(style) => (
          <Box style={style}>
            <PromptButton
              size="sm"
              leftIcon={
                <Image src={magicIcon} height={19} alt="new component" />
              }
              title="NEW"
              ariaLabel="new component"
              onClick={() => setInputVisible((prev) => !prev)}
              width={100}
            />
          </Box>
        )}
      </Transition>
      <Transition
        mounted={isInputVisible}
        transition="fade"
        duration={400}
        timingFunction="ease"
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
      <Transition
        mounted={isInputVisible}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(style) => (
          <Box style={style}>
            <PromptButton
              size="sm"
              leftIcon={
                <Image src={magicIcon} height={19} alt="new component" />
              }
              title="MAKE MAGIC"
              ariaLabel="new component"
              onClick={onClick}
              width={150}
            />
          </Box>
        )}
      </Transition>
      <ActionIcon p="md" className={classes.icon}>
        <Image src={promptIcon} alt="prompt" />
      </ActionIcon>
      <ActionIcon p="md" className={classes.icon}>
        <Image src={shareIcon} alt="share" />
      </ActionIcon>
    </Flex>
  );
};

export default ActionBar;
