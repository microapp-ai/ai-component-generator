import React, { FC } from 'react';
import { Text } from '@mantine/core';

interface GradientColorTextProps {
  children: string | React.ReactNode;
  colors: string[];
}

const GradientColorText: FC<GradientColorTextProps> = ({
  children,
  colors,
}) => {
  const gradient = `linear-gradient(to right, ${colors.join(', ')})`;

  return (
    <Text
      variant="gradient"
      sx={{
        background: gradient,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {children}
    </Text>
  );
};

export default GradientColorText;
