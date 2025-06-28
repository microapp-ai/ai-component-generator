import { ActionIcon, Group, useMantineColorScheme } from '@mantine/core';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import { useStyles } from './styles';

const ColorSchemeToggle = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position="center">
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size="lg"
        className={classes.iconContainer}
      >
        {colorScheme === 'dark' ? (
          <IconSunFilled color="white" size={15} stroke={1.5} />
        ) : (
          <IconMoonFilled style={{ color: '#202123' }} size={18} stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  );
};

export default ColorSchemeToggle;
