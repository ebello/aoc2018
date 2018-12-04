import readFile from './readFile.js';

/*
*
DAY 1
*
*/

function getTotalFrequency(input) {
  let totalFrequency = 0;
  input.forEach((line) => totalFrequency += parseInt(line));
  return totalFrequency;
}

function getRepeatedFrequency(input) {
  let repeatedFrequency;
  let frequency = 0;
  const frequencies = [];
  while (!repeatedFrequency) {
    for (var x = 0; x < input.length; x++) {
      const line = input[x];
      frequency += parseInt(line);
      if (frequencies.includes(frequency)) {
        repeatedFrequency = frequency;
        break;
      }
      frequencies.push(frequency);
    }
  }
  return repeatedFrequency;
}

export default async function dayOne() {
  const data = await readFile('input1.txt');
  const lines = data.split('\n');

  const totalFrequency = getTotalFrequency(lines);
  console.log({totalFrequency});

  const repeatedFrequency = getRepeatedFrequency(lines);
  console.log({repeatedFrequency});
}