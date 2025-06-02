import React, { useEffect, useState } from 'react';
import './LegionMoraleBar.css';

interface LegionMoraleBarProps {
  value: string;
}

export const LegionMoraleBar: React.FC<LegionMoraleBarProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Map morale states to numerical values for the progress bar
  const getMoraleValue = (state: string): number => {
    switch (state) {
      case 'On Suicide Watch': return 20;
      case 'Cautiously Optimistic': return 60;
      case 'Ascended and Engorged': return 100;
      default: return 60;
    }
  };
  
  // Animate the value change
  useEffect(() => {
    const targetValue = getMoraleValue(value);
    if (displayValue !== targetValue) {
      const interval = setInterval(() => {
        setDisplayValue(prev => {
          if (prev < targetValue) {
            return Math.min(prev + 1, targetValue);
          } else if (prev > targetValue) {
            return Math.max(prev - 1, targetValue);
          }
          return prev;
        });
      }, 10);
      
      return () => clearInterval(interval);
    }
  }, [value, displayValue]);
  
  // Determine morale state styling
  const getMoraleState = (val: number) => {
    if (val <= 30) return { text: 'ON SUICIDE WATCH', color: '#ff3131' };
    if (val <= 70) return { text: 'CAUTIOUSLY OPTIMISTIC', color: '#ffff00' };
    return { text: 'ASCENDED AND ENGORGED', color: '#39ff14' };
  };
  
  const moraleState = getMoraleState(displayValue);
  
  // Calculate gradient for the bar
  const getBarGradient = () => {
    const redStop = Math.min(30, displayValue) / 30 * 100;
    const yellowStop = Math.min(Math.max(0, displayValue - 30), 40) / 40 * 100;
    
    return `linear-gradient(to right, 
      #ff3131 0%, 
      #ff3131 ${redStop}%, 
      ${redStop > 0 && yellowStop > 0 ? '#ffff00' : '#222'} ${redStop}%, 
      #ffff00 ${redStop + yellowStop}%, 
      ${redStop + yellowStop > 0 ? '#39ff14' : '#222'} ${redStop + yellowStop}%, 
      #39ff14 100%
    )`;
  };
  
  return (
    <div className="legion-morale-container">
      <div className="morale-bar-wrapper">
        <div 
          className="morale-bar-fill" 
          style={{ 
            width: `${displayValue}%`,
            background: getBarGradient()
          }}
        ></div>
        <div className="morale-bar-value">{displayValue}%</div>
      </div>
      
      <div 
        className="morale-state" 
        style={{ 
          color: moraleState.color,
          textShadow: `0 0 10px ${moraleState.color}`
        }}
      >
        {value}
      </div>
      
      <div className="morale-scale">
        <div className="scale-marker danger">30%</div>
        <div className="scale-marker warning">60%</div>
        <div className="scale-marker success">90%</div>
      </div>
    </div>
  );
};