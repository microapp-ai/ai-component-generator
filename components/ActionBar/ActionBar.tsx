import React, { FC, KeyboardEventHandler, useState } from 'react';
import {
  ActionIcon,
  Box,
  Flex,
  MantineSize,
  Tooltip,
  Transition,
  useMantineColorScheme,
  Text,
  CopyButton,
} from '@mantine/core';
import { PromptButton, PromptInput } from '@/components';
import Image from 'next/image';
import {
  promptIconLight,
  promptIconDark,
} from '@/assets';
import { useStyles } from './styles';
import { IconCheck, IconCopy } from '@tabler/icons-react';

interface ActionBarProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  inputSize: MantineSize | undefined;
  onClick: () => void;
  disabled: boolean;
  prompt?: string;
}

const ActionBar: FC<ActionBarProps> = ({
  value,
  onChange,
  placeholder,
  onKeyDown,
  inputSize,
  onClick,
  disabled,
  prompt = '',
}) => {
  const { classes } = useStyles();
  const [isInputVisible, setInputVisible] = useState<boolean>(false);

  const [isPromptContainerVisible, setPromptContainerVisible] =
    useState<boolean>(false);

  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const promptIcon = isDark ? promptIconDark : promptIconLight;

  return (
    <Flex
      className={classes.container}
      p="xs"
      justify="center"
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
              title="MAKE MAGIC"
              ariaLabel="new component"
              onClick={onClick}
              width={190}
              disabled={disabled}
            />
          </Box>
        )}
      </Transition>
      <Transition
        mounted={isPromptContainerVisible}
        transition="slide-up"
        duration={400}
        timingFunction="ease"
      >
        {(style) => (
          <Flex
            style={style}
            justify="center"
            align="center"
            gap={4}
            className={classes.promptContainer}
          >
            <Text truncate size={18} className={classes.promptText}>
              {prompt}
            </Text>
            <CopyButton value={prompt} timeout={2000}>
              {({ copied, copy }) => (
                <Tooltip
                  label={copied ? 'Prompt Copied' : 'Copy Prompt'}
                  withArrow
                  position="right"
                >
                  <ActionIcon
                    className={classes.promptCopyIconButton}
                    color={copied ? 'teal' : 'gray'}
                    onClick={copy}
                  >
                    {copied ? (
                      <IconCheck
                        color={isDark ? '#FDFDFD' : '#202123'}
                        size="1.2rem"
                      />
                    ) : (
                      <IconCopy
                        color={isDark ? '#FDFDFD' : '#202123'}
                        size="1.2rem"
                      />
                    )}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
          </Flex>
        )}
      </Transition>
      <Tooltip label="See & copy prompt" withArrow position="top">
        <ActionIcon
          className={classes.icon}
          onClick={() => setPromptContainerVisible((prev) => !prev)}
          disabled={disabled}
        >
          <Image src={promptIcon} alt="prompt" />
        </ActionIcon>
      </Tooltip>

    </Flex>
  );
};

export default ActionBar;
