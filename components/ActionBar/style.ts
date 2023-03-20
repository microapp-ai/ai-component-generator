import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    border: `1px solid ${theme.colorScheme === 'dark' ? '#fff' : '#D9D9D9'}`,
    borderRadius: 50,
    position: 'absolute',
    bottom: 5,
    backgroundColor: theme.colorScheme === 'dark' ? '#111' : '#fff',
  },

  icon: {
    border: `1px solid ${theme.colorScheme === 'dark' ? '#fff' : '#111'}`,
    borderRadius: 20,
  },
}));
