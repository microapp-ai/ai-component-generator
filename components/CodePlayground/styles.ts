import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100vh - 120px)',
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    boxShadow: theme.colorScheme === 'dark' ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  
  toolbar: {
    backgroundColor: '#111',
    color: '#fff',
    padding: '12px 16px',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
  },
  
  title: {
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    color: '#fff',
  },
  
  tabButton: {
    color: '#fff',
    opacity: 0.7,
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      opacity: 0.9,
    },
  },
  
  activeTab: {
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  
  actionButton: {
    color: '#fff',
    opacity: 0.7,
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      opacity: 0.9,
    },
  },
  
  shareButton: {
    backgroundColor: '#3b82f6', // bg-blue-600
    color: '#fff',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: theme.radius.md,
    padding: '0 16px',
    height: '32px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: '#2563eb', // bg-blue-700
    },
  },
  
  content: {
    flex: 1,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
    overflow: 'hidden',
  },
  
  sandpack: {
    height: '100%',
    '& .sp-wrapper': {
      height: '100%',
      border: 'none',
      borderRadius: 0,
    },
    '& .sp-preview-container': {
      backgroundColor: '#fff',
      padding: '16px',
    },
    '& .sp-preview-iframe': {
      backgroundColor: '#fff',
      borderRadius: theme.radius.sm,
    },
    '& .sp-layout': {
      height: '100%',
    },
    '& .sp-tab-button': {
      fontFamily: 'Inter, sans-serif',
    },
  },
  
  errorBox: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: theme.radius.md,
  },
}));
