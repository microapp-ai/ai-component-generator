import {
  Text,
  Group,
  Container,
  Flex,
  useMantineColorScheme,
  Box,
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
          <Text 
            weight={500} 
            size="sm" 
            mr="md"
            className={classes.footerText}
            color={isDark ? '#fff' : '#202123'}
          >
            © 2023 Microapp.ai
          </Text>
        </Flex>

        <Flex className={classes.gridItem} align="center" justify="center">
          <Logo />
        </Flex>

        <Group spacing={24} className={classes.social} position="right" noWrap>
          <a
            href="https://www.microapp.ai/about"
            style={{ textDecoration: 'none' }}
          >
            <Text 
              size="sm" 
              className={classes.link}
              color={isDark ? '#fff' : '#202123'}
            >
              About Us
            </Text>
          </a>
          <a
            href="mailto:contact@microapp.ai?subject=AI Component Generator"
            style={{ textDecoration: 'none' }}
          >
            <Text
              size="sm"
              className={classes.link}
              color={isDark ? '#fff' : '#202123'}
            >
              Contact Us
            </Text>
          </a>
          <Box sx={{ marginLeft: 8 }}>
            <a target="_blank" href="https://twitter.com/microappai">
              <Image
                src={isDark ? twitterIcon : twitterIconDark}
                width={28}
                height={28}
                alt="twitter"
              />
            </a>
          </Box>
        </Group>
      </Container>
    </footer>
  );
};

export default Footer;
