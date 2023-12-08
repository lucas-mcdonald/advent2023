import { describe, expect, test, beforeAll } from 'bun:test';
import { part1, part2 } from './solver';
import { readFileSync } from 'fs';

let example: string;
let input: string;
beforeAll(() => {
  example = readFileSync('./example.txt', 'utf8');
  input = readFileSync('./input.txt', 'utf8');
});

describe('Part1 Example', () => {
  test('Part1 Example', () => {
    expect(part1(example)).toBe(6440);
  });
});

describe('Part1', () => {
  test('Part1', () => {
    expect(part1(input)).toBe(251545216);
  });
});


describe('Part2', () => {
  test('Part2', () => {
    expect(part2(example)).toBe(5905);
  });
});