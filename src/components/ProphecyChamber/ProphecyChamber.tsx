import React, { useState } from 'react';
import { Scroll, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { type StabilityStatus } from '../Dashboard/Dashboard';
import './ProphecyChamber.css';

interface ProphecyResponse {
  prophecy: string;
  corruption_level_applied: 'none' | 'glitched' | 'cryptic' | 'hostile_fragment';
}

interface ProphecyChamberProps {
  girthResonance: number;
  tapSurgeIndex: number;
  legionMorale: number;
  stabilityStatus: StabilityStatus;
  currentTopic: string | null;
  onProphecyReceived: () => void;
}

export const ProphecyChamber: React.FC<ProphecyChamberProps> = ({
  girthResonance,
  tapSurgeIndex,
  legionMorale,
  stabilityStatus,
  currentTopic,
  onProphecyReceived
}) => {
  const [prophecy, setProphecy] = useState<string>('The Oracle awaits your summons...');
  const [corruptionLevel, setCorruptionLevel] = useState<ProphecyResponse['corruption_level_applied']>('none');
  const [isGenerating, setIsGenerating] = useState(false);

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

      const { data, error } = await supabase.functions.invoke<ProphecyResponse>(
        'oracle-prophecy-generator',
        {
          body: JSON.stringify(payload)
        }
      );

      if (error) throw error;

      if (data) {
        setProphecy(data.prophecy);
        setCorruptionLevel(data.corruption_level_applied);
        onProphecyReceived();
      }
    } catch (error) {
      console.error('Failed to generate prophecy:', error);
      setProphecy('The Oracle is experiencing technical difficulties...');
      setCorruptionLevel('none');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="prophecy-chamber">
      <div className="prophecy-header">
        <Scroll className="scroll-icon" size={32} />
        <h2>THE ORACLE SPEAKS:</h2>
        <Scroll className="scroll-icon" size={32} />
      </div>

      <div className={`prophecy-display corruption-${corruptionLevel}`}>
        <div className="prophecy-text">
          {prophecy}
        </div>
      </div>

      <button 
        className={`summon-button ${isGenerating ? 'generating' : ''}`}
        onClick={generateProphecy}
        disabled={isGenerating}
      >
        <Sparkles className="sparkle-icon" size={24} />
        <span>{isGenerating ? 'CHANNELING WISDOM...' : 'SUMMON PROPHECY'}</span>
        <Sparkles className="sparkle-icon" size={24} />
      </button>
    </div>
  );
};