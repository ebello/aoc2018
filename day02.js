import readFile from './readFile.js';

/*
*
DAY 2
*
*/

function getCountOfCharacters(input) {
  return input.split('').reduce((obj, char) => {
    if (!obj[char]) {
      obj[char] = 0;
    }
    obj[char]++;
    return obj;
  }, {});
}

function checkCharacterCount(input, countToCheck) {
  const countOfChars = getCountOfCharacters(input);
  return Object.keys(countOfChars).some(char => countOfChars[char] == countToCheck);
}

function getCharCountChecksum(input) {
  let countWithTwoChars = 0;
  let countWithThreeChars = 0;

  input.forEach((line) => {
    if (checkCharacterCount(line, 2)) {
      countWithTwoChars++;
      // console.log(line);
    }
    if (checkCharacterCount(line, 3)) {
      countWithThreeChars++;
      // console.log(line);
    }
  });

  return countWithTwoChars * countWithThreeChars;
}

export default async function dayTwo() {
  const data = await readFile('input2.txt');
  const lines = data.split('\n');
  // console.log(lines.length);
  const checksum = getCharCountChecksum(lines);
  
  for (var x = 0; x < lines.length; x++) {
    const line = lines[x];
    const chars = line.split('');
    const remainingLines = lines.filter((l, i) => i !== x);
    // console.log(`processing line ${x}`);
    // console.log(remainingLines);
    for (var y = 0; y < remainingLines.length; y++) {
      const line2 = remainingLines[y];
      const chars2 = line2.split('');
      let differentChars = 0;
      chars.forEach((char, i) => {
        if (char !== chars2[i]) {
          differentChars++;
        }
      });
      if (differentChars === 1) {
        return { checksum, differByOneChar1: line, differByOneChar2: line2 };
      }
    }
  }
}