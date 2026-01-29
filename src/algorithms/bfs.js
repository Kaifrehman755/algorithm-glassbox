// src/algorithms/bfs.js

// Neighbors (Aas-paas ke box) dhoondne ka helper function
function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  // Upar, Neeche, Baayein, Daayein check
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  // Sirf wahi neighbors lo jo wall nahi hain aur visit nahi hue
  return neighbors.filter(n => !n.isVisited && !n.isWall);
}

export function bfs(grid, startNode, finishNode) {
  const history = []; // Ye hamara 'Time Travel' data hai
  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length > 0) {
    // Queue ka snapshot lo (Visualizer ke liye)
    const currentQueueState = queue.map(n => `[${n.row},${n.col}]`);
    
    const currentNode = queue.shift();
    
    // Neighbors dhoondo
    const neighbors = getNeighbors(currentNode, grid);
    
    // History me step record karo
    history.push({
      currentNode: { row: currentNode.row, col: currentNode.col },
      queue: currentQueueState,
      log: `Exploring [${currentNode.row}, ${currentNode.col}]. Adding ${neighbors.length} neighbors to queue.`
    });

    if (currentNode === finishNode) return { history, success: true };

    for (const neighbor of neighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }
  return { history, success: false };
}