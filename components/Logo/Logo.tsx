import { FC } from 'react';
import Image from 'next/image';
import { useMantineColorScheme } from '@mantine/core';
import { logo, logoDark, logoFull, logoFullDark } from '@/assets';

interface LogoProps {
  fixedTheme?: string;
  full?: boolean;
}

const Logo: FC<LogoProps> = ({ fixedTheme, full = false }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = fixedTheme ?? colorScheme;
  const darkLogo = full ? logoFullDark : logoDark;
  const lightLogo = full ? logoFull : logo;
  const width = full ? 152 : 37;
  const height = full ? 35 : 32;

  return (
    <Image
      src={theme === 'dark' ? darkLogo : lightLogo}
      width={width}
      height={height}
      alt="microapps"
      priority
    />
  );
};

export default Logo;
