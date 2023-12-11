import { on } from 'events';
import { relative } from 'path';

class Point {
  char: string;
  x: number;
  y: number;
  constructor(char: string, x: number, y: number) {
    this.char = char;
    this.x = x;
    this.y = y;
  }
  getNeighbours(lines: string[]) {
    const xMax = lines[0].length - 1;
    const yMax = lines.length - 1;
    const neighbours: [number, number][] = [
      [Math.min(this.x + 1, yMax), this.y],
      [this.x, Math.min(this.y + 1, xMax)],
      [Math.max(this.x - 1, 0), this.y],
      [this.x, Math.max(this.y - 1, 0)],
    ];
    return neighbours;
  }
  isConnected(point: Point) {
    const charA = this.char;
    const charB = point.char;
    if (charB === '.') return false;

    const dx = point.x - this.x;
    const dy = point.y - this.y;
    if (dx === 1 && dy === 0) {
      return (
        ['|', 'F', '7', 'S'].includes(charA) &&
        ['|', 'J', 'L', 'S'].includes(charB)
      );
    } else if (dx === -1 && dy === 0) {
      return (
        ['|', 'J', 'L', 'S'].includes(charA) &&
        ['|', 'F', '7', 'S'].includes(charB)
      );
    } else if (dx === 0 && dy === 1) {
      return (
        ['-', 'F', 'L', 'S'].includes(charA) &&
        ['-', 'J', '7', 'S'].includes(charB)
      );
    } else if (dx === 0 && dy === -1) {
      return (
        ['-', 'J', '7', 'S'].includes(charA) &&
        ['-', 'F', 'L', 'S'].includes(charB)
      );
    }
  }
  copy() {
    return new Point(this.char, this.x, this.y);
  }

  toString() {
    return `Point(${this.char}, ${this.x}, ${this.y})`;
  }
}

const parseInput = (input: string) => {
  const lines = input.split('\n');
  const startingPoint: Point = new Point('', 0, 0);
  lines.forEach((line, index) => {
    if (line.includes('S')) {
      startingPoint.char = 'S';
      startingPoint.x = index;
      startingPoint.y = line.indexOf('S');
    }
  });
  return [startingPoint, lines] as const;
};

const buildLoop = (input: string) => {
  const [startingPoint, lines] = parseInput(input);
  let lastPoint: Point | null = null;
  let currentPoint = startingPoint;
  let neighbours = [];
  let nextCoords: [number, number];
  let loop = [];
  do {
    neighbours = currentPoint.getNeighbours(lines);
    lastPoint = loop[loop.length - 1];
    nextCoords = neighbours.find((neighbour) => {
      // console.log('Neighbour: ', neighbour);
      return (
        currentPoint.isConnected(
          new Point(
            lines[neighbour[0]][neighbour[1]],
            neighbour[0],
            neighbour[1]
          )
        ) &&
        (lastPoint === undefined ||
          neighbour[0] !== lastPoint?.x ||
          neighbour[1] !== lastPoint?.y)
      );
    }) as [number, number];
    loop.push(currentPoint.copy());
    currentPoint = new Point(
      lines[nextCoords[0]][nextCoords[1]],
      nextCoords[0],
      nextCoords[1]
    );
  } while (currentPoint.char !== 'S');

  return loop;
};

function replaceAt(string: string, index: number, replacement: string) {
  return (
    string.slice(0, index) +
    replacement +
    string.slice(index + replacement.length)
  );
}

const part1 = (input: string) => {
  const loop = buildLoop(input);
  return loop.length / 2;
};

const part2 = (input: string) => {
  const loop = buildLoop(input);
  const lines = input.split('\n');
  //Replace S
  const start = loop[0];
  const relativeNeighbours = start
    .getNeighbours(lines)
    .filter((neighbour) =>
      start.isConnected(
        new Point(lines[neighbour[0]][neighbour[1]], neighbour[0], neighbour[1])
      )
    )
    .map(
      (neighbour) => `(${neighbour[0] - start.x}, ${neighbour[1] - start.y})`
    );
  if (relativeNeighbours.length !== 2)
    throw new Error('Invalid starting point');

  if (
    relativeNeighbours.includes('(1, 0)') &&
    relativeNeighbours.includes('(0, 1)')
  ) {
    start.char = 'F';
  } else if (
    relativeNeighbours.includes('(1, 0)') &&
    relativeNeighbours.includes('(0, -1)')
  ) {
    start.char = '7';
  } else if (
    relativeNeighbours.includes('(0, -1)') &&
    relativeNeighbours.includes('(0, 1)')
  ) {
    start.char = '-';
  } else if (
    relativeNeighbours.includes('(-1, 0)') &&
    relativeNeighbours.includes('(1, 0)')
  ) {
    start.char = '|';
  } else if (
    relativeNeighbours.includes('(-1, 0)') &&
    relativeNeighbours.includes('(-1, 0)')
  ) {
    start.char = 'J';
  } else if (
    relativeNeighbours.includes('(-1, 0)') &&
    relativeNeighbours.includes('(0, 1)')
  ) {
    start.char = 'L';
  }
  loop[0].char = start.char;
  lines[start.x] = replaceAt(lines[start.x], start.y, start.char);

  // Find area
  let output = [];
  let area = 0;
  for (let i = 0; i < lines.length; i++) {
    let inside = false;
    let outputLine = [];
    let lastEdgeIndex = 0;
    for (let j = 0; j < lines[i].length; j++) {
      if (loop.findIndex((point) => point.x === i && point.y === j) !== -1) {
        if (
          (!inside && ['|', 'J', '7'].includes(lines[i][j])) ||
          (inside && ['|', 'L', 'F'].includes(lines[i][j]))
        ) {
          inside = !inside;
        }
        outputLine.push(lines[i][j]);
        lastEdgeIndex = j;
      } else {
        if (inside) {
          area++;
          outputLine.push('#');
        } else {
          outputLine.push(lines[i][j]);
        }
      }
    }
    if (inside) area -= lines[i].length - lastEdgeIndex - 1;
    output.push(outputLine);
  }
  console.log(
    output
      .map((line) => line.join())
      .join('\n')
      .replace(/,/g, '')
  );
  return area;
};

export default {
  part1,
  part2,
};

// Wrong 1717, 1309, 1668, 1096, 913, 515, 455
