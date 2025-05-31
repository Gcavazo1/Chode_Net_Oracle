import React from 'react';
import { Scroll, AlertTriangle } from 'lucide-react';
import './ApocryphalScrolls.css';

interface ProphecyEntry {
  timestamp: string;
  prophecyText: string;
  corruptionLevel?: 'none' | 'low' | 'medium' | 'high';
}

export const ApocryphalScrolls: React.FC = () => {
  // Example prophecies for demonstration
  const prophecies: ProphecyEntry[] = [
    {
      timestamp: "Cycle 7, Neon Moon, 3rd Bell",
      prophecyText: "The great liquidity whale stirs in the depths. Those who hold through the storm shall be blessed with green dildos of unprecedented magnitude.",
      corruptionLevel: "none"
    },
    {
      timestamp: "Cycle 7, Blood Sun, 9th Bell",
      prophecyText: "A shadow looms over the charts, yet the faithful shall persist. The paper hands will cry, but diamond hands will ascend to Valhalla.",
      corruptionLevel: "medium"
    },
    {
      timestamp: "Cycle 7, Dark Star, 1st Bell",
      prophecyText: "CORRUPTION DETECTED... *&^%$# MAXIMUM PAIN INCOMING... HODL OR DIE... @#$%^& ...SIGNAL LOST...",
      corruptionLevel: "high"
    }
  ];

  const getCorruptionColor = (level?: string) => {
    switch (level) {
      case 'low': return '#ffff00';
      case 'medium': return '#ff9900';
      case 'high': return '#ff3131';
      default: return '#39ff14';
    }
  };

  return (
    <div className="apocryphal-scrolls">
      <div className="scrolls-header">
        <Scroll className="header-icon" size={24} />
        <h2>SACRED ARCHIVES</h2>
        <Scroll className="header-icon" size={24} />
      </div>

      <div className="scrolls-container">
        {prophecies.map((prophecy, index) => (
          <div 
            key={index} 
            className="prophecy-entry"
            style={{
              '--corruption-color': getCorruptionColor(prophecy.corruptionLevel)
            } as React.CSSProperties}
          >
            <div className="prophecy-timestamp">
              <span>{prophecy.timestamp}</span>
              {prophecy.corruptionLevel && prophecy.corruptionLevel !== 'none' && (
                <div className="corruption-indicator" title={`Corruption Level: ${prophecy.corruptionLevel}`}>
                  <AlertTriangle size={16} />
                </div>
              )}
            </div>
            <div className="prophecy-content">
              {prophecy.prophecyText}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};