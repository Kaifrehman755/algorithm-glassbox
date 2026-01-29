import { useState, useEffect } from 'react';
import Grid from './components/Grid';
import Explainer from './components/Explainer';
import { bfs } from './algorithms/bfs';
import { astar } from './algorithms/astar';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Activity, Zap, Map } from 'lucide-react';

const ROWS = 15;
const COLS = 30;

function App() {
  const [grid, setGrid] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMousePressed, setIsMousePressed] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState('BFS');

  // --- STATS STATE ---
  const [stats, setStats] = useState({ nodesExplored: 0, pathLength: 0, timeTaken: 0 });

  useEffect(() => {
    resetGrid();
  }, []);

  const resetGrid = () => {
    const newGrid = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          row: r, col: c,
          isStart: r === 7 && c === 5,
          isFinish: r === 7 && c === 25,
          isWall: false,
          isVisitedVisual: false,
          g: Infinity, f: Infinity
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
    setHistory([]);
    setCurrentStep(0);
    setIsPlaying(false);
    setStats({ nodesExplored: 0, pathLength: 0, timeTaken: 0 });
  };

  const handleMouseDown = (r, c) => { setIsMousePressed(true); toggleWall(r, c); };
  const handleMouseEnter = (r, c) => { if (isMousePressed) toggleWall(r, c); };
  const handleMouseUp = () => setIsMousePressed(false);
  
  const toggleWall = (r, c) => {
    if (history.length > 0) return; 
    setGrid(prev => {
      const newGrid = [...prev];
      const rowCopy = [...newGrid[r]];
      const node = rowCopy[c];
      if (!node.isStart && !node.isFinish) {
        rowCopy[c] = { ...node, isWall: !node.isWall };
        newGrid[r] = rowCopy;
      }
      return newGrid;
    });
  };

  const runSimulation = () => {
    const gridCopy = JSON.parse(JSON.stringify(grid));
    const startNode = gridCopy[7][5];
    const finishNode = gridCopy[7][25];
    
    const startTime = performance.now();
    let result;
    
    if (selectedAlgo === 'BFS') {
      result = bfs(gridCopy, startNode, finishNode);
    } else {
      result = astar(gridCopy, startNode, finishNode);
    }
    const endTime = performance.now();

    setHistory(result.history);
    setIsPlaying(true);

    // --- CALCULATE STATS ---
    // Nodes Explored = History length (approx)
    // Path Length = Hum history ke last step se check kar sakte hain agar path mila
    let pathLen = 0;
    // (Simpler way: Count distinct visited nodes in visualization)
    
    setStats({
      nodesExplored: result.history.length,
      pathLength: result.success ? "Found" : "Not Found", // Complex calculation skip kar rahe abhi ke liye
      timeTaken: (endTime - startTime).toFixed(2)
    });
  };

  useEffect(() => {
    let interval;
    if (isPlaying && history.length > 0) {
      interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < history.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, history]);

  const getRenderGrid = () => {
    if (history.length === 0) return grid;
    const renderGrid = grid.map(row => row.map(n => ({ ...n, isVisitedVisual: false })));
    for (let i = 0; i <= currentStep; i++) {
      const step = history[i];
      if (step) {
        renderGrid[step.currentNode.row][step.currentNode.col].isVisitedVisual = true;
      }
    }
    return renderGrid;
  };

  return (
    <div className="flex h-screen bg-slate-950 text-white overflow-hidden font-sans">
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
          Virtual Lab: Pathfinding Simulator
        </h1>

        {/* --- STATS DASHBOARD (NEW) --- */}
        <div className="flex gap-6 mb-6 w-full max-w-2xl">
           <div className="flex-1 bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center gap-3 shadow-lg">
              <Activity className="text-blue-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase">Nodes Explored</p>
                <p className="text-xl font-bold">{currentStep} / {stats.nodesExplored}</p>
              </div>
           </div>
           <div className="flex-1 bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center gap-3 shadow-lg">
              <Zap className="text-yellow-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase">Compute Time</p>
                <p className="text-xl font-bold">{stats.timeTaken} ms</p>
              </div>
           </div>
           <div className="flex-1 bg-slate-900 border border-slate-700 p-3 rounded-xl flex items-center gap-3 shadow-lg">
              <Map className="text-green-400" />
              <div>
                <p className="text-xs text-slate-400 uppercase">Algorithm</p>
                <p className="text-xl font-bold text-cyan-300">{selectedAlgo}</p>
              </div>
           </div>
        </div>
        
        {/* --- CONTROLS --- */}
        <div className="flex items-center gap-4 bg-slate-900 px-6 py-2 rounded-2xl shadow-2xl border border-slate-800 mb-6 z-10">
          <select 
            value={selectedAlgo}
            onChange={(e) => { setSelectedAlgo(e.target.value); resetGrid(); }}
            className="bg-slate-800 text-sm font-bold text-white border border-slate-600 rounded px-3 py-2 outline-none"
          >
            <option value="BFS">BFS (Unweighted)</option>
            <option value="A*">A* Search (Smart)</option>
          </select>

          <div className="w-[1px] h-6 bg-slate-700"></div>

          <button onClick={resetGrid} className="text-slate-400 hover:text-red-400 transition"><RotateCcw size={18} /></button>
          
          <button 
            onClick={() => history.length === 0 ? runSimulation() : setIsPlaying(!isPlaying)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isPlaying ? 'bg-amber-500' : 'bg-blue-600 hover:scale-110'
            }`}
          >
            {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-1" />}
          </button>
        </div>

        {/* --- LEGEND (Prompt Requirement) --- */}
        <div className="flex gap-4 text-xs text-slate-400 mb-2">
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Start</div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Goal</div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-slate-600 rounded-sm"></div> Wall</div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-600 rounded-sm"></div> Visited</div>
           <div className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 rounded-sm"></div> Head</div>
        </div>

        <Grid 
          grid={getRenderGrid()} 
          history={history}
          currentStep={currentStep}
          onMouseDown={handleMouseDown}
          onMouseEnter={handleMouseEnter}
          onMouseUp={handleMouseUp}
        />
      </div>

      <Explainer currentStep={currentStep} history={history} />
    </div>
  );
}

export default App;