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

const findHorizontailReflectionPoint = (set: string[], exclude?: number) => {
  for (let i = 1; i < set.length; i++) {
    let backIdx = i - 1;
    let fwdIdx = i;
    while (set[backIdx] === set[fwdIdx]) {
      backIdx--;
      fwdIdx++;
    }
    if (fwdIdx - backIdx > 1 && (backIdx === -1 || fwdIdx === set.length)) {
      if (exclude && exclude === i) {
        continue;
      }
      return i;
    }
  }
  return 0;
};

const part1ReflecionLines: {row?: number, col?: number}[] = [];

const part1 = (input: string) => {
  const inputSets = parseInput(input);
  let output = 0;
  inputSets.forEach((set, index) => {
    // Find horizontail reflection
    let setScore = 0;
    setScore = findHorizontailReflectionPoint(set);
    if (setScore > 0) {
      // Horizontal reflection found
      output += 100 * setScore;
      part1ReflecionLines.push({row: setScore});
      return;
    } else {
      // Look for vertical reflection
      let transposed = transposeStrings(set);

      setScore = findHorizontailReflectionPoint(transposed);
      output += setScore;
      part1ReflecionLines.push({col: findHorizontailReflectionPoint(transposed)});
      return;
    }
  });
  return output;
};

const part2 = (input: string) => {
  const inputSets = parseInput(input);
  const arraySets = inputSets.map((set) => {
    return set.map((row) => row.split(''));
  });
  let output = 0;
  arraySets.forEach((set, index) => {
    for (let i = 0; i < set.length; i++) {
      for (let j = 0; j < set[i].length; j++) {
        let testSet = set.map((row) => [...row]);
        testSet[i][j] = flipSymbol(set[i][j]);
        let setScore = 0;
        const stringSet = testSet.map((row) => row.join(''));
        setScore = findHorizontailReflectionPoint(stringSet, part1ReflecionLines[index]?.row);
        if (setScore > 0) {
          // Horizontal reflection found
          output += 100 * setScore;
          return;
        } else {
          // Look for vertical reflection
          let transposed = transposeStrings(stringSet);
          setScore = findHorizontailReflectionPoint(transposed, part1ReflecionLines[index]?.col);
          if (setScore > 0) {
            output += setScore;
            return;
          }
        }
      }
    }
  });
  return output;
};

export default {
  part1,
  part2,
};
