import React from 'react';
import './TapSurgeDisplay.css';

interface TapSurgeDisplayProps {
  value: number; // 0-3: representing different states
}

export const TapSurgeDisplay: React.FC<TapSurgeDisplayProps> = ({ value }) => {
  const tapStates = [
    { label: 'FLACCID DRIZZLE', color: '#39ff14' },
    { label: 'STEADY POUNDING', color: '#ffff00' },
    { label: 'FRENZIED SLAPPING', color: '#ff9900' },
    { label: 'GIGA-SURGE', color: '#ff3131' },
  ];
  
  const currentState = tapStates[value];
  
  return (
    <div className="tap-surge-container">
      <div className="tap-surge-label">STATUS:</div>
      <div 
        className="tap-surge-value" 
        style={{ 
          color: currentState.color,
          textShadow: `0 0 10px ${currentState.color}, 0 0 20px ${currentState.color}`
        }}
      >
        <span className="glitch-text" data-text={currentState.label}>
          {currentState.label}
        </span>
      </div>
      
      <div className="tap-surge-meter">
        {tapStates.map((state, index) => (
          <div 
            key={index}
            className={`tap-meter-segment ${index <= value ? 'active' : ''}`}
            style={{ 
              backgroundColor: index <= value ? state.color : 'rgba(255, 255, 255, 0.1)',
              boxShadow: index <= value ? `0 0 10px ${state.color}` : 'none'
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};