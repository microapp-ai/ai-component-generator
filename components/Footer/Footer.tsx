import {
  Text,
  Group,
  Container,
  Flex,
  useMantineColorScheme,
} from '@mantine/core';
import { Logo } from '@/components';
import Image from 'next/image';
import { twitterIcon, twitterIconDark } from '@/assets';
import { useStyles } from './styles';

const Footer = () => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <footer className={classes.footer}>
      <Container className={classes.afterFooter}>
        <Flex align="center" justify="flex-start">
          <Text weight="bold" size="sm" mr="md">
            © 2023 Microapp.ai
          </Text>
          <a target="_blank" href="https://twitter.com/microappai">
            <Image
              src={isDark ? twitterIcon : twitterIconDark}
              width={35}
              height={35}
              alt="twitter"
            />
          </a>
        </Flex>

        <Flex className={classes.gridItem} align="center" justify="center">
          <Logo />
        </Flex>

        <Group spacing={10} className={classes.social} position="right" noWrap>
          <Text<'a'> size="sm" href="#" className={classes.link}>
            About Us
          </Text>
          <a
            href="mailto:contact@microapp.ai?subject=AI Component Generator"
            style={{ textDecoration: 'none' }}
          >
            <Text
              size="sm"
              className={classes.link}
              sx={{ textDecoration: 'none' }}
            >
              Contact Us
            </Text>
          </a>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
