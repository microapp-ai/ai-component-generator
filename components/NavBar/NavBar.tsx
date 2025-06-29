import { FC } from 'react';
import {
  Header,
  Group,
  Container,
  useMantineColorScheme,
  Text,
  Box,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Logo } from '@/components';
import { useStyles } from './styles';

const NavBar: FC = () => {
  const { classes } = useStyles();
  const matches = useMediaQuery('(min-width: 992px)');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Header height={72} className={classes.header} fixed>
        <Container size="xl" className={classes.inner}>
          <Group>
            <a href="https://www.microapp.ai" rel="noopener">
              <Logo full={matches} />
            </a>
          </Group>

          <Group spacing={24}>
            <a
              href="https://www.microapp.ai/about"
              style={{ textDecoration: 'none' }}
            >
              <Text 
                size={16} 
                weight={500} 
                color={isDark ? '#fff' : '#202123'}
                className={classes.navLink}
              >
                About
              </Text>
            </a>
            <Text
              color={isDark ? '#fff' : '#202123'}
              size={16}
              weight={500}
              className={classes.navLink}
              component="a"
              href="mailto:invest@microapp.ai?subject=Hi - Microapp.ai"
            >
              Contact Us
            </Text>

          </Group>
        </Container>
      </Header>
    </>
  );
};

export default NavBar;
