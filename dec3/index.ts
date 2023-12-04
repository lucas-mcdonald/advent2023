import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf8');

const lines = file.split('\n');

const isSymbol = (char: string) => {
  return !/[a-zA-Z0-9]/.test(char) && char !== '.' && char !== '/n';
};

const isGear = (char: string) => {
  return char === "*";
}

const isNumber = (char: string) => {
  return /[0-9]/.test(char);
};

const getAdjacent = (lineIndex: number, charIndex: number, lines: string[]) => {
  const lastIdx = lines[lineIndex].length - 1;
  return [
    lines[lineIndex][Math.max(charIndex - 1, 0)],
    lines[lineIndex][Math.min(charIndex + 1, lastIdx)],
    lines[Math.max(lineIndex - 1, 0)][charIndex],
    lines[Math.min(lineIndex + 1, lastIdx)][charIndex],
    lines[Math.max(lineIndex - 1, 0)][Math.max(charIndex - 1, 0)],
    lines[Math.max(lineIndex - 1, 0)][Math.min(charIndex + 1, lastIdx)],
    lines[Math.min(lineIndex + 1, lastIdx)][Math.max(charIndex - 1, 0)],
    lines[Math.min(lineIndex + 1, lastIdx)][Math.min(charIndex + 1, lastIdx)],
  ];
};

let sum1 = 0;
let sum2 = 0

lines.forEach((line, lineIndex) => {
  let foundNumber = false;
  // console.log(`Length ${line.length}, ${line}`)
  let currentNumber = 0;
  let adjacent: string[] = [];
  // console.log(line.split(""))
  for (let charIndex = 0; charIndex < line.length + 1; charIndex++) {
    if (charIndex === line.length) {
      if (foundNumber) {
        if (adjacent.some(isSymbol)) {
          sum1 += currentNumber;
        }
        currentNumber = 0;
        foundNumber = false;
        adjacent = [];
        break;
      }
    }

    const currentChar = line[charIndex];

    if (isNumber(currentChar)) {
      currentNumber = currentNumber * 10 + parseInt(currentChar);
      foundNumber = true;

      adjacent = [...adjacent, ...getAdjacent(lineIndex, charIndex, lines)];
    } else if (foundNumber) {
      if (adjacent.some(isSymbol)) {
        sum1 += currentNumber;
      }
      // console.log(currentNumber, adjacent, adjacent.some(isSymbol));
      currentNumber = 0;
      foundNumber = false;
      adjacent = [];
    }
  }
});

console.log('Part 1 result: ', sum1);

type Gear = {
  row: number,
  column: number,
  number1: number,
  number2: number
}

lines.forEach((line, lineIndex) => {
  let gears: Gear[] = [];
  let foundNumber = false;
  let currentNumber = 0;
  let adjacent: string[] = [];
  let gearRatio = 0;

  for (let charIndex = 0; charIndex < line.length + 1; charIndex++) {
    if (charIndex === line.length) {
      if (foundNumber) {
        if (adjacent.some(isGear)) {
          if (gearRatio === 0) {
            gearRatio = currentNumber;
          } else {
            sum2 += currentNumber * gearRatio;
            gearRatio = 0
          }
        }
        currentNumber = 0;
        foundNumber = false;
        adjacent = [];
        break;
      }
    }

    const currentChar = line[charIndex];

    if (isNumber(currentChar)) {
      currentNumber = currentNumber * 10 + parseInt(currentChar);
      foundNumber = true;

      adjacent = [...adjacent, ...getAdjacent(lineIndex, charIndex, lines)];
    } else if (foundNumber) {
      if (adjacent.some(isGear)) {
        if (gearRatio === 0) {
          gearRatio = currentNumber;
        } else {
          sum2 += currentNumber * gearRatio;
          gearRatio = 0
        }
      }
      // console.log(currentNumber, adjacent, adjacent.some(isSymbol));
      currentNumber = 0;
      foundNumber = false;
      adjacent = [];
    }
  }
});

console.log('Part 2 result: ', sum2);
// specialCharacters.forEach(char => {
//   console.log(`Char: ${char} - ${isSymbol(char)}`)
// })
