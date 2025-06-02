import React, { useEffect, useState } from 'react';
import { Scroll, Sparkles } from 'lucide-react';
import { useProphecyStore } from '../../lib/prophecyStore';
import { useGirthIndexStore } from '../../lib/girthIndexStore';
import { PixelBorder, PixelText, PixelLoading } from '../PixelArt/PixelBorder';
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

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    console.log('ProphecyChamber: Setting up subscription');
    setupRealtimeSubscription();
  }, [setupRealtimeSubscription]);

  useEffect(() => {
    console.log('ProphecyChamber: Rendering with prophecy:', latestProphecy?.id);
  }, [latestProphecy]);

  if (isLoading) {
    return (
      <div className="prophecy-chamber">
        <div className="prophecy-header">
          <Scroll className="scroll-icon\" size={32} />
          <h2><PixelText>CHANNELING THE ORACLE...</PixelText></h2>
          <Scroll className="scroll-icon" size={32} />
        </div>
        <PixelLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="prophecy-chamber">
        <div className="prophecy-header">
          <h2><PixelText>ORACLE CONNECTION LOST</PixelText></h2>
        </div>
        <div className="prophecy-error">
          {error}
        </div>
      </div>
    );
  }

  const isCorrupted = latestProphecy?.corruption_level !== 'none';

  return (
    <PixelBorder isCorrupted={isCorrupted} className="prophecy-chamber">
      <div className="prophecy-header">
        <Scroll className="scroll-icon" size={32} />
        <h2><PixelText>THE ORACLE SPEAKS:</PixelText></h2>
        <Scroll className="scroll-icon" size={32} />
      </div>

      <div className={`prophecy-display corruption-${latestProphecy?.corruption_level || 'none'}`}>
        <div className="prophecy-text">
          {latestProphecy?.prophecy_text || 'The Oracle awaits your summons...'}
        </div>
      </div>

      <button 
        className={`summon-button ${isGenerating ? 'generating' : ''}`}
        onClick={() => {
          setIsGenerating(true);
          // Prophecy generation logic here
          setTimeout(() => {
            setIsGenerating(false);
            onProphecyReceived();
          }, 2000);
        }}
        disabled={isGenerating}
      >
        <Sparkles className="sparkle-icon" size={24} />
        <span>
          {isGenerating 
            ? 'CHANNELING WISDOM...' 
            : currentTopic 
              ? 'SUMMON RITUAL PROPHECY' 
              : 'SUMMON PROPHECY'
          }
        </span>
        <Sparkles className="sparkle-icon" size={24} />
      </button>

      {currentTopic && (
        <div className="ritual-topic-indicator">
          <span>Ritual Topic Selected</span>
        </div>
      )}
    </PixelBorder>
  );
};