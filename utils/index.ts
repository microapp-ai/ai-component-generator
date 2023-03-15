import {
  REACT_BUTTON,
  REACT_BUTTON_STYLED,
  REACT_CALENDAR,
  REACT_FORM,
  SVELTE_BUTTON,
  SVELTE_BUTTON_STYLED,
  SVELTE_CALENDAR,
  SVELTE_FORM,
  VUE_BUTTON,
  VUE_BUTTON_STYLED,
  VUE_CALENDAR,
  VUE_FORM,
} from '@/constants';

// Remove unwanted strings
export const removeTripleBackticksAndJsx = (input: string): string => {
  // remove triple backticks
  let output = input.replace(/```/g, '');

  // remove "jsx" string
  output = output.replace(/jsx/g, '');

  // remove "js" string
  output = output.replace(/js/g, '');

  // remove "html" string
  output = output.replace(/html/g, '');

  return output;
};

export const cleanCode = (snippet: string): string => {
  const lines = snippet.split('\n');
  const cleanedLines = lines.slice(1, lines.length - 1);
  return cleanedLines.join('\n');
};

export enum Component {
  REACT = 'REACT',
  SVELTE = 'SVELTE',
  VUE = 'VUE',
}

export enum ComponentType {
  BUTTON = 'BUTTON',
  BUTTON_STYLED = 'BUTTON_STYLED',
  FORM = 'FORM',
  CALENDAR = 'CALENDAR',
}

type ComponentData = {
  [key in ComponentType]: string;
};

type Components = {
  [key in Component]: ComponentData;
};

const COMPONENTS: Components = {
  [Component.REACT]: {
    [ComponentType.BUTTON]: REACT_BUTTON,
    [ComponentType.BUTTON_STYLED]: REACT_BUTTON_STYLED,
    [ComponentType.FORM]: REACT_FORM,
    [ComponentType.CALENDAR]: REACT_CALENDAR,
  },
  [Component.SVELTE]: {
    [ComponentType.BUTTON]: SVELTE_BUTTON,
    [ComponentType.BUTTON_STYLED]: SVELTE_BUTTON_STYLED,
    [ComponentType.FORM]: SVELTE_FORM,
    [ComponentType.CALENDAR]: SVELTE_CALENDAR,
  },
  [Component.VUE]: {
    [ComponentType.BUTTON]: VUE_BUTTON,
    [ComponentType.BUTTON_STYLED]: VUE_BUTTON_STYLED,
    [ComponentType.FORM]: VUE_FORM,
    [ComponentType.CALENDAR]: VUE_CALENDAR,
  },
};

export function getCode(component: Component, type: ComponentType): string {
  const componentData = COMPONENTS[component];

  if (!componentData) {
    throw new Error(`Unknown component: ${component}`);
  }

  const code = componentData[type];

  if (!code) {
    throw new Error(`Unknown component type: ${type}`);
  }

  return code;
}
