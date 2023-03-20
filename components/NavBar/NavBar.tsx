import { FC } from 'react';
import { Header, Group, Container } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ColorSchemeToggle, Logo } from '@/components';
import { useStyles } from './styles';

const NavBar: FC = () => {
  const { classes } = useStyles();
  const matches = useMediaQuery('(min-width: 992px)');

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
            <ColorSchemeToggle />
          </Group>
        </Container>
      </Header>
    </>
  );
};

export default NavBar;
