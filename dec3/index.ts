import { readFileSync } from 'fs';

type Gear = {
  row: number,
  column: number,
  number1: number,
  number2: number
};

const file = readFileSync('./input.txt', 'utf8');

const lines = file.split('\n');

const isSymbol = (char: string) => {
  return !/[a-zA-Z0-9\s]/.test(char) && char !== '.' && char !== '';
};

const isGear = (char: string) => {
  return char === "*";
}

const isNumber = (char: string) => {
  return /[0-9]/.test(char);
};

const getAdjacentIndices = (lineIndex: number, charIndex: number) => {
  return [
    [lineIndex, charIndex - 1],
    [lineIndex, charIndex + 1],
    [lineIndex - 1, charIndex],
    [lineIndex + 1, charIndex],
    [lineIndex - 1, charIndex - 1],
    [lineIndex - 1, charIndex + 1],
    [lineIndex + 1, charIndex - 1],
    [lineIndex + 1, charIndex + 1],
  ];
}

const getAdjacentChars = (lineIndex: number, charIndex: number, lines: string[]) => {
  const lastLineIdx = lines.length - 1;
  const lastCharIdx = lines[lineIndex].length - 1;
  return getAdjacentIndices(lineIndex, charIndex).map(([lineIdx, charIdx]) => {
    if (lineIdx < 0 || lineIdx > lastLineIdx || charIdx < 0 || charIdx > lastCharIdx) {
      return '';
    }
    return lines[lineIdx][charIdx];
  });
};

const getAdjacentGear = (lineIndex: number, charIndex: number, gears: Gear[]) => {
  const adjIndices = getAdjacentIndices(lineIndex, charIndex);
  return gears.filter(gear => {
    if (adjIndices.some(([lineIdx, charIdx]) => lineIdx === gear.row && charIdx === gear.column)) {
      return true;
    }
    else {
      return false;
    }
  });
};

let sum1 = 0;
let sum2 = 0

lines.forEach((line, lineIndex) => {
  let foundNumber = false;
  let currentNumber = 0;
  let adjacent: string[] = [];
  for (let charIndex = 0; charIndex < line.length + 1; charIndex++) {
    const currentChar = line[charIndex];
    if (isNumber(currentChar)) {
      // Build number and collect adjacent chars
      currentNumber = currentNumber * 10 + parseInt(currentChar);
      foundNumber = true;
      adjacent = [...adjacent, ...getAdjacentChars(lineIndex, charIndex, lines)];
    } else if (foundNumber || charIndex === line.length - 1) {
      // If number complete, check adjacents for symbols and add number to summ
      if (adjacent.some(isSymbol)) {
        sum1 += currentNumber;
      }
      // Reset number and adjacent
      currentNumber = 0;
      foundNumber = false;
      adjacent = [];
    }
  }
});

// Find all gears
let gears: Gear[] = [];
lines.forEach((line, lineIndex) => {
  line.split("").forEach((char, charIndex) => {
    if (isGear(char)) {
      gears.push({
        row: lineIndex,
        column: charIndex,
        number1: 0,
        number2: 0
      })
    }
  });
});

lines.forEach((line, lineIndex) => {
  let currentNumber = 0;
  let foundNumber = false;
  let currentGear = null;
  for (let charIndex = 0; charIndex < line.length + 1; charIndex++) {
    const currentChar = line[charIndex];
    if (isNumber(currentChar)) {
      // Build number and check for adjacent gears
      currentNumber = currentNumber * 10 + parseInt(currentChar);
      foundNumber = true;
      const adjacentGears = getAdjacentGear(lineIndex, charIndex, gears);
      if (adjacentGears.length > 0) {
        // If gear is found, track it
        currentGear = adjacentGears[0];
      }
    } else if (foundNumber || charIndex === line.length - 1) {
      // Once number is complete, assign it to the gear (nullify gear if 2 numbers already assigned, i.e. more than 2 adjacent numbers)
      if (currentGear !== null) {
        if (currentGear.number1 === 0) {
          currentGear.number1 = currentNumber;
        } else if (currentGear.number2 === 0) {
          currentGear.number2 = currentNumber;
        } else {
          currentGear.number1 = 0;
          currentGear.number2 = 0;
        }
        // Reset gear
        currentGear = null;
      }
      // Reset number
      currentNumber = 0;
      foundNumber = false;
    }
  }
});

// Compute sum
gears.forEach(gear => {
  if (gear.number1 !== 0 && gear.number2 !== 0) {
    sum2 += gear.number1 * gear.number2;
  }
});

console.log('Part 1 result: ', sum1);
console.log('Part 2 result: ', sum2);