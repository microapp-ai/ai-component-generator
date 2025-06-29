import { FC, MouseEventHandler, ReactNode } from 'react';
import {
  Button,
  MantineNumberSize,
  MantineSize,
  useMantineColorScheme,
  Box,
  Center,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { useStyles } from './styles';

interface PromptButtonProps {
  title?: string;
  ariaLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  isLoading?: boolean;
  fullWidth?: boolean;
  radius?: MantineNumberSize | undefined;
  size?: MantineSize | undefined;
  mt?: MantineSize | undefined;
  width?: any;
  disabled?: boolean;
  iconSize?: number;
}

const PromptButton: FC<PromptButtonProps> = ({
  title,
  ariaLabel,
  onClick,
  isLoading = false,
  radius = 'md',
  size = 'md',
  fullWidth = false,
  mt,
  width,
  disabled = false,
  iconSize = 20,
}) => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        borderRadius: theme.radius.xl,
        padding: '3px', // Thicker border
        background: 'linear-gradient(90deg, #FF6B6B, #FFD166, #06D6A0, #118AB2, #073B4C, #7209B7, #F72585)',
        width: fullWidth ? '100%' : width || 'auto',
        display: 'inline-block',
        marginTop: mt,
        opacity: disabled ? 0.7 : 1,
      })}
    >
      <Button
        radius={radius}
        onClick={onClick}
        disabled={disabled}
        fullWidth={true}
        size={size}
        aria-label={ariaLabel}
        loading={isLoading}
        sx={(theme) => ({
          height: '36px',
          width: '36px',
          minWidth: '36px',
          backgroundColor: isDark ? '#202123' : '#FFFFFF',
          color: isDark ? '#FFFFFF' : '#202123',
          border: 'none',
          boxShadow: 'none',
          transition: 'all 0.2s ease',
          padding: 0,
          borderRadius: theme.radius.xl,
          '&:hover': {
            backgroundColor: isDark ? '#2D2D2D' : '#F8F8F8',
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1))',
          },
          '&:disabled': {
            backgroundColor: isDark ? '#202123' : '#FFFFFF',
            color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
          },
        })}
      >
        <Center>
          <IconArrowRight size={iconSize} stroke={1.5} />
        </Center>
      </Button>
    </Box>
  );
};

export default PromptButton;
