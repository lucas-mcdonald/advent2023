import { get } from 'http';

type Galaxy = {
  id: number;
  row: number;
  col: number;
  distances: { [key: number]: number };
};

const parseInput = (input: string) => {
  const lines = input.split('\n');
  const galaxies = [] as Galaxy[];
  let id = 1;
  lines.forEach((line, rowIdx) => {
    for (let colIdx = 0; colIdx < line.length; colIdx++) {
      if (line[colIdx] === '#') {
        galaxies.push({ id: id++, row: rowIdx, col: colIdx, distances: {} });
      }
    }
  });
  const emptyRows = [];
  const emptyCols = [];
  for (let i = 0; i < lines.length; i++) {
    if (galaxies.find((g) => g.row === i) === undefined) {
      emptyRows.push(i);
    }
    if (galaxies.find((g) => g.col === i) === undefined) {
      emptyCols.push(i);
    }
  }
  return [galaxies, emptyRows, emptyCols] as const;
};

const getDistance = (
  g1: Galaxy,
  g2: Galaxy,
  emptyRows: number[],
  emptyCols: number[],
  expansionFactor: number
) => {
  return (
    Math.abs(g1.row - g2.row) +
    Math.abs(g1.col - g2.col) +
    (emptyRows.filter(
      (row) => row > Math.min(g1.row, g2.row) && row < Math.max(g1.row, g2.row)
    ).length *
      (expansionFactor - 1)) +
    (emptyCols.filter(
      (col) => col > Math.min(g1.col, g2.col) && col < Math.max(g1.col, g2.col)
    ).length *
      (expansionFactor - 1))
  );
};

const part1 = (input: string) => {
  const [galaxies, emptyRows, emptyCols] = parseInput(input);
  let sum = 0;
  galaxies.forEach((g1) => {
    g1.distances = {};
    galaxies.forEach((g2) => {
      if (g1.id === g2.id || g1.distances[g2.id] !== undefined) {
        return;
      }
      const distance = getDistance(g1, g2, emptyRows, emptyCols, 2);

      g1.distances[g2.id] = distance;
      g2.distances[g1.id] = distance;
      sum += distance;
    });
  });

  return sum / 2;
};

const part2 = (input: string) => {
  const [galaxies, emptyRows, emptyCols] = parseInput(input);
  let sum = 0n;
  galaxies.forEach((g1) => {
    g1.distances = {};
    galaxies.forEach((g2) => {
      if (g1.id === g2.id || g1.distances[g2.id] !== undefined) {
        return;
      }
      const distance = getDistance(g1, g2, emptyRows, emptyCols, 1000000);

      g1.distances[g2.id] = distance;
      g2.distances[g1.id] = distance;
      sum = sum + BigInt(distance);
    });
  });

  return sum / 2n;
};

export default {
  part1,
  part2,
};

//wrong answer 82000210 (too low), 
// right answer 483844716556