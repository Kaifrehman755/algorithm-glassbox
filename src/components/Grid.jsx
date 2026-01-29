import React from 'react';

const Grid = ({ grid, history, currentStep, onMouseDown, onMouseEnter, onMouseUp }) => {
  // Safety Check: Agar grid khali hai to kuch mat dikhao
  if (!grid || grid.length === 0) {
    return <div className="text-white animate-pulse">Initializing Grid...</div>;
  }

  return (
    <div 
      className="grid gap-[1px] bg-slate-800 border-4 border-slate-700 rounded-lg shadow-2xl p-1 select-none"
      style={{ gridTemplateColumns: `repeat(${grid[0].length}, 20px)` }}
      onMouseLeave={onMouseUp}
    >
      {grid.map((row, rowIdx) => (
        row.map((node, nodeIdx) => {
          // Color Logic
          let isCurrent = false;

          // Animation Logic
          if (history.length > 0 && currentStep < history.length) {
             const step = history[currentStep];
             if(step && step.currentNode.row === rowIdx && step.currentNode.col === nodeIdx) {
                isCurrent = true;
             }
          }

          let colorClass = 'bg-slate-900'; // Default Empty
          if (node.isStart) colorClass = 'bg-green-500 shadow-[0_0_10px_#22c55e] z-10';
          else if (node.isFinish) colorClass = 'bg-red-500 shadow-[0_0_10px_#ef4444] z-10';
          else if (node.isWall) colorClass = 'bg-slate-600';
          else if (isCurrent) colorClass = 'bg-yellow-400 scale-125 z-20 shadow-[0_0_15px_#facc15]'; 
          else if (node.isVisitedVisual) colorClass = 'bg-blue-600 transition-colors duration-300';

          return (
            <div
              key={`${rowIdx}-${nodeIdx}`}
              className={`w-5 h-5 ${colorClass} cursor-pointer hover:brightness-110 border-[0.5px] border-slate-800/30`}
              onMouseDown={() => onMouseDown(rowIdx, nodeIdx)}
              onMouseEnter={() => onMouseEnter(rowIdx, nodeIdx)}
              onMouseUp={onMouseUp}
            />
          );
        })
      ))}
    </div>
  );
};

export default Grid;