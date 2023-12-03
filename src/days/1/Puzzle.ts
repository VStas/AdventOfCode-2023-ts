const first = (input: string) => {
  const regex = /\d/g;
  const findDecodedNumber = (word: string) => {
    const matches = word.match(regex);
    return Number(matches[0] + matches[matches.length - 1]);
  };

  const words = input.split('\n');
  let sum = 0;
  for (const word of words) {
    sum += findDecodedNumber(word);
  }

  return sum;
};

const expectedFirstSolution = 54634;

const textToDigit = (text: string) => {
  switch (text) {
    case 'one':
      return '1';
    case 'two':
      return '2';
    case 'three':
      return '3';
    case 'four':
      return '4';
    case 'five':
      return '5';
    case 'six':
      return '6';
    case 'seven':
      return '7';
    case 'eight':
      return '8';
    case 'nine':
      return '9';
    default:
      return text;
  }
};

const second = (input: string) => {
  const regexFirst = /\d|one|two|three|four|five|six|seven|eight|nine/;
  const regexLast = /\d|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/;
  const findDecodedNumber = (word: string) => {
    const matchFirst = word.match(regexFirst);
    const matchLast = word.split('').reverse().join('').match(regexLast);
    const firstDigit = textToDigit(matchFirst[0]);
    const lastDigit = textToDigit(matchLast[0].split('').reverse().join(''));
    return Number(firstDigit + lastDigit);
  };

  const words = input.split('\n');
  let sum = 0;
  for (const word of words) {
    sum += findDecodedNumber(word);
  }
  return sum;
};


// Regex solution with ?=

// const second = (input: string) => {
//   const regex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
//   const findDecodedNumber = (word: string) => {
//     const match = Array.from(word.matchAll(regex)).map(arr => arr[1]);
//     const matchFirst = match[0];
//     const matchLast = match[match.length - 1];
//     const firstDigit = textToDigit(matchFirst);
//     const lastDigit = textToDigit(matchLast);
//     return Number(firstDigit + lastDigit);
//   };

//   const words = input.split('\n');
//   let sum = 0;
//   for (const word of words) {
//     sum += findDecodedNumber(word);
//   }
//   return sum;
// };


const expectedSecondSolution = 53855;

export { first, expectedFirstSolution, second, expectedSecondSolution };
