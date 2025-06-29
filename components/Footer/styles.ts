import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  footer: {
    width: '100%',
    marginTop: 'auto',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: theme.colorScheme === 'dark' ? '#202123' : '#FFFFFF',
  },

  footerText: {
    fontFamily: 'Inter, sans-serif',
  },

  links: {
    display: 'flex',
    flexDirection: 'row',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  description: {
    marginTop: 5,
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xs,
      textAlign: 'center',
    },
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  link: {
    display: 'block',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    fontFamily: 'Inter, sans-serif',
    paddingTop: 3,
    paddingBottom: 3,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      opacity: 0.8,
      textDecoration: 'none',
    },
  },

  afterFooter: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    [theme.fn.smallerThan('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },

  gridItem: {
    [theme.fn.smallerThan('sm')]: {
      order: -1,
      marginBottom: 16,
    },
  },

  social: {
    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.md,
    },
  },
}));
