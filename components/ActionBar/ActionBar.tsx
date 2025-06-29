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
  Paper,
} from '@mantine/core';
import { PromptButton, PromptInput } from '@/components';
import Image from 'next/image';
import {
  promptIconLight,
  promptIconDark,
} from '@/assets';
import { useStyles } from './styles';
import { IconCheck, IconCopy, IconPlus } from '@tabler/icons-react';

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
  const [isPromptContainerVisible, setPromptContainerVisible] = useState<boolean>(false);
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Paper
      p="md"
      radius="md"
      sx={(theme) => ({
        backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
        border: `1px solid ${isDark ? theme.colors.dark[5] : theme.colors.gray[2]}`,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
      })}
    >
      <Flex
        justify="center"
        align="center"
        gap="md"
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
                size="md"
                title="New Component"
                ariaLabel="new component"
                onClick={() => setInputVisible((prev) => !prev)}
                width={150}
                disabled={disabled}
                radius="md"
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
                radius="md"
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
                size="md"
                title="Generate"
                ariaLabel="generate component"
                onClick={onClick}
                width={120}
                disabled={disabled}
                radius="md"
              />
            </Box>
          )}
        </Transition>
        
        {prompt && (
          <Tooltip label={isPromptContainerVisible ? "Hide prompt" : "Show prompt"} withArrow position="top">
            <ActionIcon
              onClick={() => setPromptContainerVisible((prev) => !prev)}
              disabled={disabled}
              size="md"
              radius="md"
              sx={(theme) => ({
                border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[3]}`,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
                },
              })}
            >
              <IconCopy size="1rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        )}
      </Flex>
      
      <Transition
        mounted={isPromptContainerVisible && !!prompt}
        transition="slide-up"
        duration={300}
        timingFunction="ease"
      >
        {(style) => (
          <Box
            mt="md"
            p="sm"
            style={style}
            sx={(theme) => ({
              backgroundColor: isDark ? theme.colors.dark[6] : theme.colors.gray[0],
              borderRadius: theme.radius.sm,
              border: `1px solid ${isDark ? theme.colors.dark[4] : theme.colors.gray[2]}`,
            })}
          >
            <Flex justify="space-between" align="center">
              <Text size="sm" sx={(theme) => ({
                color: isDark ? theme.colors.gray[4] : theme.colors.gray[6]
              })}>
                Prompt used:
              </Text>
              <CopyButton value={prompt} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip label={copied ? 'Copied' : 'Copy prompt'} withArrow position="top">
                    <ActionIcon
                      size="sm"
                      onClick={copy}
                      sx={(theme) => ({
                        backgroundColor: 'transparent',
                        '&:hover': {
                          backgroundColor: isDark ? theme.colors.dark[5] : theme.colors.gray[1],
                        },
                      })}
                    >
                      {copied ? <IconCheck size="0.9rem" /> : <IconCopy size="0.9rem" />}
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </Flex>
            <Text mt={5} size="sm" sx={(theme) => ({
              color: isDark ? theme.white : theme.black
            })}>
              {prompt}
            </Text>
          </Box>
        )}
      </Transition>
    </Paper>
  );
};

export default ActionBar;
