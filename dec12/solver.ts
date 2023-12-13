import { get } from 'http';

type SpringRecord = {
  rowIdx: number;
  damagedSections: string[][];
  damagedGroupSizes: number[];
};

const DAMAGED = '#';
const OK = '.';
const UNKNOWN = '?';

const parseInput = (input: string) => {
  const lines = input.split('\n');
  return lines.map((line, index) => {
    const splitLine = line.split(' ');
    const damagedGroupSizes = splitLine[1].split(',').map(Number);
    const damagedSections = splitLine[0].split(OK).filter(Boolean);
    return {
      rowIdx: index,
      damagedSections: damagedSections,
      damagedGroupSizes: damagedGroupSizes,
    };
  });
};

const groupIsValid = (size: number, index: number, row: string) => {
  let newRow = row.split('').map((char, idx) => {
    if (idx >= index && idx < index + size) {
      return DAMAGED;
    } else {
      return char;
    }
  });
  return (
    (index === 0 || newRow[index - 1] === OK) &&
    (index + size === row.length || newRow[index + size] === OK)
  );
};

const getVariations = (section: string, groupSizes: number[]) => {
  let combinedGroupSize = groupSizes.reduce((acc, cur) => acc + cur, 0);
  if (combinedGroupSize === 1 && section.length === 2) {
    return 2;
  } else if (
    combinedGroupSize === section.length ||
    combinedGroupSize + 1 === section.length
  ) {
    return 1;
  } else {
    let validFirstGroup = groupIsValid(
      groupSizes[0],
      0,
      section.slice(0, groupSizes[0])
    );
    return validFirstGroup
      ? getVariations(section.slice(0, groupSizes[0]), groupSizes.slice(0, 1)) *
          getVariations(
            section.slice(groupSizes[0], section.length),
            groupSizes.slice(1, -1)
          )
      : getVariations(section.slice(0, groupSizes[0] + 1), groupSizes.slice(0, 1)) *
          getVariations(
            section.slice(groupSizes[0] + 1, section.length),
            groupSizes.slice(1, -1)
          );
  }
};

const part1 = (input: string) => {
  const springRows = parseInput(input);
  // console.log(springRows);
  let variations = 0;
  let isVariableSection = new RegExp('[^s#]');
  springRows.forEach((spring) => {
    let rowVariations = 1;
    let knownGroups: number[] = [];
    const variableSections = spring.damagedSections.filter((section) => {
      if (
        !isVariableSection.test(section) &&
        spring.damagedGroupSizes.includes(section.length)
      ) {
        let firstIdx = spring.damagedGroupSizes.indexOf(section.length);
        if (!knownGroups.includes(firstIdx)) {
          knownGroups.push(firstIdx);
        } else {
          let idx = firstIdx;
          while (
            !isVariableSection.test(spring.damagedSections[idx]) &&
            knownGroups.includes(idx)
          ) {
            idx++;
          }
          knownGroups.push(idx);
        }
        return false;
      } else {
        return true;
      }
    });
    spring.damagedGroupSizes = spring.damagedGroupSizes.filter(
      (size, index) => !knownGroups.includes(index)
    );
    // console.log(variableSections, spring.damagedGroupSizes);

    let groupIdx = 0;
    variableSections.forEach((section) => {
      let releventGroups = [];
      while (
        releventGroups.reduce((acc, cur) => acc + cur, 0) <
          section.length - 1 &&
        groupIdx < spring.damagedGroupSizes.length
      ) {
        releventGroups.push(spring.damagedGroupSizes[groupIdx++]);
      }
      console.log(section, releventGroups);
      rowVariations *= getVariations(section, releventGroups);
      console.log(`Row ${spring.rowIdx}: ${rowVariations}`);
    });
  });
  // console.log(springRows);
  return 0;
};

const part2 = (input: string) => {
  return 0;
};

export default {
  part1,
  part2,
};
