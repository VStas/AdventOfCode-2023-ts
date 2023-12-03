interface Subset {
  green: number;
  red: number;
  blue: number;
}

interface Game {
  id: number;
  subsets: Subset[];
}

const parseGames = (input: string): Game[] => {
  const games: Game[] = [];
  const lines = input.split('\n');
  for (const line of lines) {
    const [left, right] = line.split(': ');
    const id = Number(left.slice(5));
    const subsets = right.split('; ').map((subset) => {
      const green = Number(subset.match(/(\d+)\sgreen/)?.[1] ?? 0);
      const red = Number(subset.match(/(\d+)\sred/)?.[1] ?? 0);
      const blue = Number(subset.match(/(\d+)\sblue/)?.[1] ?? 0);
      return { green, red, blue };
    });
    games.push({ id, subsets });
  }

  return games;
};

const first = (input: string) => {
  const games = parseGames(input);

  const reqGreen = 13;
  const reqBlue = 14;
  const reqRed = 12;

  return games.reduce((result, game) => {
    if (game.subsets.every((subset) => (subset.blue <= reqBlue && subset.green <= reqGreen && subset.red <= reqRed))) {
      return result + game.id;
    }
    return result;
  }, 0);
};

const expectedFirstSolution = 2683;

const second = (input: string) => {
  const games = parseGames(input);

  return games.reduce((result, game) => {
    const minSubset = game.subsets.reduce((mins, { red, green, blue }) => {
      mins.blue = Math.max(mins.blue, blue);
      mins.red = Math.max(mins.red, red);
      mins.green = Math.max(mins.green, green);
      return mins;
    }, { red: 0, green: 0, blue: 0 });

    const minSubsetPower = minSubset.blue * minSubset.red * minSubset.green;

    return result + minSubsetPower;
  }, 0);
};

const expectedSecondSolution = 49710;

export { first, expectedFirstSolution, second, expectedSecondSolution };
