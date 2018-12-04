import readFile from './readFile.js';

/*
*
DAY 3
*
*/

function getRectangleCoordinates(input) {
  const claimParts = input.split(' ');
  const id = claimParts[0].substring(1);
  const [ left, top ] = claimParts[2].replace(':', '').split(',');
  const [ width, height ] = claimParts[3].split('x');
  // console.log(id);
  // console.log(top);
  // console.log(left);
  // console.log(width);
  // console.log(height);
  const right = parseInt(left) + parseInt(width);
  const bottom = parseInt(top) + parseInt(height);
  const coordinates = [];
  for (var x = left; x < right; x++) {
    // console.log(x);
    for (var y = top; y < bottom; y++) {
      coordinates.push([parseInt(x), parseInt(y)]);
    }
  }
  return { id, coordinates };
}

function getCoordinateOverlapCount(rects) {
  return rects.reduce((obj, { coordinates }) => {
    coordinates.forEach(coord => {
      if (!obj[coord]) {
        obj[coord] = 0;
      }
      obj[coord]++;  
    });
    
    return obj;
  }, {});
}

export default async function dayThree() {
  const data = await readFile('input3.txt');
  const lines = data.split('\n');
  
  const rects = [];
  lines.forEach(line => rects.push(getRectangleCoordinates(line)));

  const overlapCounts = getCoordinateOverlapCount(rects);
  console.log('overlap two or more', Object.keys(overlapCounts).filter(coord => overlapCounts[coord] >= 2).length);
  
  rects.forEach((rect) => {
    if (rect.coordinates.every(coord => overlapCounts[coord] === 1)) {
      console.log('claim that does not overlap', rect);
    }
  });
}