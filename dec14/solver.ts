const parseInput = (input: string) => {
  const patterns = input.split('\n\n');

  return patterns.map((pattern) => {
    return pattern.split('\n');
  });
};

const flipSymbol = (symbol: string) => {
  if (symbol === '.') {
    return '#';
  } else if (symbol === '#') {
    return '.';
  } else {
    return symbol;
  }
}

function transposeStrings(input: string[]): string[] {
  let result: string[] = Array(input[0].length).fill('');

  for (let i = 0; i < input[0].length; i++) {
    for (let str of input) {
      result[i] += str[i] || '';
    }
  }

  return result;
}
const part1 = (input: string) => {
  return 0;
};

const part2 = (input: string) => {
  
  return 0;
};

export default {
  part1,
  part2,
};
