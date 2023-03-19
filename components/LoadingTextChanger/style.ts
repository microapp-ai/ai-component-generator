import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  container: {
    width: 210,
    border: `1px solid ${theme.colorScheme === 'dark' ? '#fff' : '#202123'}`,
    borderRadius: '4px 4px 4px 0',
  },

  text: {
    opacity: 1,
    transition: 'opacity 1s ease-in-out',
  },

  textFadeOut: {
    opacity: 0,
    transition: 'opacity 1s ease-in-out',
  },
}));
