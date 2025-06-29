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
  IconMaximize,
  IconBrandGithub
} from '@tabler/icons-react';
import { Sandpack, SandpackProvider, SandpackCodeEditor, SandpackPreview } from '@codesandbox/sandpack-react';

interface CodePlaygroundProps {
  code: string;
  title?: string;
  externalResources?: string[];
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
    backgroundColor: '#111',
    color: '#fff',
    padding: '8px 16px',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    height: '48px',
  },
  
  title: {
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 500,
    color: '#fff',
    maxWidth: '300px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
    color: '#fff',
    opacity: 0.7,
    backgroundColor: 'transparent',
    transition: 'all 0.2s ease',
    padding: '4px 12px',
    borderRadius: theme.radius.sm,
    fontSize: '13px',
    fontWeight: 500,
    height: '32px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      opacity: 0.9,
    },
  },
  
  activeTab: {
    opacity: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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
  },
  
  sandpack: {
    height: '100%',
    width: '100%',
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
      borderRadius: 0,
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
  
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
}));

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  code,
  title = 'Empty and Blank Page',
  externalResources = ['https://cdn.tailwindcss.com'],
}) => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [activeTab, setActiveTab] = useState<'code' | 'preview' | 'split'>('split');
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
    <Box className={classes.container}>
      {/* Toolbar */}
      <Flex className={classes.toolbar}>
        <Flex align="center" gap="md">
          <Text className={classes.title}>{title}</Text>
        </Flex>
        
        <Flex align="center" gap="md">
          <Box className={classes.tabsContainer}>
            <Button 
              variant="subtle"
              className={`${classes.tabButton} ${activeTab === 'code' ? classes.activeTab : ''}`}
              onClick={() => setActiveTab('code')}
              leftIcon={<IconCode size={16} />}
              compact
            >
              Code
            </Button>
            
            <Button 
              variant="subtle"
              className={`${classes.tabButton} ${activeTab === 'split' ? classes.activeTab : ''}`}
              onClick={() => setActiveTab('split')}
              compact
            >
              Split
            </Button>
            
            <Button 
              variant="subtle"
              className={`${classes.tabButton} ${activeTab === 'preview' ? classes.activeTab : ''}`}
              onClick={() => setActiveTab('preview')}
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
            
            <Tooltip label="View on GitHub" position="top" withArrow>
              <ActionIcon className={classes.actionButton}>
                <IconBrandGithub size={18} />
              </ActionIcon>
            </Tooltip>
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
              {activeTab === 'code' && (
                <SandpackCodeEditor 
                  showTabs={false}
                  showInlineErrors={true}
                  showLineNumbers={true}
                  style={{ height: 'calc(100vh - 120px)', width: '100%', fontSize: '14px', maxWidth: '100%' }}
                  closableTabs={false}
                />
              )}
              
              {activeTab === 'preview' && (
                <SandpackPreview 
                  showRefreshButton={true}
                  showOpenInCodeSandbox={false}
                  style={{ height: 'calc(100vh - 120px)', width: '100%', background: '#fff', padding: '16px', maxWidth: '100%' }}
                />
              )}
              
              {activeTab === 'split' && (
                <Flex style={{ width: '100%', height: '100%' }}>
                  <Box style={{ width: '45%', height: 'calc(100vh - 120px)', borderRight: '1px solid #eaeaea' }}>
                    <SandpackCodeEditor 
                      showTabs={false}
                      showInlineErrors={true}
                      showLineNumbers={true}
                      closableTabs={false}
                      style={{ height: '100%', fontSize: '14px', maxWidth: '100%' }}
                    />
                  </Box>
                  <Box style={{ width: '55%', height: 'calc(100vh - 120px)' }}>
                    <SandpackPreview 
                      showRefreshButton={true}
                      showOpenInCodeSandbox={false}
                      style={{ height: '100%', background: '#fff', padding: '16px', maxWidth: '100%' }}
                    />
                  </Box>
                </Flex>
              )}
            </SandpackProvider>
          </Box>
        ) : (
          <Box className={classes.errorBox}>
            Unable to render code preview. Please check your input or try again.
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CodePlayground;
