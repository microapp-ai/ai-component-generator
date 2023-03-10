import { FC } from 'react';
import { Container } from '@mantine/core';
import { NavBar, Footer } from '@/components';
import { useStyles } from './styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.mainContainer}>
        <NavBar />
        <main className={classes.childrenContainer}>
          <Container className={classes.children}>{children}</Container>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
