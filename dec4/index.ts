import { readFileSync } from 'fs';

const lines = readFileSync('input.txt').toString().split('\n');

const scratchCards = lines.map((line) => {
  const [cardTitle, numbers] = line.split(': ').map((chunk) => chunk.trim());
  const cardNumber = parseInt(cardTitle.split(' ')[1]);
  const [winners, ours] = numbers
    .split('|')
    .map((chunk) => chunk.trim())
    .map((chunk) =>
      chunk
        .split(' ')
        .map((num) => parseInt(num))
        .filter((num) => !isNaN(num))
    );
  return {
    cardNumber,
    winners,
    ours,
    copies: 1,
    points: 0,
    matches: 0,
  };
});

scratchCards.forEach((card) => {
  card.winners.forEach((winner) => {
    if (card.ours.includes(winner)) {
      card.matches++;
      card.points = card.points === 0 ? 1 : card.points * 2;
    }
  });
});

// Part 2
scratchCards
  .map((card) => card.matches)
  .forEach((points, index) => {
    if (points === 0) {
      return;
    }
    for (let i = index + 1; i < index + points + 1; i++) {
      if (i >= scratchCards.length) {
        break;
      }
      scratchCards[i].copies =
        scratchCards[i].copies + scratchCards[index].copies;
    }
  });

console.log(
  'Part 1: ',
  scratchCards.map((card) => card.points).reduce((a, b) => a + b, 0)
);
console.log(
  'Part 2: ',
  scratchCards.map((card) => card.copies).reduce((a, b) => a + b)
);
