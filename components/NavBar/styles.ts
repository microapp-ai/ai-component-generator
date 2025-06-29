import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    position: 'relative',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: theme.colorScheme === 'dark' ? '#202123' : '#FFFFFF',
  },

  inner: {
    height: 72,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  navLink: {
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
    '&:hover': {
      opacity: 0.8,
      textDecoration: 'none',
    },
  },

  dropdown: {
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1.2,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.dark[6],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',

    '&:hover': {
      backgroundColor: 'transparent',
      opacity: 0.8,
    },
  },
}));
