import React from 'react';

const Explainer = ({ currentStep, history }) => {
  const stepData = history[currentStep];

  if (!stepData) {
    return (
      <div className="w-96 bg-slate-900 border-l border-slate-700 p-6 text-slate-400 font-mono text-sm">
        <h2 className="text-xl font-bold text-white mb-4">Glass Box Engine</h2>
        <p>System Ready...</p>
        <p className="mt-2">1. Draw walls on the grid.</p>
        <p>2. Press Play to start BFS.</p>
      </div>
    );
  }

  return (
    <div className="w-96 bg-slate-900 border-l border-slate-700 p-6 flex flex-col gap-6 h-screen overflow-y-auto font-mono">
      <div>
        <div className="text-xs font-bold text-teal-300 bg-teal-900/40 px-2 py-1 rounded inline-block mb-2 border border-teal-800">
          BFS | Step {currentStep + 1} / {history.length}
        </div>
        <h2 className="text-xl font-bold text-white">Algorithm State</h2>
      </div>

      {/* Log Box */}
      <div className="bg-slate-800 p-4 rounded border border-slate-700 shadow-inner">
        <h3 className="text-xs uppercase text-slate-400 font-bold mb-2">⚡ What's Happening</h3>
        <p className="text-sm text-green-400 leading-relaxed">
          {">"} {stepData.log}
        </p>
      </div>

      {/* Queue Box */}
      <div className="bg-slate-800 p-4 rounded border border-slate-700 shadow-inner">
        <h3 className="text-xs uppercase text-purple-400 font-bold mb-2">📚 Queue (FIFO)</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {stepData.queue.map((item, i) => (
            <span key={i} className="text-xs bg-slate-950 text-purple-300 px-2 py-1 rounded border border-purple-900/50 whitespace-nowrap">
              {item}
            </span>
          ))}
          {stepData.queue.length === 0 && <span className="text-xs text-slate-500">Empty</span>}
        </div>
      </div>
    </div>
  );
};

export default Explainer;