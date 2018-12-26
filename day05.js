import readFile from './readFile.js';

/*
*
DAY 5
*
*/

const getCharCase = char => (char === char.toUpperCase()) ? 'upper' : 'lower';

const removeReactions = (chars) => {
  const stringLength = chars.length;
  // console.log(stringLength);
  for (var x = 0; x <= chars.length; x++) {
    const char = chars[x];
    const nextchar = chars[x + 1];
    if (nextchar) {
      const charCase = getCharCase(char);
      const nextCharCase = getCharCase(nextchar);
      if (charCase !== nextCharCase && char.toUpperCase() === nextchar.toUpperCase()) {
        // we have a reaction, these characters should be removed
        chars.splice(x, 2);
        x = x - 1;
      }
    }
  }
  // console.log(chars.length);
  if (stringLength !== chars.length) {
    return removeReactions(chars);
  }
  else {
    return stringLength;
  }
};

const removeCharFromString = (char, str) => {
  const charRegex = new RegExp(char, 'gi');
  return str.replace(charRegex, '');
};

const determineShortestStringByRemovingLetter = (str) => {
  const letterCounts = [];
  for (var x = 0; x < 26; x++) {
    const letter = (x + 10).toString(36);
    const newstr = removeCharFromString(letter, str);
    const chars = newstr.split('');
    const remainingUnits = removeReactions(chars);
    letterCounts.push({ letter, remainingUnits });
  }
  return letterCounts;
}

export default async function dayFive() {
  const data = await readFile('input5.txt');
  const chars = data.split('');
  const remainingUnits = removeReactions(chars);
  console.log(remainingUnits);
  
  const countsByLetter = determineShortestStringByRemovingLetter(data);
  console.log(countsByLetter);

  return { remainingUnits, countsByLetter };
};