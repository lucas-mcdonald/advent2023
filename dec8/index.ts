import { readFileSync } from 'fs';
import { part1, part2 } from './solver';

let start, end;
const input = readFileSync('./input.txt', 'utf8');
// start = performance.now();
// const part1Result = part1(input);
// end = performance.now();
// console.log(`Part 1: ${part1Result}`);
// console.log(`Runtime: ${end - start}ms`);

start = performance.now();
const part2Result = part2(input);
end = performance.now();
console.log(`Part 2: ${part2Result}`);
console.log(`Runtime: ${end - start}ms`);