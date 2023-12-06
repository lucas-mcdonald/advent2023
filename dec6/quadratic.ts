const start = performance.now();

import { readFileSync } from 'fs';

const [times, distances] = readFileSync('./input.txt', 'utf8')
  .split('\n')
  .map((line) => line.split(':').pop()?.trim().split(/\s+/).map(Number)) as [number[], number[]];

const getRoots = (a: number, b: number, c: number) => {
    const discriminant = b * b - 4 * a * c;
    if (discriminant < 0) {
        return [];
    }
    const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return [root1, root2];
}

//Part 1
const numRecordBreakers = [];
for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    const roots = getRoots(-1, time, -distance);
    numRecordBreakers.push(Math.abs(Math.floor(roots[0]) - Math.floor(roots[1])));
}

// Part 2
const newTime = parseInt(times.map(String).join(''));
const newDistance = parseInt(distances.map(String).join(''));
const newRoots = getRoots(-1, newTime, -newDistance);

// Output results
console.log('Part 1:', numRecordBreakers.reduce((a, b) => a * b, 1));
console.log('Part 2:', Math.abs(Math.floor(newRoots[0]) - Math.floor(newRoots[1])));
const end = performance.now();
console.log(`Runtime: ${end - start}ms`);

// Runtime: 0.32424999999999926ms