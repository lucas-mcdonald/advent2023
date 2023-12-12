import { readFileSync } from 'fs';
import solver from './solver';

let start, end;
const input = readFileSync('dec12/example.txt', 'utf8');

start = performance.now();
const part1Result = solver.part1(input);
end = performance.now();
console.log(`Part 1: ${part1Result} in ${end - start}ms`);

start = performance.now();
const part2Result = solver.part2(input);
end = performance.now();
console.log(`Part 2: ${part2Result} in ${end - start}ms`);
