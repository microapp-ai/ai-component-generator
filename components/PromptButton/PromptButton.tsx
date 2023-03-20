import { FC, MouseEventHandler, ReactNode } from 'react';
import { Button, MantineNumberSize, MantineSize, Text } from '@mantine/core';

interface PromptButtonProps {
  title: string;
  ariaLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  isLoading?: boolean;
  fullWidth?: boolean;
  radius?: MantineNumberSize | undefined;
  size?: MantineSize | undefined;
  leftIcon?: ReactNode | undefined;
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
  leftIcon,
  mt,
  width,
  disabled = false,
}) => {
  return (
    <Button
      color="dark"
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
