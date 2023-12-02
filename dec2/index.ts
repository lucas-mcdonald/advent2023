import {readFileSync} from 'fs';
import { get } from 'http';

const limits = {
    red: 12,
    blue: 14,
    green: 13,
};

type Game = {
    id: number;
    red: number;
    blue: number;
    green: number;
};
const data = readFileSync('./input.txt', 'utf8');
const lines = data.split('\n');

const getMaxCubes = (line: string) => {
    const [idString, resultsString] = line.split(':').map((str) => str.trim());
    const id = parseInt(idString.split(' ')[1].trim());
    let maxRed, maxBlue, maxGreen: number | undefined;
    for (const result of resultsString.split(';').map((str) => str.trim())) {
        const scores = result.split(',').map(score => score.trim());
        maxRed = Math.max(maxRed || 0, parseInt(scores.find(score => score.includes('red'))?.split(' ')[0] || '0'));
        maxBlue = Math.max(maxBlue || 0, parseInt(scores.find(score => score.includes('blue'))?.split(' ')[0] || '0'));
        maxGreen = Math.max(maxGreen || 0, parseInt(scores.find(score => score.includes('green'))?.split(' ')[0] || '0'));
    }
        return {id: id, red: maxRed as number, blue: maxBlue as number, green: maxGreen as number};
};

const games: Game[] = lines.map(getMaxCubes);

const possibleGamesPart1 = games.filter((game) => {
    if (game.red <= limits.red && game.blue <= limits.blue && game.green <= limits.green) {
        return game.id;
    }
});

const getPower = (game: Game) => game.red * game.blue * game.green;

const sumOfPowers = games.map(getPower).reduce((acc, power) => acc + power, 0);

console.log('result part1: ', possibleGamesPart1.reduce((acc, game) => acc + game.id, 0));
console.log('result part2: ', sumOfPowers);