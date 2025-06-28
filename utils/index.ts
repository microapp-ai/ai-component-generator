// Remove unwanted strings
export const removeTripleBackticksAndJsx = (input: string): string => {
  // remove triple backticks
  let output = input.replace(/```/g, '');

  // remove "jsx" string
  output = output.replace(/jsx/g, '');

  // remove "js" string
  output = output.replace(/js/g, '');

  return output;
};

export const cleanCode = (code: string): string => {
  const lines = code.split('\n');

  // Find the index of the line that contains the first import statement
  let startIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import')) {
      startIndex = i;
      break;
    }
  }

  // Find the index of the line that contains the component declaration
  let endIndex = 0;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith('export default')) {
      endIndex = i;
      break;
    }
  }

  // Join the lines from the start index to the end index (inclusive)
  return lines.slice(startIndex, endIndex + 1).join('\n');
};
