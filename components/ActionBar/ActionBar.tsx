import React, { FC, KeyboardEventHandler, useState } from 'react';
import {
  ActionIcon,
  Box,
  Flex,
  MantineSize,
  Transition,
  useMantineColorScheme,
} from '@mantine/core';
import { PromptButton, PromptInput, ShareOptionsBar } from '@/components';
import Image from 'next/image';
import {
  magicIcon,
  promptIconLight,
  shareIconLight,
  promptIconDark,
  shareIconDark,
} from '@/assets';
import { useStyles } from './styles';

interface ActionBarProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  inputSize: MantineSize | undefined;
  onClick: () => void;
  disabled: boolean;
  shareId?: string;
}

const ActionBar: FC<ActionBarProps> = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  inputSize,
  onClick,
  disabled,
  shareId = '',
}) => {
  const { classes } = useStyles();
  const [isInputVisible, setInputVisible] = useState<boolean>(false);
  const [areShareOptionsVisible, setShareOptionsVisible] =
    useState<boolean>(false);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const shareIcon = isDark ? shareIconDark : shareIconLight;
  const promptIcon = isDark ? promptIconDark : promptIconLight;

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
              width={120}
              disabled={disabled}
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
              width={190}
            />
          </Box>
        )}
      </Transition>
      <ActionIcon className={classes.icon}>
        <Image src={promptIcon} alt="prompt" />
      </ActionIcon>
      <Transition
        mounted={!areShareOptionsVisible}
        transition="fade"
        duration={100}
        timingFunction="ease"
      >
        {(style) => (
          <ActionIcon
            style={style}
            className={classes.icon}
            onClick={() => setShareOptionsVisible((prev) => !prev)}
          >
            <Image src={shareIcon} alt="share" />
          </ActionIcon>
        )}
      </Transition>
      <Transition
        mounted={areShareOptionsVisible}
        transition="fade"
        duration={400}
        timingFunction="ease"
      >
        {(style) => <ShareOptionsBar style={style} id={shareId} />}
      </Transition>
    </Flex>
  );
};

export default ActionBar;
