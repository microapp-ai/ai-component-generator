import { FC, KeyboardEventHandler, forwardRef } from 'react';
import { Autocomplete, MantineNumberSize, MantineSize, Box, Group, Text } from '@mantine/core';

interface PromptInputProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  radius?: MantineNumberSize | undefined;
  size?: MantineSize | undefined;
  autoFocus?: boolean;
}

const PromptInput: FC<PromptInputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  radius = 'md',
  size = 'md',
  autoFocus = false,
}) => {
  return (
    <Box sx={{ position: 'relative' }}>

      <Autocomplete
        autoFocus={autoFocus}
        radius={radius}
        w="100%"
        size={size}
        withinPortal
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data={[]}
        onKeyDown={onKeyDown}
        itemComponent={AutocompleteItem}
        styles={(theme) => ({
          root: {
            position: 'relative',
          },
          input: {
            height: '104px',
            fontSize: '16px',
            paddingLeft: '16px',
            paddingRight: '120px', // Space for the button
            paddingTop: '2px', // Minimal top padding
            paddingBottom: '12px',
            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
            boxShadow: 'none',
            borderRadius: theme.radius.xl,
            verticalAlign: 'top',
            lineHeight: 1.2,
            '&::placeholder': {
              color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
            },
            '&:focus': {
              borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3],
              outline: 'none',
            },
          },
          dropdown: {
            border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            marginTop: '8px',
            overflow: 'hidden',
            borderRadius: theme.radius.md,
            padding: '0',
          },
          item: {
            fontSize: '16px',
            padding: '16px 20px',
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
            '&:last-child': {
              borderBottom: 'none',
            },
            '&[data-selected]': {
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
              color: theme.colorScheme === 'dark' ? theme.white : theme.black,
            },
          },
          itemsWrapper: {
            padding: 0,
          },
        })}
      />
    </Box>
  );
};

// Custom item component to display 'build' prefix
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
  [key: string]: any;
}

const AutocompleteItem = forwardRef<HTMLDivElement, ItemProps>((
  { value, ...others }: ItemProps,
  ref
) => (
  <div ref={ref} {...others}>
    <Group noWrap spacing={4}>
      <Text color="dimmed" size="sm" style={{ fontWeight: 400 }}>
        build
      </Text>
      <Text>{value}</Text>
    </Group>
  </div>
));

AutocompleteItem.displayName = 'AutocompleteItem';

export default PromptInput;
