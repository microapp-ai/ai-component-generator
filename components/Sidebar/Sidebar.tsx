import React, { FC } from 'react';
import { Box, createStyles, ActionIcon, Flex, Text, Group } from '@mantine/core';
import { IconMenu2, IconX, IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  sidebar: {
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[7],
    transition: 'width 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px',
  },
  menuButton: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: theme.colors.gray[4],
    '&:hover': {
      backgroundColor: theme.colors.dark[6],
    },
  },
  navItem: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: theme.colors.gray[4],
    '&:hover': {
      backgroundColor: theme.colors.dark[6],
    },
    '&[data-active=true]': {
      backgroundColor: theme.colors.dark[5],
      color: theme.white,
    },
  },
  newButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: theme.colors.blue[4],
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(51, 154, 240, 0.05)',
      color: theme.colors.blue[2],
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
    },
    '&:active': {
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
    },
  },
  // Styles for Recent items removed as requested
}));

interface SidebarProps {
  expanded?: boolean;
  onToggle?: () => void;
}

const Sidebar: FC<SidebarProps> = ({ expanded = false, onToggle }) => {
  const { classes } = useStyles();
  const router = useRouter();
  
  const handleNewComponent = () => {
    // Navigate to home screen to create a new component
    // We need to use router.push with a query parameter to force a refresh
    // This will ensure the component state is reset properly
    router.push({
      pathname: '/',
      query: { reset: Date.now() }, // Adding a timestamp to force a refresh
    }, '/');
  };

  return (
    <Box 
      className={classes.sidebar}
      sx={{ width: expanded ? '240px' : '60px' }}
    >
      {/* Top section with menu toggle */}
      <Flex justify="space-between" align="center" mb={10}>
        <ActionIcon 
          className={classes.menuButton} 
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            e.stopPropagation();
            if (onToggle) onToggle();
          }}
        >
          {expanded ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </ActionIcon>
        
        {/* Search icon removed as requested */}
      </Flex>

      {/* Main navigation items */}
      <Box sx={{ flex: 1 }}>
        {/* New component button */}
        <Box 
          className={classes.newButton}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            e.stopPropagation();
            handleNewComponent();
          }}
          sx={{ marginBottom: '12px' }}
        >
          {!expanded ? (
            <Box sx={(theme) => ({ 
              width: '36px', 
              height: '36px', 
              borderRadius: '8px',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.2s ease'
            })}>
              <IconEdit 
                size={20} 
                stroke={1.5} 
                style={{ 
                  color: '#60a5fa',
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'
                }} 
              />
            </Box>
          ) : (
            <Group spacing="sm">
              <Box sx={(theme) => ({ 
                width: '36px', 
                height: '36px', 
                borderRadius: '8px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.2) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.2s ease'
              })}>
                <IconEdit 
                  size={20} 
                  stroke={1.5} 
                  style={{ 
                    color: '#60a5fa',
                    filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))'
                  }} 
                />
              </Box>
              <Text
                sx={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#60a5fa',
                  letterSpacing: '0.2px',
                  textShadow: '0 1px 1px rgba(0, 0, 0, 0.1)'
                }}
              >
                New component
              </Text>
            </Group>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
