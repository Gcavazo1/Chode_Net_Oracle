import React from 'react';
import './DeveloperPanel.css';

interface DeveloperPanelProps {
  girthResonance: number;
  tapSurgeIndex: number;
  legionMorale: number;
  onGirthChange: (value: number) => void;
  onTapSurgeChange: (value: number) => void;
  onMoraleChange: (value: number) => void;
}

export const DeveloperPanel: React.FC<DeveloperPanelProps> = ({
  girthResonance,
  tapSurgeIndex,
  legionMorale,
  onGirthChange,
  onTapSurgeChange,
  onMoraleChange
}) => {
  return (
    <div className="dev-panel">
      <div className="dev-panel-header">
        <h2>Developer Controls</h2>
        <div className="panel-status">ORACLE SIMULATION CONTROLS</div>
      </div>
      
      <div className="controls-container">
        <div className="control-group">
          <label htmlFor="girth-resonance">Divine Girth Resonance (%): {girthResonance}</label>
          <div className="slider-container">
            <input
              type="range"
              id="girth-resonance"
              min="0"
              max="100"
              value={girthResonance}
              onChange={(e) => onGirthChange(parseInt(e.target.value))}
              className="cyber-slider"
            />
            <div className="slider-buttons">
              <button onClick={() => onGirthChange(Math.max(0, girthResonance - 10))}>-10</button>
              <button onClick={() => onGirthChange(Math.min(100, girthResonance + 10))}>+10</button>
            </div>
          </div>
        </div>
        
        <div className="control-group">
          <label>Tap Surge Index:</label>
          <div className="button-group">
            <button 
              className={tapSurgeIndex === 0 ? 'active' : ''} 
              onClick={() => onTapSurgeChange(0)}
              style={{ backgroundColor: tapSurgeIndex === 0 ? '#39ff14' : undefined }}
            >
              FLACCID DRIZZLE
            </button>
            <button 
              className={tapSurgeIndex === 1 ? 'active' : ''} 
              onClick={() => onTapSurgeChange(1)}
              style={{ backgroundColor: tapSurgeIndex === 1 ? '#ffff00' : undefined }}
            >
              STEADY POUNDING
            </button>
            <button 
              className={tapSurgeIndex === 2 ? 'active' : ''} 
              onClick={() => onTapSurgeChange(2)}
              style={{ backgroundColor: tapSurgeIndex === 2 ? '#ff9900' : undefined }}
            >
              FRENZIED SLAPPING
            </button>
            <button 
              className={tapSurgeIndex === 3 ? 'active' : ''} 
              onClick={() => onTapSurgeChange(3)}
              style={{ backgroundColor: tapSurgeIndex === 3 ? '#ff3131' : undefined }}
            >
              GIGA-SURGE
            </button>
          </div>
        </div>
        
        <div className="control-group">
          <label htmlFor="legion-morale">Legion Morale (%): {legionMorale}</label>
          <div className="slider-container">
            <input
              type="range"
              id="legion-morale"
              min="0"
              max="100"
              value={legionMorale}
              onChange={(e) => onMoraleChange(parseInt(e.target.value))}
              className="cyber-slider"
            />
            <div className="slider-buttons">
              <button onClick={() => onMoraleChange(Math.max(0, legionMorale - 10))}>-10</button>
              <button onClick={() => onMoraleChange(Math.min(100, legionMorale + 10))}>+10</button>
            </div>
          </div>
        </div>
        
        <div className="preset-buttons">
          <button onClick={() => {
            onGirthChange(10);
            onTapSurgeChange(0);
            onMoraleChange(15);
          }}>
            BEAR MARKET PANIC
          </button>
          <button onClick={() => {
            onGirthChange(50);
            onTapSurgeChange(1);
            onMoraleChange(55);
          }}>
            STABLE ACCUMULATION
          </button>
          <button onClick={() => {
            onGirthChange(90);
            onTapSurgeChange(3);
            onMoraleChange(95);
          }}>
            MAXIMUM ENGORGEMENT
          </button>
        </div>
      </div>
    </div>
  );
};