const start = performance.now();

import { readFileSync } from 'fs';

const [times, distances] = readFileSync('./input.txt', 'utf8')
  .split('\n')
  .map((line) => line.split(':').pop()?.trim().split(/\s+/).map(Number)) as [number[], number[]];

// Part 1
const getRecordBreakers = (time: number, distance: number) => {
    const recordBreakers = [];
    for (let holdTime = 0; holdTime < time; holdTime++) {
        const speed = holdTime;
        const distanceTravelled = speed * (time - holdTime);
        if (distanceTravelled > distance) {
            recordBreakers.push(holdTime);
        }
    }
    return recordBreakers;
};

const numRecordBreakers = [];
for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];
    numRecordBreakers.push(getRecordBreakers(time, distance).length);
}

// Part 2
const newTime = parseInt(times.map(String).join(''));
const newDistance = parseInt(distances.map(String).join(''));


// Output results
console.log('Part 1:', numRecordBreakers.reduce((a, b) => a * b, 1));
console.log('Part 2:', getRecordBreakers(newTime, newDistance).length);
const end = performance.now();
console.log(`Runtime: ${end - start}ms`);
