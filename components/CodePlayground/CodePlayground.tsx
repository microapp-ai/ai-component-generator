import React, { useState } from 'react';
import { Box, Flex, ActionIcon, Text, Tooltip, useMantineColorScheme, createStyles, Button } from '@mantine/core';
import { 
  IconCode, 
  IconDeviceLaptop, 
  IconCopy, 
  IconCheck, 
  IconDownload, 
  IconRefresh, 
  IconShare, 
  IconX,
  IconMaximize
} from '@tabler/icons-react';
import { Sandpack, SandpackProvider, SandpackCodeEditor, SandpackPreview } from '@codesandbox/sandpack-react';

interface CodePlaygroundProps {
  code: string;
  title?: string;
  externalResources?: string[];
  className?: string;
}

// Define styles directly in the component file
const useStyles = createStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    border: 'none',
    boxShadow: theme.colorScheme === 'dark' ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.05)',
  },
  
  toolbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : '#111',
    color: '#fff',
    padding: '10px 16px',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    height: '52px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  
  title: {
    fontSize: '15px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 600,
    color: '#fff',
    maxWidth: '400px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    opacity: 0.9,
    letterSpacing: '0.2px',
  },
  
  tabsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.radius.md,
    padding: '2px',
  },
  
  tabButton: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#fff',
    opacity: 0.7,
    padding: '0 12px',
    height: '34px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      opacity: 0.9,
    },

  },
  
  activeTab: {
    opacity: 1,
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-8px',
      left: '0',
      width: '100%',
      height: '2px',
      backgroundColor: theme.colors.blue[4],
      boxShadow: '0 0 8px rgba(66, 153, 225, 0.6)',
    },
  },
  
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    borderRadius: theme.radius.sm,
    width: '34px',
    height: '34px',
    transition: 'all 0.2s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      transform: 'translateY(-1px)',
    },
    '&:active': {
      transform: 'translateY(0)',
    },
  },
  
  shareButton: {
    backgroundColor: '#3b82f6', // bg-blue-600
    color: '#fff',
    fontSize: '13px',
    fontWeight: 500,
    borderRadius: theme.radius.md,
    padding: '0 12px',
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
    display: 'flex',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  },
  
  sandpack: {
    height: '100%',
    width: '100%',
    '& .sp-wrapper': {
      height: '100%',
      border: 'none',
      borderRadius: 0,
      boxShadow: 'none',
    },
    '& .sp-preview-container': {
      backgroundColor: '#fff',
      height: '100%',
      width: '100%',
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .sp-preview-iframe': {
      height: '100% !important',
      width: '100% !important',
      border: 'none',
      padding: 0,
      backgroundColor: '#fff',
      borderRadius: 0,
      boxShadow: 'none',
      margin: '0 auto', // Center the preview content
      maxWidth: '100%', // Use full width
      '& > div': {
        width: '100%',
        height: '100%'
      }
    },
    '& .sp-layout': {
      height: '100%',
    },
    '& .sp-tab-button': {
      fontFamily: 'Inter, sans-serif',
    },
    '& .sp-code-editor': {
      height: '100%',
    },
  },
  
  errorBox: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
    borderRadius: theme.radius.md,
    margin: '16px',
    padding: '16px',
  },
  
  placeholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    fontSize: '14px',
  },
  
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    marginLeft: '8px',
  },
}));

const CodePlayground: React.FC<CodePlaygroundProps> = ({ code, title = 'Component Preview', externalResources = [], className }) => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Toggle between code-only and preview-only views
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'component.jsx';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Box className={`${classes.container} ${className || ''}`}>
      {/* Toolbar */}
      <Flex className={classes.toolbar}>
        <Flex align="center" gap="md">
          <Text className={classes.title}>{title}</Text>
        </Flex>
        
        <Flex align="center" gap="md">
          <Box className={classes.tabsContainer}>
            <Button 
              variant="subtle"
              className={`${classes.tabButton} ${!showPreview ? classes.activeTab : ''}`}
              onClick={() => setShowPreview(false)}
              leftIcon={<IconCode size={16} />}
              compact
            >
              Code
            </Button>
            
            <Button 
              variant="subtle"
              className={`${classes.tabButton} ${showPreview ? classes.activeTab : ''}`}
              onClick={() => setShowPreview(true)}
              leftIcon={<IconDeviceLaptop size={16} />}
              compact
            >
              Preview
            </Button>
          </Box>
          
          <Box className={classes.buttonGroup}>
            <Tooltip label="Copy code" position="top" withArrow>
              <ActionIcon className={classes.actionButton} onClick={copyToClipboard}>
                {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
              </ActionIcon>
            </Tooltip>
            
            <Tooltip label="Download code" position="top" withArrow>
              <ActionIcon className={classes.actionButton} onClick={downloadCode}>
                <IconDownload size={18} />
              </ActionIcon>
            </Tooltip>
            
            {/* GitHub button removed as requested */}
          </Box>
          
          <Button 
            className={classes.shareButton}
            leftIcon={<IconShare size={16} />}
            compact
          >
            Share
          </Button>
        </Flex>
      </Flex>

      {/* Content */}
      <Box className={classes.content}>
        {code && typeof code === 'string' && code.trim() !== '' ? (
          <Box className={classes.sandpack}>
            <SandpackProvider
              template="react"
              theme={colorScheme === 'dark' ? 'dark' : 'light'}
              files={{
                '/App.js': code,
              }}
              customSetup={{
                dependencies: {
                  'date-fns': '2.29.3',
                },
              }}
              options={{
                externalResources,
                visibleFiles: ['/App.js'],
                activeFile: '/App.js',
                recompileMode: "delayed",
                recompileDelay: 500,
              }}
            >
              {!showPreview ? (
                // Code-only view
                <Box style={{ width: '100%', height: 'calc(100vh - 120px)', maxHeight: '800px' }}>
                  <SandpackCodeEditor 
                    showTabs={false}
                    showInlineErrors={true}
                    showLineNumbers={true}
                    closableTabs={false}
                    style={{ height: '100%', fontSize: '14px', maxWidth: '100%' }}
                  />
                </Box>
              ) : (
                // Preview-only view
                <Box style={{ 
                  width: '100%', 
                  height: 'calc(100vh - 120px)',
                  maxHeight: '800px',
                  transition: 'all 0.3s ease-in-out',
                  overflow: 'hidden', // Prevent scrollbars on the container
                  position: 'relative', // Required for absolute positioning of children
                }}>
                  <SandpackPreview 
                    showRefreshButton={true}
                    showOpenInCodeSandbox={false}
                    style={{ 
                      height: '100%', 
                      background: '#fff', 
                      padding: '0', 
                      maxWidth: '100%',
                      width: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}
                  />
                </Box>
              )}
            </SandpackProvider>
          </Box>
        ) : (
          <Box className={classes.placeholder}>
            <Text>Enter component code to preview</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CodePlayground;
