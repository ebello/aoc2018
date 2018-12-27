import readFile from './readFile.js';

/*
*
DAY 8
*

2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2
A----------------------------------
    B----------- C-----------
                     D-----         
                     
metadata start = startIndex + nodeLength - metadataEntryCount

A (node 0) length = 2 + 3 + children length (5 + 6) 16
B (node 2) length = 2 + 3 + children length (0) 5
C (node 7) length = 2 + 1 + children length (3) 6
D (node 9) length = 2 + 1 + children length (0) 3

0 1 2 3 4 5 6  7  8  9  1011121314 15161718
2 3 1 3 0 1 77 10 11 12 1 1 0 1 99 2 1 1 2
A-----------------------------------------
    B------------------ D-----------
        C-----              E-----  
        

*/

const processNode = (tree, entries, index) => {
  const childNodeCount = entries[index];
  const metadataEntryCount = parseInt(entries[index + 1], 10);
  const nodeName = `node${index}`;
  
  tree.startIndex = index;
  tree.node = nodeName;
  tree.children = [];
  const headerCount = 2;
  let nodeLength = headerCount + metadataEntryCount;
  for (var x = 0; x < childNodeCount; x++) {
    const child = {};
    const { nextIndex, tree: node } = processNode(child, entries, index + headerCount);
    nodeLength += node.nodeLength;
    index = nextIndex;
    tree.children.push(child);
  }
  tree.metadata = [];
  tree.nodeLength = nodeLength;
  
  const metadataStart = tree.startIndex + nodeLength - metadataEntryCount;
  let value = 0;
  for (var x = metadataStart; x < metadataStart + metadataEntryCount; x++) {
    const metadata = parseInt(entries[x], 10);
    tree.metadata.push(metadata);
    if (!tree.children.length) {
      value += metadata;
    }
  }
  if (tree.children.length) {
    tree.metadata.forEach(m => {
      const child = tree.children[m - 1];
      if (child) {
        value += child.value;
      }
    });
  }
  tree.value = value;
  
  return { nextIndex: index + metadataEntryCount, tree };
}

const sumMetadata = (tree, sum) => {
  sum = tree.metadata.reduce((acc, m) => acc + m, 0);
  tree.children.forEach(child => sum += sumMetadata(child, sum));
  return sum;
};

export default async function dayEight() {
  const data = await readFile('input8.txt');
  const entries = data.split(' ');
  
  const tree = {};
  processNode(tree, entries, 0, 0);
  // console.dir(tree);
  const metadataSum = sumMetadata(tree, 0);
  // console.log(metadataSum);
  
  return { metadataSum, rootNodeValue: tree.value };
};