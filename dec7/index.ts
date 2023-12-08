import { part1, part2 } from './solver';
import { read, readFileSync } from 'fs';

let start = performance.now();
const part1Solution = part1(readFileSync('./input.txt', 'utf8'));
let end = performance.now();
console.log(`Part 1 solution: ${part1Solution}`);
console.log(`Part 1 runtime: ${end - start}ms`);

start = performance.now();
const part2Solution = part2(readFileSync('./input.txt', 'utf8'));
end = performance.now();
console.log(`Part 2 solution: ${part2Solution}`);
console.log(`Part 2 runtime: ${end - start}ms`);