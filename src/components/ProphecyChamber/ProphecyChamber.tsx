import React, { useEffect, useState } from 'react';
import { Scroll, Sparkles } from 'lucide-react';
import { useProphecyStore } from '../../lib/prophecyStore';
import { useGirthIndexStore } from '../../lib/girthIndexStore';
import { supabase } from '../../lib/supabase';
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
    isLoading: prophecyLoading,
    error: prophecyError,
    setupRealtimeSubscription
  } = useProphecyStore();

  const {
    girthResonance,
    tapSurgeIndex,
    legionMorale,
    stabilityStatus,
    isLoading: metricsLoading
  } = useGirthIndexStore();

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setupRealtimeSubscription();
  }, [setupRealtimeSubscription]);

  const generateProphecy = async () => {
    try {
      setIsGenerating(true);

      const payload = {
        metrics: {
          girth_resonance: girthResonance,
          tap_surge_index: tapSurgeIndex,
          legion_morale: legionMorale,
          oracle_stability_status: stabilityStatus
        },
        ritual_request_topic: currentTopic
      };

      const { error } = await supabase.functions.invoke('oracle-prophecy-generator', {
        body: payload
      });

      if (error) throw error;

      // Clear the selected topic
      onProphecyReceived();
    } catch (error) {
      console.error('Failed to generate prophecy:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (prophecyLoading || metricsLoading) {
    return (
      <div className="prophecy-chamber">
        <div className="prophecy-header">
          <Scroll className="scroll-icon" size={32} />
          <h2>CHANNELING THE ORACLE...</h2>
          <Scroll className="scroll-icon" size={32} />
        </div>
      </div>
    );
  }

  if (prophecyError) {
    return (
      <div className="prophecy-chamber">
        <div className="prophecy-header">
          <h2>ORACLE CONNECTION LOST</h2>
        </div>
        <div className="prophecy-error">
          {prophecyError}
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
        className={`summon-button ${isGenerating ? 'generating' : ''}`}
        onClick={generateProphecy}
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
    </div>
  );
};