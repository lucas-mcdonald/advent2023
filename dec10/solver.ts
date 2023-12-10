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
    const maxIndex = lines[0].length - 1;
    const neighbours: [number, number][] = [
      [Math.min(this.x + 1, maxIndex), this.y],
      [this.x, Math.min(this.y + 1, maxIndex)],
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
    // console.log('dx: ', dx, ' dy: ', dy)
    // console.log('Point A: ', this.toString());
    // console.log('Point B: ', point.toString());
    if (dx === 1 && dy === 0) {
      // console.log('Case [1, 0] - ', 'A: ', charA, ' B: ', charB);
      // console.log(['|', 'F', '7', 'S'].includes(charA));
      // console.log(['|', 'J', 'L', 'S'].includes(charB));
      return (
        ['|', 'F', '7', 'S'].includes(charA) &&
        ['|', 'J', 'L', 'S'].includes(charB)
      );
    } else if (dx === -1 && dy === 0) {
      // console.log('Case [-1, 0] - ', 'A: ', charA, ' B: ', charB);
      return (
        ['|', 'J', 'L', 'S'].includes(charA) &&
        ['|', 'F', '7', 'S'].includes(charB)
      );
    } else if (dx === 0 && dy === 1) {
      // console.log('Case [0, 1] - ', 'A: ', charA, ' B: ', charB);
      return (
        ['-', 'F', 'L', 'S'].includes(charA) &&
        ['-', 'J', '7', 'S'].includes(charB)
      );
    } else if (dx === 0 && dy === -1) {
      // console.log('Case [0, -1] - ', 'A: ', charA, ' B: ', charB);
      return (
        ['-', 'J', '7', 'S'].includes(charA) &&
        ['-', 'F', 'L', 'S'].includes(charB)
      );
    }
  }

  toString() {
    return `Point(${this.char}, ${this.x}, ${this.y})`;
  }
}

const pipeMap = new Map<string, [number, number][]>([
  ['|', [[1, 0]]],
  ['-', [[0, 1]]],
  [
    'L',
    [
      [1, 0],
      [0, 1],
    ],
  ],
  [
    'J',
    [
      [1, 0],
      [0, -1],
    ],
  ],
  [
    '7',
    [
      [0, 1],
      [1, 0],
    ],
  ],
  [
    'F',
    [
      [0, -1],
      [1, 0],
    ],
  ],
  ['.', []],
]);

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

const part1 = (input: string) => {
  const [startingPoint, lines] = parseInput(input);
  let lastPoint: Point | null = null;
  let currentPoint = startingPoint;
  let neighbours = [];
  let nextCoords: [number, number];
  let steps = 0;
  do {
    neighbours = currentPoint.getNeighbours(lines);
    nextCoords = neighbours.find(
      (neighbour) => {
        // console.log('Neighbour: ', neighbour);
        return currentPoint.isConnected(
          new Point(
            lines[neighbour[0]][neighbour[1]],
            neighbour[0],
            neighbour[1]
          )
        ) &&
        (lastPoint === null || neighbour[0] !== lastPoint?.x || neighbour[1] !== lastPoint?.y)
          }) as [number, number];
    lastPoint = currentPoint;
    currentPoint = new Point(
      lines[nextCoords[0]][nextCoords[1]],
      nextCoords[0],
      nextCoords[1]
    );
    steps++;
  } while (currentPoint.char !== 'S');

  console.log('Last: ', lastPoint.toString());
  console.log('Current: ', currentPoint.toString());
  return steps / 2;
};

const part2 = (input: string) => {
  return 0;
};

export default {
  part1,
  part2,
};
