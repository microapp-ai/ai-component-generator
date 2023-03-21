import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    border: `1px solid ${theme.colorScheme === 'dark' ? '#fff' : '#D9D9D9'}`,
    borderRadius: 50,
    position: 'absolute',
    bottom: 5,
    backgroundColor: theme.colorScheme === 'dark' ? '#111' : '#fff',
    boxShadow: '0px 0px 12px 6px rgba(0, 0, 0, 0.07)',
  },

  icon: {
    border: `1px solid ${theme.colorScheme === 'dark' ? '#fff' : '#D9D9D9'}`,
    borderRadius: 20,
    padding: 17,
  },

  promptContainer: {
    position: 'absolute',
    top: -65,
    maxWidth: '100%',
    borderRadius: 8,
    padding: 12,
    backgroundColor: theme.colorScheme === 'dark' ? '#4A4B4E' : '#EBEBEB',
    border: `1px solid ${theme.colorScheme === 'dark' ? '#fff' : '#D9D9D9'}`,
  },

  promptCopyIconButton: {
    border: `1px solid ${theme.colorScheme === 'dark' ? '#FDFDFD' : '#202123'}`,
  },

  promptText: {
    color: theme.colorScheme === 'dark' ? '#FDFDFD' : '#202123',
  },
}));
