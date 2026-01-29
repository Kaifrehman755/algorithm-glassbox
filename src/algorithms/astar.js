// src/algorithms/astar.js

// Heuristic: Andaza lagana ki target kitna door hai (Manhattan Distance)
function heuristic(nodeA, nodeB) {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;
  // Up, Down, Left, Right
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  return neighbors.filter(n => !n.isWall); // Visited check hum andar karenge
}

export function astar(grid, startNode, finishNode) {
  const history = [];
  
  // A* ke liye Priority Queue logic
  const openSet = [startNode]; // Jo nodes check karne hain
  const closedSet = []; // Jo check ho chuke hain

  // Har node ka score reset/set karo (Initialize)
  // Note: Grid creation ke waqt Infinity set kiya tha, par yahan ensure karte hain
  startNode.g = 0; 
  startNode.f = heuristic(startNode, finishNode); 

  while (openSet.length > 0) {
    // Sort karo taaki sabse kam F score wala node pehle nikle (Priority Queue simulation)
    openSet.sort((a, b) => a.f - b.f);
    
    const currentNode = openSet.shift(); // Sabse best node nikalo
    closedSet.push(currentNode);

    // Snapshot for Visualizer
    history.push({
      currentNode: { row: currentNode.row, col: currentNode.col },
      queue: openSet.map(n => `[${n.row},${n.col}]`), // Open set ko queue ki tarah dikhayenge
      log: `Checking best node [${currentNode.row}, ${currentNode.col}] with F-Score: ${currentNode.f}`
    });

    // Agar pohanch gaye
    if (currentNode === finishNode) return { history, success: true };

    const neighbors = getNeighbors(currentNode, grid);
    
    for (const neighbor of neighbors) {
      if (closedSet.includes(neighbor)) continue; // Agar check ho chuka hai to chhodo

      const tentativeG = currentNode.g + 1; // Ek step aage badhe

      // Agar ye naya rasta behtar hai ya pehli baar visit kar rahe hain
      if (!openSet.includes(neighbor) || tentativeG < neighbor.g) {
        neighbor.g = tentativeG;
        neighbor.h = heuristic(neighbor, finishNode);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previousNode = currentNode;
        
        // Visuals ke liye flag (App.jsx isse blue color karega)
        // Note: Hum direct mutation kar rahe hain kyunki ye 'algorithm' copy grid pe chal raha hai
        
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  return { history, success: false };
}