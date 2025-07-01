import React, { FC, useState, useEffect } from 'react';
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
    zIndex: 1000, // Higher z-index to ensure it overlays content
    borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.dark[7],
    transition: 'width 300ms cubic-bezier(0.2, 0, 0, 1)',
    overflow: 'hidden',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)', // Add shadow for overlay effect
  },
  iconContainer: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    flexShrink: 0,
    '&:hover': {
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
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
    gap: '12px',
    padding: '16px 12px',
    width: '100%',
  },
  labelText: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#e0e0e0',
    letterSpacing: '0.1px',
    marginLeft: '12px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    transition: 'opacity 300ms ease, transform 300ms ease',
  },
  
  navItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    borderRadius: '8px',
    padding: '4px',
    cursor: 'pointer',
    transition: 'background-color 200ms ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    }
  },
  
  hiddenLabel: {
    opacity: 0,
    transform: 'translateX(-8px)',
    position: 'absolute',
    pointerEvents: 'none'
  },
  
  visibleLabel: {
    opacity: 1,
    transform: 'translateX(0)',
    position: 'relative'
  }
}));

const Sidebar: FC<SidebarProps> = ({ expanded = false, onToggle }) => {
  const { classes } = useStyles();
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);
  
  // Determine if sidebar should be expanded based on props or hover state
  const isExpanded = expanded || isHovering;

  const handleNewComponent = () => {
    router.push({
      pathname: '/',
      query: { reset: Date.now() },
    }, '/');
  };
  
  // Optional: Add hover functionality in addition to toggle
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Box 
      className={classes.sidebar}
      sx={{ 
        width: isExpanded ? '256px' : '64px', // w-64 and w-16 in Tailwind equivalent
        minWidth: isExpanded ? '256px' : '64px',
        boxSizing: 'border-box',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box className={classes.sidebarContent}>
        {/* Menu toggle button */}
        <Box className={classes.navItem}>
          <Box 
            className={`${classes.iconContainer} ${classes.menuIcon}`}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => { 
              e.preventDefault(); 
              e.stopPropagation(); 
              if (onToggle) onToggle(); 
            }}
          >
            {expanded ? 
              <IconX size={20} stroke={1.5} style={{ color: '#e0e0e0' }} /> : 
              <IconMenu2 size={20} stroke={1.5} style={{ color: '#e0e0e0' }} />
            }
          </Box>
          
          <Text className={`${classes.labelText} ${isExpanded ? classes.visibleLabel : classes.hiddenLabel}`}>
            {expanded ? 'Close menu' : 'Open menu'}
          </Text>
        </Box>

        {/* New component button */}
        <Box 
          className={classes.navItem}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            handleNewComponent(); 
          }}
        >
          <Box className={`${classes.iconContainer} ${classes.editIcon}`}>
            <IconEdit 
              size={20} 
              stroke={1.5} 
              style={{ 
                color: '#60a5fa',
                filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.15))'
              }} 
            />
          </Box>
          
          <Text className={`${classes.labelText} ${isExpanded ? classes.visibleLabel : classes.hiddenLabel}`}>
            New component
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
