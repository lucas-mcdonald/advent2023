console.log('\n\nBegin')
const start = performance.now();
import { readFileSync } from 'fs';

type AlmanacMap = {
  source: string;
  destination: string;
  sourceStart: number[];
  mapLength: number[];
  destinationStart: number[];
};

const paragraphs = readFileSync('./input.txt', 'utf8').split('\n\n');

const seeds = paragraphs
  .shift()
  ?.split(/\s/)
  .map(Number)
  .filter((seed) => !isNaN(seed)) as number[];

const maps = paragraphs.map((lines) => {
  const [source, destination] = lines
    .split('\n')[0]
    .split(/\s/)[0]
    .split(/-to-/) as string[];

  const sourceStart: number[] = [];
  const mapLength: number[] = [];
  const destinationStart: number[] = [];
  lines
    .split('\n')
    .slice(1)
    .map((line) =>
      line
        .split(/\s/)
        .map(Number)
        .filter((entry) => !isNaN(entry))
    )
    .forEach((line) => {
      // console.log(line)
      destinationStart.push(line[0]);
      sourceStart.push(line[1]);
      mapLength.push(line[2]);
    });

  return {
    source,
    destination,
    sourceStart,
    mapLength,
    destinationStart,
  } as AlmanacMap;
});

const mapValue = (value: number, map: AlmanacMap) => {
  const index = map.sourceStart.findIndex((start, index) => {
    // console.log(`Checking ${start} <= ${value} < ${start} + ${map.mapLength[index]}`)
    return start <= value && start + map.mapLength[index] > value;
  });
  return index === -1
    ? value
    : value + (map.destinationStart[index] - map.sourceStart[index]);
};

const mapValueReverse = (value: number, map: AlmanacMap) => {
  const index = map.destinationStart.findIndex((start, index) => {
    // console.log(`Checking ${start} <= ${value} < ${start} + ${map.mapLength[index]}`)
    return start <= value && start + map.mapLength[index] > value;
  });
  return index === -1
    ? value
    : value + (map.sourceStart[index] - map.destinationStart[index]);
};

const mapSeed = (seed: number, mapArray: AlmanacMap[]) => {
  let value = seed;
  mapArray.forEach((map) => {
    value = mapValue(value, map);
    // console.log(`Mapped ${seed} to ${value}`)
  });
  return value;
};

const mapLocation = (seed: number, mapArray: AlmanacMap[]) => {
  let value = seed;
  mapArray.toReversed().forEach((map) => {
    value = mapValueReverse(value, map);
    // console.log(`Mapped ${seed} to ${value}`)
  });
  return value;
};


const mappedSeeds = seeds.map((seed) => mapSeed(seed, maps));
// console.log(mapSeed(seeds[0], maps));


console.log('Part 1: ', Math.min(...mappedSeeds));

const seeds2: number[][] = [];
for(let i = 0; i < seeds.length; i += 2) {
  seeds2.push([seeds[i], seeds[i + 1]]);
}

let location = 0;
while(true) {
  const mappedLocation = mapLocation(location, maps);
  if (seeds2.find(seedPair => {
    const seedRangeStart = seedPair[0];
    const seedRangeEnd = seedPair[0] + seedPair[1];
    return seedRangeStart <= mappedLocation && seedRangeEnd > mappedLocation;
  })) {
    console.log('Part 2: ', location);
    break;
  }
  location++;
}

const end = performance.now();
console.log(`Time Elapsed ${(end - start).toFixed(3)}ms`);
