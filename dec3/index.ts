import { readFileSync } from 'fs';

const file = readFileSync('./input.txt', 'utf8');

const lines = file.split('\n');

const isSymbol = (char: string) => {
  let charcode = char.charCodeAt(0);
  return (
    charcode !== 46 &&
    ((charcode > 57 && char.charCodeAt(0) < 65) ||
      (charcode > 90 && charcode < 97) ||
      charcode > 122 ||
      charcode < 48)
  );
};

const isNumber = (char: string) => {
  let charcode = char.charCodeAt(0);
  return charcode >= 48 && charcode <= 57;
};

const getAdjacent = (lineIndex: number, charIndex: number, lines: string[]) => {
  return [
    lines[lineIndex][Math.max(charIndex - 1, 0)],
    lines[lineIndex][Math.min(charIndex + 1, lines[lineIndex].length - 1)],
    lines[Math.max(lineIndex - 1, 0)][charIndex],
    lines[Math.min(lineIndex + 1, lines[lineIndex].length - 1)][charIndex],
    lines[Math.max(lineIndex - 1, 0)][Math.max(charIndex - 1, 0)],
    lines[Math.max(lineIndex - 1, 0)][
      Math.min(charIndex + 1, lines[lineIndex].length - 1)
    ],
    lines[Math.min(lineIndex + 1, lines[lineIndex].length - 1)][
      Math.max(charIndex - 1, 0)
    ],
    lines[Math.min(lineIndex + 1, lines[lineIndex].length - 1)][
      Math.min(charIndex + 1, lines[lineIndex].length - 1)
    ],
  ];
};

let sum = 0;

lines.forEach((line, lineIndex) => {
  let foundNumber = false;
  // console.log(`Length ${line.length}, ${line}`)
  let currentNumber = 0;
  let adjacent: string[] = [];
  for (let charIndex = 0; charIndex < line.length; charIndex++) {
    if (isNumber(line[charIndex])) {
      currentNumber = currentNumber * 10 + parseInt(line[charIndex]);
      foundNumber = true;
      adjacent = [...adjacent, ...getAdjacent(lineIndex, charIndex, lines)];
    } else if (foundNumber) {
      if (adjacent.some(isSymbol)) {
        sum += currentNumber;
      } else {
        console.log(currentNumber, `line: ${lineIndex + 1}`)
      }
      // console.log(currentNumber, adjacent, adjacent.some(isSymbol));
      currentNumber = 0;
      foundNumber = false;
      adjacent = [];
    }
  }
});

console.log('Part 1 result: ', sum);
