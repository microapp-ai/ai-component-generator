import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  button: {
    color: theme.colorScheme === 'dark' ? '#202123' : '#FDFDFD',
    backgroundColor: theme.colorScheme === 'dark' ? '#FDFDFD' : '#202123',
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? '#FDFDFD !important'
          : '#202123 !important',
    },
  },
}));
