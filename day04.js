import readFile from './readFile.js';

/*
*
DAY 4
*
*/

function getTimestamp(line) {
  return Date.parse(line.split(']')[0].slice(1));
}

export default async function dayFour() {
  const data = await readFile('input4.txt');
  const lines = data.split('\n');
  
  const guardRegex = new RegExp('Guard #([\\d]+)\\s+');
  const minRegex = new RegExp(':(\\d+)]');
  lines.sort((a, b) => getTimestamp(a) - getTimestamp(b));
  // console.log(lines.join('\n'));
  let guard;
  let asleepMinute;
  const guards = [];
  lines.forEach((line) => {
    const guardMatch = line.match(guardRegex);
    const minute = Number(line.match(minRegex)[1]);
    // console.log(minute);
    if (guardMatch) {
      const guardId = guardMatch[1];
      guard = guards.find(g => g.guardId === guardId);
      if (!guard) {
        guard = { guardId, minutesAsleep: [] };
        guards.push(guard);
      }
      // console.log(guardId);
    }
    else if (line.includes('asleep')) {
      asleepMinute = minute;
    }
    else if (line.includes('wakes')) {
      const asleep = [...Array(minute).keys()].filter(i => i >= asleepMinute);
      // console.log(`guard ${guardId}: ${asleep}`);
      guard.minutesAsleep.push(asleep);
    }
  });
  
  guards.map((guard) => {
    guard.totalMinutesAsleep = guard.minutesAsleep.flat().length;
    guard.minuteOccurrences = guard.minutesAsleep.reduce((arr, minArr) => {
      minArr.forEach(min => {
        let obj = arr.find(a => a.minute === min);
        if (!obj) {
          obj = { minute: min, occurrences: 0 };
          arr.push(obj);
        }
        obj.occurrences++;  
      });

      return arr.sort((a, b) => b.occurrences - a.occurrences);
    }, []);
    return guard;
  });
  guards.sort((a, b) => b.totalMinutesAsleep - a.totalMinutesAsleep);
  console.log(guards);
  
  const sleepingGuards = guards.filter(g => g.minuteOccurrences.length)
    .sort((a, b) => b.minuteOccurrences[0].occurrences - a.minuteOccurrences[0].occurrences);
  console.log(sleepingGuards);
}