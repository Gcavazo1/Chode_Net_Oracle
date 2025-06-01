import React, { useEffect } from 'react';
import { Scroll, Sparkles } from 'lucide-react';
import { useProphecyStore } from '../../lib/prophecyStore';
import './ProphecyChamber.css';

interface ProphecyChamberProps {
  currentTopic: string | null;
  onProphecyReceived: () => void;
}

export const ProphecyChamber: React.FC<ProphecyChamberProps> = ({
  currentTopic,
  onProphecyReceived
}) => {
  const {
    latestProphecy,
    isLoading,
    error,
    setupRealtimeSubscription
  } = useProphecyStore();

  useEffect(() => {
    setupRealtimeSubscription();
  }, [setupRealtimeSubscription]);

  if (isLoading) {
    return (
      <div className="prophecy-chamber">
        <div className="prophecy-header">
          <Scroll className="scroll-icon\" size={32} />
          <h2>CHANNELING THE ORACLE...</h2>
          <Scroll className="scroll-icon" size={32} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prophecy-chamber">
        <div className="prophecy-header">
          <h2>ORACLE CONNECTION LOST</h2>
        </div>
        <div className="prophecy-error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="prophecy-chamber">
      <div className="prophecy-header">
        <Scroll className="scroll-icon" size={32} />
        <h2>THE ORACLE SPEAKS:</h2>
        <Scroll className="scroll-icon" size={32} />
      </div>

      <div className={`prophecy-display corruption-${latestProphecy?.corruption_level || 'none'}`}>
        <div className="prophecy-text">
          {latestProphecy?.prophecy_text || 'The Oracle awaits your summons...'}
        </div>
      </div>

      <button 
        className="summon-button"
        onClick={onProphecyReceived}
      >
        <Sparkles className="sparkle-icon" size={24} />
        <span>SUMMON NEW PROPHECY</span>
        <Sparkles className="sparkle-icon" size={24} />
      </button>
    </div>
  );
};