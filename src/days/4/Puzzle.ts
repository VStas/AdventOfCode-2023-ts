interface Card {
  id: number;
  winningNumbers: number[];
  myNumbers: number[];
}


const parseCards = (input: string): Card[] => {
  const lines = input.split('\n');
  return lines.map((line) => {
    const [idString, numbers] = line.split(': ');
    const [left, right] = numbers.split(' | ');
    return {
      id: Number(idString.match(/\d+$/)[0]),
      winningNumbers: left.trim().split(/\s+/).map(Number),
      myNumbers: right.trim().split(/\s+/).map(Number)
    };
  });
};

const first = (input: string) => {
  const cards = parseCards(input);
  return cards.reduce((score, { winningNumbers, myNumbers }) => {
    let cardValue = 0;

    const winningSet = new Set(winningNumbers);
    for (const num of myNumbers) {
      if (winningSet.has(num)) {
        if (cardValue === 0) {
          cardValue = 1;
        } else {
          cardValue *= 2;
        }
      }
    }

    return score + cardValue;
  }, 0);
};

const expectedFirstSolution = 25231;

const second = (input: string) => {
  const cards = parseCards(input);
  let totalCards = cards.length;
  const idCardToCount: Record<number, number> = {};

  for (const card of cards) {
    if (idCardToCount[card.id] === undefined) {
      idCardToCount[card.id] = 1;
    }
  
    const amount = idCardToCount[card.id];
    let points = 0;
    const { winningNumbers, myNumbers } = card;
    const winningSet = new Set(winningNumbers);

    for (const num of myNumbers) {
      if (winningSet.has(num)) {
        points++;
      }
    }

    for (let id = card.id + 1; id <= card.id + points; id++) {
      if (idCardToCount[id] === undefined) {
        idCardToCount[id] = 1;
      }
      idCardToCount[id] += amount;
      totalCards += amount;
    }
  }


  return totalCards;
};

const expectedSecondSolution = 9721255;

export { first, expectedFirstSolution, second, expectedSecondSolution };
