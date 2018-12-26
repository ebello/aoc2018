import readFile from './readFile.js';

/*
*
DAY 6
*
*/

const manhattanDistance = (coord1, coord2) => {
  return Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]);
}

export default async function daySix() {
  const data = await readFile('input6.txt');
  const lines = data.split('\n');
  
  const coordinates = lines.map(line => line.split(', ').map(Number));
  const xVals = coordinates.map(coord => coord[0]);
  const yVals = coordinates.map(coord => coord[1]);
  const maxX = Math.max(...xVals);
  const maxY = Math.max(...yVals);
  const minX = Math.min(...xVals);
  const minY = Math.min(...yVals);
  // console.log({ minX, maxX, minY, maxY });
  
  const coordGridMap = coordinates.map(coord => ({ coord, closestPoints: [] }));
  console.log(coordGridMap);
  
  // for each point on grid, determine closest coordinate
  for (var x = minX; x <= maxX; x++) {
    for (var y = minY; y <= maxY; y++) {
      const point = [x, y];
      // get distance of each coordinate from this point
      const distanceMap = coordGridMap.map(coord => ({ coord: coord.coord, distance: manhattanDistance(point, coord.coord) }));
      const shortestManhattanDistance = Math.min(...distanceMap.map(dm => dm.distance));
      // if there is only one coordinate that matches the shortest distance, add this point to that coordinate's closest points
      const shortestDistances = distanceMap.filter(dm => dm.distance === shortestManhattanDistance);
      if (shortestDistances.length === 1) {
        const gridCoord = coordGridMap.find(c => c.coord === shortestDistances[0].coord);
        gridCoord.closestPoints.push(point);
      }
    }
  }
  
  // console.log(coordGridMap);
  
  const finiteCoordinateAreas = coordGridMap.filter((item) => !item.closestPoints.some(p => p[0] === minX || p[1] === minY || p[0] === maxX || p[1] === maxY))
    .sort((a, b) => b.closestPoints.length - a.closestPoints.length);
  console.log(finiteCoordinateAreas);
  
  let totalSize = 0;
  for (var x = minX; x <= maxX; x++) {
    for (var y = minY; y <= maxY; y++) {
      const point = [x, y];
      // get distance of each coordinate from this point
      const distanceMap = coordGridMap.map(coord => ({ coord: coord.coord, distance: manhattanDistance(point, coord.coord) }));
      const totalManhattanDistance = distanceMap.reduce((acc, cur) => acc + cur.distance, 0);
      if (totalManhattanDistance < 10000) {
        totalSize++;
      }
    }
  }
  
  return { sizeOfLargestArea: finiteCoordinateAreas[0].closestPoints.length, totalSize };
};