import { FC, KeyboardEventHandler } from 'react';
import { Autocomplete, MantineNumberSize, MantineSize } from '@mantine/core';

interface PromptInputProps {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown: KeyboardEventHandler<HTMLInputElement> | undefined;
  placeholder: string;
  radius?: MantineNumberSize | undefined;
  size?: MantineSize | undefined;
}

const PromptInput: FC<PromptInputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  radius = '32px',
  size = 'xl',
}) => {
  return (
    <Autocomplete
      radius={radius}
      w="100%"
      size={size}
      withinPortal
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      data={[
        {
          value:
            'a white board to draw with the mouse, a color picker and a reset button',
          group: 'Most used',
        },
        { value: 'a mortgage calculator', group: 'Most used' },
        { value: 'a tip calculator', group: 'Most used' },
        { value: 'a password generator', group: 'Most used' },
        { value: 'a calendar', group: 'Most used' },
        { value: 'a product card', group: 'Most used' },
      ]}
      onKeyDown={onKeyDown}
    />
  );
};

export default PromptInput;
