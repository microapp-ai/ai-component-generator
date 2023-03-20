import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  iconContainer: {
    border: `1px solid ${theme.colorScheme === 'dark' ? '#fff' : '#D9D9D9'}`,
  },
}));
