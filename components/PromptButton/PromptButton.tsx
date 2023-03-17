import { FC, MouseEventHandler, ReactNode } from 'react';
import { Button, MantineNumberSize, MantineSize } from '@mantine/core';

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
}) => {
  return (
    <Button
      radius={radius}
      color="dark"
      onClick={onClick}
      disabled={isLoading}
      fullWidth={fullWidth}
      size={size}
      aria-label={ariaLabel}
      leftIcon={leftIcon}
      mt={mt}
      w={width}
    >
      {title}
    </Button>
  );
};

export default PromptButton;
