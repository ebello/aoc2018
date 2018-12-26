import readFile from './readFile.js';

/*
*
DAY 7
*
*/

const letterToIndex = letter => parseInt(letter, 36) - 9;

const createLetter = letter => ({ prereqs: [], timeToComplete: 60 + letterToIndex(letter) });

const getStepOrder = lines => (
  lines.reduce((obj, line) => {
    const match = line.match(/Step ([A-Z])[\w\s]+step ([A-Z])+/, 'g');
    const prereq = match[1];
    const step = match[2];
    
    if (!obj[prereq]) {
      obj[prereq] = createLetter(prereq);
    }
    if (!obj[step]) {
      obj[step] = createLetter(step);
    }
    obj[step].prereqs.push(prereq);
    return obj;
  }, {})
);

const getStepsWithNoPrereqs = stepArray => stepArray.filter(s => !s[1].prereqs.length).sort((a, b) => a[0] > b[0] ? 1 : -1);

const removePrereqLetter = (stepArray, letter) => (
  // remove the prereq from other letters
  stepArray.forEach((step) => {
    const { prereqs } = step[1];
    const index = prereqs.indexOf(letter);
    if (index !== -1) prereqs.splice(index, 1);
  })
);

const getLetterOrder = lines => {
  const stepOrder = getStepOrder(lines);
  const stepArray = Object.entries(stepOrder);
  let letterOrder = '';
  
  while (stepArray.length > 0) {
    const stepsNoPrereqs = getStepsWithNoPrereqs(stepArray);
    const next = stepsNoPrereqs[0];
    const nextLetter = next[0];
    
    // remove the letter from the array
    const nextIndex = stepArray.indexOf(next);
    stepArray.splice(nextIndex, 1);

    removePrereqLetter(stepArray, nextLetter);

    letterOrder += nextLetter;
  }
  
  return letterOrder;
};

const getLetterOrderWithWorkers = lines => {
  const stepOrder = getStepOrder(lines);
  const stepArray = Object.entries(stepOrder);
  let workerLetterOrder = '';
  const maxWorkers = 5;
  const workers = [];
  let secondsElapsed = 0;
  
  while (stepArray.length > 0) {
    const stepsNoPrereqs = getStepsWithNoPrereqs(stepArray);
    stepsNoPrereqs.forEach((step) => {
      const letter = step[0];
      if (!workers.some(w => w && w.letter === letter)) {
        // find a worker without a letter
        const idleWorker = workers.findIndex(w => !w);
        const newLetter = { letter, secondsElapsed };

        if (idleWorker < 0) {
          if (workers.length < maxWorkers) {
            workers.push(newLetter);
          }
        }
        else {
          workers[idleWorker] = newLetter;
        }
      }
    });
    workers.forEach((worker, index, arr) => {
      if (worker) {
        const { timeToComplete } = stepOrder[worker.letter];
        if (secondsElapsed - worker.secondsElapsed === timeToComplete - 1) {
          workerLetterOrder += worker.letter;
          // remove the letter from the array
          const letterIndex = stepArray.findIndex(s => s[0] === worker.letter);
          stepArray.splice(letterIndex, 1);
          removePrereqLetter(stepArray, worker.letter);

          // remove worker from worker array
          arr[index] = null;
        }
      }
    });
    secondsElapsed++;
  }
  
  return { secondsElapsed, workerLetterOrder };
};

export default async function daySeven() {
  const data = await readFile('input7.txt');
  const lines = data.split('\n');
  
  const letterOrder = getLetterOrder(lines);
  // console.log(letterOrder);
  
  const workerLetterOrder = getLetterOrderWithWorkers(lines);
  // console.log(workerLetterOrder);
  
  return { letterOrder, workerLetterOrder };
};