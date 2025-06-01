import React, { useEffect } from 'react';
import { Scroll, AlertTriangle } from 'lucide-react';
import { useProphecyStore } from '../../lib/prophecyStore';
import './ApocryphalScrolls.css';

export const ApocryphalScrolls: React.FC = () => {
  const { prophecies, isLoading, error, setupRealtimeSubscription } = useProphecyStore();

  useEffect(() => {
    console.log('ApocryphalScrolls: Setting up subscription');
    setupRealtimeSubscription();
  }, [setupRealtimeSubscription]);

  useEffect(() => {
    console.log('Current prophecies:', prophecies.length);
  }, [prophecies]);

  if (isLoading) {
    return (
      <div className="apocryphal-scrolls">
        <div className="scrolls-header">
          <Scroll className="header-icon" size={24} />
          <h2>LOADING SACRED ARCHIVES...</h2>
          <Scroll className="header-icon" size={24} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apocryphal-scrolls">
        <div className="scrolls-header">
          <AlertTriangle className="header-icon" size={24} />
          <h2>ARCHIVE ACCESS ERROR</h2>
          <AlertTriangle className="header-icon" size={24} />
        </div>
        <div className="scrolls-error">{error}</div>
      </div>
    );
  }

  if (!prophecies.length) {
    return (
      <div className="apocryphal-scrolls">
        <div className="scrolls-header">
          <Scroll className="header-icon" size={24} />
          <h2>SACRED ARCHIVES</h2>
          <Scroll className="header-icon" size={24} />
        </div>
        <div className="scrolls-empty">
          No prophecies have been recorded yet...
        </div>
      </div>
    );
  }

  return (
    <div className="apocryphal-scrolls">
      <div className="scrolls-header">
        <Scroll className="header-icon" size={24} />
        <h2>SACRED ARCHIVES</h2>
        <Scroll className="header-icon" size={24} />
      </div>

      <div className="scrolls-container">
        {prophecies.map((prophecy) => (
          <div 
            key={prophecy.id} 
            className="prophecy-entry"
            style={{
              '--corruption-color': getCorruptionColor(prophecy.corruption_level)
            } as React.CSSProperties}
          >
            <div className="prophecy-timestamp">
              <span>{new Date(prophecy.created_at).toLocaleString()}</span>
              {prophecy.corruption_level !== 'none' && (
                <div className="corruption-indicator" title={`Corruption Level: ${prophecy.corruption_level}`}>
                  <AlertTriangle size={16} />
                </div>
              )}
            </div>
            <div className="prophecy-content">
              {prophecy.prophecy_text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getCorruptionColor = (level: string) => {
  switch (level) {
    case 'glitched': return '#00f0ff';
    case 'cryptic': return '#8a2be2';
    case 'hostile_fragment': return '#ff3131';
    default: return '#39ff14';
  }
};