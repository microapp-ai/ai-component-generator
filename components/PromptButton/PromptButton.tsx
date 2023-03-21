import { FC, MouseEventHandler, ReactNode } from 'react';
import {
  Button,
  MantineNumberSize,
  MantineSize,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import Image from 'next/image';
import { magicIconDark, magicIconLight } from '@/assets';
import { useStyles } from './styles';
import { Icon123 } from '@tabler/icons-react';

interface PromptButtonProps {
  title: string;
  ariaLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  isLoading?: boolean;
  fullWidth?: boolean;
  radius?: MantineNumberSize | undefined;
  size?: MantineSize | undefined;
  mt?: MantineSize | undefined;
  width?: any;
  disabled?: boolean;
}

const PromptButton: FC<PromptButtonProps> = ({
  title,
  ariaLabel,
  onClick,
  isLoading = false,
  radius = '32px',
  size = 'xl',
  fullWidth = true,
  mt,
  width,
  disabled = false,
}) => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  const magicIcon = isDark ? magicIconDark : magicIconLight;

  const leftIcon = <Image src={magicIcon} height={19} alt="make magic" />;

  return (
    <Button
      className={classes.button}
      radius={radius}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      aria-label={ariaLabel}
      leftIcon={leftIcon}
      mt={mt}
      w={width}
      loading={isLoading}
    >
      <Text size={20} weight={600}>
        {title}
      </Text>
    </Button>
  );
};

export default PromptButton;
