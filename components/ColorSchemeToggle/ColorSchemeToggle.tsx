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
        size="md"
        className={classes.iconContainer}
        radius="xl"
      >
        {colorScheme === 'dark' ? (
          <IconSunFilled color="white" size={16} stroke={1.5} />
        ) : (
          <IconMoonFilled style={{ color: '#202123' }} size={16} stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  );
};

export default ColorSchemeToggle;
