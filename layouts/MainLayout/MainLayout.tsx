import { FC } from 'react';
import { Container } from '@mantine/core';
import { NavBar, Footer } from '@/components';
import { useStyles } from './styles';

interface MainLayoutProps {
  children: React.ReactNode;
  withFooter: boolean;
}

const MainLayout: FC<MainLayoutProps> = ({ children, withFooter = true }) => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.mainContainer}>
        <NavBar />
        <main className={classes.childrenContainer}>
          <Container size="lg" className={classes.children}>
            {children}
          </Container>
        </main>
        {withFooter && <Footer />}
      </div>
    </>
  );
};

export default MainLayout;
