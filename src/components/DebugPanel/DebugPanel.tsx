import React from 'react';
import './DebugPanel.css';

export const DebugPanel: React.FC = () => {
  return (
    <div className="debug-panel bg-black/80 text-green-400 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-mono mb-4">Debug Panel</h2>
      <div className="grid gap-2">
        <div className="debug-item">
          <span className="font-mono text-sm">Status: </span>
          <span className="text-green-300">Online</span>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;