import { FC } from 'react';
import {
  Header,
  Group,
  Container,
  useMantineColorScheme,
  Text,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ColorSchemeToggle, Logo } from '@/components';
import { useStyles } from './styles';
import Link from 'next/link';

const NavBar: FC = () => {
  const { classes } = useStyles();
  const matches = useMediaQuery('(min-width: 992px)');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Header height={56} className={classes.header} fixed>
        <Container size="xl" className={classes.inner}>
          <Group>
            <a href="https://www.microapp.ai" rel="noopener">
              <Logo full={matches} />
            </a>
          </Group>

          <Group>
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <Text size={16} weight={600} color={isDark ? '#fff' : '#202123'}>
                About
              </Text>
            </Link>
            <Text
              color={isDark ? '#fff' : '#202123'}
              size={16}
              weight={600}
              sx={{ textDecoration: 'none' }}
              component="a"
              href="mailto:invest@microapp.ai?subject=Hi - Microapp.ai"
            >
              Contact Us
            </Text>
            <ColorSchemeToggle />
          </Group>
        </Container>
      </Header>
    </>
  );
};

export default NavBar;
