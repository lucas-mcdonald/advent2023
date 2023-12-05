const start = performance.now();
import { readFileSync } from 'fs';

// Read the input file and split it into lines
const lines = readFileSync('input.txt').toString().split('\n');

// Map each line to a scratch card object
const scratchCards = lines.map((line) => {
  // Split the line into card title and numbers
  const [cardTitle, numbers] = line.split(': ').map((chunk) => chunk.trim());
  // Extract the card number from the title
  const cardNumber = parseInt(cardTitle.split(' ')[1]);
  // Split the numbers into winners and ours, and convert them to integer arrays
  const [winners, ours] = numbers
    .split('|')
    .map((chunk) => chunk.trim())
    .map((chunk) =>
      chunk
        .split(' ')
        .map((num) => parseInt(num))
        .filter((num) => !isNaN(num))
    );
  // Return the scratch card object
  return {
    cardNumber,
    winners,
    ours,
    copies: 1,
    points: 0,
    matches: 0,
  };
});

// For each scratch card, calculate the points and matches
scratchCards.forEach((card) => {
  card.winners.forEach((winner) => {
    // If our numbers include the winner, increment matches and calculate points
    if (card.ours.includes(winner)) {
      card.matches++;
      card.points = card.points === 0 ? 1 : card.points * 2;
    }
  });
});

// Part 2
// For each scratch card, calculate the copies based on matches
scratchCards
  .map((card) => card.matches)
  .forEach((points, index) => {
    if (points === 0) {
      return;
    }
    // Add copies to the following cards based on the number of matches
    for (let i = index + 1; i < index + points + 1; i++) {
      if (i >= scratchCards.length) {
        break;
      }
      scratchCards[i].copies =
        scratchCards[i].copies + scratchCards[index].copies;
    }
  });

// Log the total points for Part 1
console.log(
  'Part 1: ',
  scratchCards.map((card) => card.points).reduce((a, b) => a + b, 0)
);
// Log the total copies for Part 2
console.log(
  'Part 2: ',
  scratchCards.map((card) => card.copies).reduce((a, b) => a + b)
);

const end = performance.now();
console.log('Execution time: ', end - start, 'ms');
