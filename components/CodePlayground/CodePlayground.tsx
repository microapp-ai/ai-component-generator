import React, { useState, useEffect, useRef } from 'react';
import { Box, Flex, ActionIcon, Text, Tooltip, useMantineColorScheme, createStyles, Button, Loader, keyframes } from '@mantine/core';
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
  IconBraces,
  IconCode as IconCodeAlt
} from '@tabler/icons-react';
import { Sandpack, SandpackProvider, SandpackCodeEditor, SandpackPreview } from '@codesandbox/sandpack-react';
import { LoadingTextChanger } from '@/components';

interface CodePlaygroundProps {
  code: string;
  title?: string;
  externalResources?: string[];
  className?: string;
}

// Define animations for loading indicator and log entries
const dotsAnimation = keyframes({
  '20%': { backgroundPosition: '0% 0%, 50% 50%, 100% 50%' },
  '40%': { backgroundPosition: '0% 100%, 50% 0%, 100% 50%' },
  '60%': { backgroundPosition: '0% 50%, 50% 100%, 100% 0%' },
  '80%': { backgroundPosition: '0% 50%, 50% 50%, 100% 100%' },
});

const fadeInAnimation = keyframes({
  '0%': { opacity: 0, transform: 'translateY(5px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const fadeOutAnimation = keyframes({
  '0%': { opacity: 1, transform: 'translateY(0)' },
  '100%': { opacity: 0, transform: 'translateY(-5px)' },
});

const typeAnimation = keyframes({
  '0%': { width: '0%' },
  '100%': { width: '100%' },
});

// Sample code snippets to display during loading
const codeSnippets = [
  '> Initializing component generator...',
  '> Analyzing requirements...',
  '> import React, { useState, useEffect } from "react";',
  '> import { Box, Text, Button } from "@mantine/core";',
  '> ',
  '> // Creating component structure',
  '> const Component = () => {',
  '> const [isLoading, setIsLoading] = useState(false);',
  '> const [data, setData] = useState(null);',
  '> ',
  '> // Setting up side effects',
  '> useEffect(() => {',
  '> // Initialize component',
  '> }, []);',
  '> ',
  '> // Adding event handlers',
  '> const handleClick = () => {',
  '> console.log("Button clicked");',
  '> };',
  '> ',
  '> // Building component UI',
  '> return (',
  '> <div className="container">',
  '> <h2>Your component is being created...</h2>',
  '> </div>',
  '> );',
  '> };',
  '> ',
  '> export default Component;',
  '> ',
  '> // Finalizing component...',
];

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

  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    background: theme.colorScheme === 'dark' 
      ? '#1A1B1E' 
      : '#f8f9fa',
  },

  loadingIndicator: {
    width: '60px',
    aspectRatio: '2',
    background: `no-repeat radial-gradient(circle closest-side, ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.dark[9]} 90%, transparent) 0% 50%, 
                no-repeat radial-gradient(circle closest-side, ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.dark[9]} 90%, transparent) 50% 50%, 
                no-repeat radial-gradient(circle closest-side, ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.dark[9]} 90%, transparent) 100% 50%`,
    backgroundSize: 'calc(100%/3) 50%',
    animation: `${dotsAnimation} 1s infinite linear`,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
  },
  
  logEntry: {
    margin: '4px 0',
    opacity: 0,
    animation: `${fadeInAnimation} 0.3s forwards`,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  
  logDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.green[4] : theme.colors.green[6],
    marginRight: '8px',
    flexShrink: 0,
  },
  
  logText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const CodePlayground: React.FC<CodePlaygroundProps> = ({ code, title = 'Component Preview', externalResources = [], className }) => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Toggle between code-only and preview-only views
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // State for managing code snippets display
  const [visibleSnippets, setVisibleSnippets] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const snippetContainerRef = useRef<HTMLDivElement>(null);
  
  // Check if the code is in a loading state
  useEffect(() => {
    // Check for loading state
    const isLoading = code === '// Generating your component...' || 
                      code.includes('Generating your component');
    setIsGenerating(isLoading);
    
    // Reset snippets when loading starts
    if (isLoading) {
      setVisibleSnippets([]);
    }
  }, [code]);
  
  // Blinking cursor effect
  useEffect(() => {
    let cursorInterval: NodeJS.Timeout;
    
    if (isGenerating) {
      cursorInterval = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, 500);
    }
    
    return () => {
      if (cursorInterval) clearInterval(cursorInterval);
    };
  }, [isGenerating]);
  
  // Auto-scroll effect
  useEffect(() => {
    if (snippetContainerRef.current && Array.isArray(visibleSnippets) && visibleSnippets.length > 0) {
      const container = snippetContainerRef.current;
      container.scrollTop = container.scrollHeight;
      
      // Remove oldest items if we have too many
      if (visibleSnippets.length > 15) {
        setTimeout(() => {
          setVisibleSnippets(prev => Array.isArray(prev) && prev.length > 0 ? prev.slice(1) : []);
        }, 300);
      }
    }
  }, [visibleSnippets]);
  
  // Add code snippets one by one during loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGenerating) {
      let currentIndex = 0;
      
      interval = setInterval(() => {
        if (Array.isArray(codeSnippets) && currentIndex < codeSnippets.length) {
          const snippet = codeSnippets[currentIndex];
          if (snippet && typeof snippet === 'string') {
            setVisibleSnippets(prev => Array.isArray(prev) ? [...prev, snippet] : [snippet]);
          }
          currentIndex++;
        } else {
          // Once we've shown all snippets, start over
          currentIndex = 0;
        }
      }, 600);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGenerating]);

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
        {isGenerating ? (
          <Box
            sx={{
              width: '100%',
              height: 'calc(100vh - 120px)',
              maxHeight: '800px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: colorScheme === 'dark' ? '#1A1B1E' : '#f8f9fa',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
            }}>
              {/* Animated dots */}
              <div style={{
                width: '60px',
                aspectRatio: '2',
                background: `no-repeat radial-gradient(circle closest-side, ${colorScheme === 'dark' ? '#333' : '#000'} 90%, #0000) 0% 50%, 
                            no-repeat radial-gradient(circle closest-side, ${colorScheme === 'dark' ? '#333' : '#000'} 90%, #0000) 50% 50%, 
                            no-repeat radial-gradient(circle closest-side, ${colorScheme === 'dark' ? '#333' : '#000'} 90%, #0000) 100% 50%`,
                backgroundSize: 'calc(100%/3) 50%',
                animation: `${dotsAnimation} 1s infinite linear`,
                marginBottom: '30px',
              }} />
              
              {/* Code snippets log */}
              <div 
                ref={snippetContainerRef}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: colorScheme === 'dark' ? '#555' : '#aaa',
                  width: '320px',
                  height: '150px',
                  textAlign: 'left',
                  padding: '10px',
                  borderRadius: '4px',
                  backgroundColor: colorScheme === 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.02)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}>
                <div style={{ overflow: 'hidden', height: '100%' }}>
                  {Array.isArray(visibleSnippets) && visibleSnippets.map((snippet, index) => {
                    const isOldest = index === 0 && visibleSnippets.length > 15;
                    return (
                      <div 
                        key={index}
                        style={{
                          animation: isOldest ? 
                            `${fadeOutAnimation} 0.3s forwards` : 
                            `${fadeInAnimation} 0.3s forwards`,
                          whiteSpace: 'pre',
                          lineHeight: '1.4',
                          color: snippet && typeof snippet === 'string' && snippet.startsWith('> //') ? 
                            (colorScheme === 'dark' ? '#5a7749' : '#007000') : 
                            (colorScheme === 'dark' ? '#666' : '#999')
                        }}
                      >
                        {snippet}
                      </div>
                    );
                  })}
                </div>
                {cursorVisible && isGenerating && (
                  <span 
                    style={{
                      display: 'inline-block',
                      width: '5px',
                      height: '12px',
                      backgroundColor: colorScheme === 'dark' ? '#555' : '#aaa',
                      marginLeft: '2px',
                    }}
                  />
                )}
              </div>
            </div>
          </Box>
        ) : code && typeof code === 'string' && code.trim() !== '' ? (
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
                  '@tabler/icons-react': '2.30.0',
                  '@mantine/core': '6.0.0',
                  '@mantine/hooks': '6.0.0',
                  'react-icons': '4.10.1',
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
