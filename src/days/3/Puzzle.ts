const parseMatrix = (input: string) => {
  return input.split('\n');
};

const numRegex = /\d+/g;
const symRegex = /[^\d.]/;

const first = (input: string) => {
  const matrix = parseMatrix(input);
  let sum = 0;

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    let result: RegExpExecArray;

    while (result = numRegex.exec(line)) {
      const num = Number(result[0]);
      const beforeNumPos = Math.max(result.index - 1, 0);
      const afterNumPos = numRegex.lastIndex;

      if (
        [matrix[i-1], matrix[i], matrix[i+1]].some(
          (line) => line && line.slice(beforeNumPos, afterNumPos + 1).search(symRegex) !== -1
        )
      ) {
        sum += num;
      }
    }
  }
  return sum;
};

const expectedFirstSolution = 550934;

const second = (input: string) => {
  const starsMap: Record<string, number[]> = {};

  const matrix = parseMatrix(input);

  for (let i = 0; i < matrix.length; i++) {
    const line = matrix[i];
    let result: RegExpExecArray;

    while (result = numRegex.exec(line)) {
      const num = Number(result[0]);
      const beforeNumPos = Math.max(result.index - 1, 0);
      const afterNumPos = numRegex.lastIndex;

        [i-1, i, i+1].forEach((lineIndex) => {
          const line = matrix[lineIndex];
          if (!line) {
            return;
          }
          const starIndexes = Array.from(line.slice(beforeNumPos, afterNumPos + 1).matchAll(/\*/g)).map((match) => match.index + beforeNumPos);
          for (const starIndex of starIndexes) {
            const key = `${lineIndex}_${starIndex}`;
            if (!starsMap[key]) {
              starsMap[key] = [];
            }
            starsMap[key].push(num);
          }
        });

    }
  }

  return Object.values(starsMap)
    .filter((values) => values.length == 2)
    .reduce((sum, [first, second]) => sum + first * second, 0);
};

const expectedSecondSolution = 81997870;

export { first, expectedFirstSolution, second, expectedSecondSolution };
