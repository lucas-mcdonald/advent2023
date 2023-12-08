type Hand = {
  cards: string[];
  bet: number;
};

//Modified (breaks part 1) to handle Jokers
const cardsMap = new Map<string, number>([
  ['2', 2],
  ['3', 3],
  ['4', 4],
  ['5', 5],
  ['6', 6],
  ['7', 7],
  ['8', 8],
  ['9', 9],
  ['T', 10],
  ['J', 1],
  ['Q', 12],
  ['K', 13],
  ['A', 14],
]);

const handTypes = new Map<string, number>([
  ['5 of a kind', 6],
  ['4 of a kind', 5],
  ['full house', 4],
  ['3 of a kind', 3],
  ['2 pair', 2],
  ['1 pair', 1],
  ['high card', 0],
]);

const toSortedCards = (cards: string[]): string[] => {
  return cards.toSorted(
    (a, b) => (cardsMap.get(b) ?? 0) - (cardsMap.get(a) ?? 0)
  );
};

const parseInput = (input: string): Hand[] => {
  // Create an array of hands
  const lines = input.split('\n');
  const hands = lines.map((line) => {
    const [cards, bet] = line.split(/\s+/);
    return {
      cards: cards.split(''),
      bet: parseInt(bet),
    };
  });
  return hands;
};

const cardsAreMatched = (
  cards: string[],
  matcher: (cardA: string, cardB: string) => boolean
): boolean => {
  return cards.every((card) => matcher(card, cards[0]));
};

const areMatchedCards1 = (cardA: string, cardB: string): boolean => {
  return cardA === cardB;
};

const areMatchedCards2 = (cardA: string, cardB: string): boolean => {
  return cardA === cardB || cardA === 'J' || cardB === 'J';
};

const getHandType = (
  cards: string[],
  matcher: (cardA: string, cardB: string) => boolean
): string => {
  if (cards.length !== 5) {
    throw new Error('Invalid hand');
  }

  const cardTypes = Array.from(cardsMap.keys());

  if (cardsAreMatched(toSortedCards(cards), matcher)) {
    return '5 of a kind';
  } else if (
    cardTypes
      .map((cardType) => cards.filter((card) => matcher(cardType, card)).length)
      .includes(4)
  ) {
    return '4 of a kind';
  } else if (
    new Set(cards.map((card) => cardsMap.get(card))).size === 2 || 
    cards.includes('J') && new Set(cards.filter((card) => card !== 'J').map((card) => cardsMap.get(card))).size === 2
  ) {
    return 'full house';
  } else if (
    cardTypes
      .map((cardType) => cards.filter((card) => matcher(cardType, card)).length)
      .includes(3)
  ) {
    return '3 of a kind';
  } else if (
    cardTypes.filter(
      (cardType) => cards.filter((card) => matcher(cardType, card)).length === 2
    ).length === 2
  ) {
    return '2 pair';
  } else if (
    cardTypes
      .map((cardType) => cards.filter((card) => matcher(cardType, card)).length)
      .includes(2)
  ) {
    return '1 pair';
  } else {
    return 'high card';
  }
};

const part1HandSorter = (a: Hand, b: Hand) => {
  // Compare hand strengths
  const aStrength = handTypes.get(getHandType(a.cards, areMatchedCards1)) ?? 0;
  const bStrength = handTypes.get(getHandType(b.cards, areMatchedCards1)) ?? 0;
  if (bStrength !== aStrength) return bStrength - aStrength;

  // Check each card until different card is found
  for (let i = 0; i < 5; i++) {
    const aCard = cardsMap.get(a.cards[i]) ?? 0;
    const bCard = cardsMap.get(b.cards[i]) ?? 0;
    if (aCard !== bCard) return bCard - aCard;
  }
  // All cards are the same, sort order doesn't matter
  return 0;
};

const getCardStrengthPart2 = (card: string) => {
  const strength = cardsMap.get(card) ?? 0;
  if (card === 'J') return 1;
  // console.log(card, strength);
  return strength;
};

const part2HandSorter = (a: Hand, b: Hand) => {
  // Compare hand strengths
  const aType = getHandType(a.cards, areMatchedCards2);
  if (aType === 'full house') {
    console.log(`Hand: ${a.cards}, Type: ${aType}`);
  }
  const bType = getHandType(b.cards, areMatchedCards2);
  const aStrength = handTypes.get(aType) ?? 0;
  const bStrength = handTypes.get(bType) ?? 0;
  if (bStrength !== aStrength) return bStrength - aStrength;

  // Check each card until different card is found
  for (let i = 0; i < 5; i++) {
    const aCard = getCardStrengthPart2(a.cards[i]);
    const bCard = getCardStrengthPart2(b.cards[i]);
    if (aCard !== bCard) return bCard - aCard;
  }
  // All cards are the same, sort order doesn't matter
  return 0;
};

export const part1 = (input: string): number => {
  const hands = parseInput(input);
  hands.sort(part1HandSorter);
  return hands.reduce(
    (acc, hand, index) => acc + hand.bet * (hands.length - index),
    0
  );
};

export const part2 = (input: string): number => {
  const hands = parseInput(input);

  hands.sort(part2HandSorter);
  // console.log(hands);
  return hands.reduce(
    (acc, hand, index) => acc + hand.bet * (hands.length - index),
    0
  );
};
