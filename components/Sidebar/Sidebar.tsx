import React, { FC } from 'react';
import { Box, createStyles, Text, Group } from '@mantine/core';
import { IconMenu2, IconX, IconEdit } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  expanded: boolean;
  onToggle?: () => void;
}

const useStyles = createStyles((theme) => ({
  sidebar: {
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100,
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[7],
    transition: 'width 0.3s ease',
    overflow: 'hidden',
    maxHeight: '100vh',
    maxWidth: '240px',
  },
  iconContainer: {
    width: '30px',
    height: '30px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
    }
  },
  menuIcon: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
  },
  editIcon: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.2) 100%)'
  },
  sidebarContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '10px 8px',
    width: '100%',
  },
  labelText: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#60a5fa',
    letterSpacing: '0.1px',
    marginLeft: '10px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

const Sidebar: FC<SidebarProps> = ({ expanded = false, onToggle }) => {
  const { classes } = useStyles();
  const router = useRouter();

  const handleNewComponent = () => {
    router.push({
      pathname: '/',
      query: { reset: Date.now() },
    }, '/');
  };

  return (
    <Box 
      className={classes.sidebar}
      sx={{ 
        width: expanded ? '240px' : '60px',
        minWidth: expanded ? '240px' : '60px',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box className={classes.sidebarContent}>
        {/* Menu toggle button */}
        <Box 
          className={`${classes.iconContainer} ${classes.menuIcon}`}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); if (onToggle) onToggle(); }}
        >
          {expanded ? 
            <IconX size={18} stroke={1.5} style={{ color: '#e0e0e0' }} /> : 
            <IconMenu2 size={18} stroke={1.5} style={{ color: '#e0e0e0' }} />
          }
        </Box>

        {/* New component button */}
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }} 
          onClick={(e: React.MouseEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); handleNewComponent(); }}
        >
          <Box className={`${classes.iconContainer} ${classes.editIcon}`}>
            <IconEdit 
              size={18} 
              stroke={1.5} 
              style={{ 
                color: '#60a5fa',
                filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15))'
              }} 
            />
          </Box>
          
          {expanded && (
            <Text className={classes.labelText}>
              New component
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
