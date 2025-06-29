import { FC, useState } from 'react';
import { Box, createStyles, ActionIcon, Tooltip, Flex, Transition } from '@mantine/core';
import { IconMenu2, IconPlus, IconHome, IconHistory, IconSettings, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  sidebar: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 200,
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'width 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  menuButton: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[6],
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  },
  navItem: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[6],
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
    '&[data-active=true]': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
  },
  newButton: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[8] : theme.colors.blue[6],
    color: theme.white,
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.blue[7] : theme.colors.blue[5],
    },
  },
}));

interface SidebarProps {
  expanded?: boolean;
  onToggle?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ expanded = false, onToggle }) => {
  const { classes } = useStyles();
  const router = useRouter();
  
  const handleNewPrompt = () => {
    // Reset the app state and navigate to home
    router.push('/');
  };

  return (
    <Box 
      className={classes.sidebar}
      sx={{ width: expanded ? '240px' : '60px' }}
    >
      {/* Top section with menu toggle */}
      <Flex p="md" justify="space-between" align="center">
        <ActionIcon 
          className={classes.menuButton} 
          onClick={onToggle}
        >
          {expanded ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </ActionIcon>
        
        <Transition mounted={expanded} transition="fade" duration={200}>
          {(styles) => (
            <Box style={styles} sx={{ flex: 1 }}></Box>
          )}
        </Transition>
      </Flex>

      {/* Navigation items */}
      <Box sx={{ flex: 1, padding: '0 10px', marginTop: '20px' }}>
        <Flex direction="column" gap="md" align="center">
          <Tooltip label="New Component" position="right" disabled={expanded} withArrow>
            <ActionIcon 
              className={classes.newButton}
              onClick={handleNewPrompt}
            >
              <IconPlus size={20} />
            </ActionIcon>
          </Tooltip>
          
          <Tooltip label="Home" position="right" disabled={expanded} withArrow>
            <Link href="/" passHref>
              <ActionIcon 
                component="a"
                className={classes.navItem}
                data-active={router.pathname === '/'}
              >
                <IconHome size={20} />
              </ActionIcon>
            </Link>
          </Tooltip>
          
          <Tooltip label="History" position="right" disabled={expanded} withArrow>
            <Link href="/history" passHref>
              <ActionIcon 
                component="a"
                className={classes.navItem}
                data-active={router.pathname === '/history'}
              >
                <IconHistory size={20} />
              </ActionIcon>
            </Link>
          </Tooltip>
          
          <Tooltip label="Settings" position="right" disabled={expanded} withArrow>
            <Link href="/settings" passHref>
              <ActionIcon 
                component="a"
                className={classes.navItem}
                data-active={router.pathname === '/settings'}
              >
                <IconSettings size={20} />
              </ActionIcon>
            </Link>
          </Tooltip>
        </Flex>
      </Box>
      
      {/* Bottom section - can be used for user profile, etc. */}
      <Box p="md">
        {/* Placeholder for future content */}
      </Box>
    </Box>
  );
};

export default Sidebar;
