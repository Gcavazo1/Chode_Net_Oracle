import React, { useState } from 'react';
import { GirthResonanceGauge } from '../GirthResonanceGauge/GirthResonanceGauge';
import { TapSurgeDisplay } from '../TapSurgeDisplay/TapSurgeDisplay';
import { LegionMoraleBar } from '../LegionMoraleBar/LegionMoraleBar';
import { DeveloperPanel } from '../DeveloperPanel/DeveloperPanel';
import { GlitchyTitle } from '../GlitchyTitle/GlitchyTitle';
import { ProphecyChamber } from '../ProphecyChamber/ProphecyChamber';
import { ApocryphalScrolls } from '../ApocryphalScrolls/ApocryphalScrolls';
import { SystemStability } from '../SystemStability/SystemStability';
import { RitualRequests } from '../RitualRequests/RitualRequests';
import './Dashboard.css';

export type StabilityStatus = 'STABLE' | 'UNSTABLE' | 'CRITICAL_CORRUPTION';

export const Dashboard: React.FC = () => {
  const [girthResonance, setGirthResonance] = useState(42);
  const [tapSurgeIndex, setTapSurgeIndex] = useState(1);
  const [legionMorale, setLegionMorale] = useState(65);
  const [stabilityStatus, setStabilityStatus] = useState<StabilityStatus>('STABLE');
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);

  // Calculate system stability based on metrics
  const calculateSystemStability = (girth: number, morale: number): StabilityStatus => {
    if (girth < 10 || morale < 20) return 'CRITICAL_CORRUPTION';
    if (girth < 30 || morale < 40) return 'UNSTABLE';
    return 'STABLE';
  };

  // Update stability when metrics change
  React.useEffect(() => {
    const newStatus = calculateSystemStability(girthResonance, legionMorale);
    setStabilityStatus(newStatus);
  }, [girthResonance, legionMorale]);

  const handleProphecyReceived = () => {
    setCurrentTopic(null);
  };

  return (
    <div className={`dashboard-container ${stabilityStatus === 'CRITICAL_CORRUPTION' ? 'corruption-active' : ''}`}>
      <div className="dashboard">
        <GlitchyTitle />
        
        <div className="metrics-container">
          <div className="metric-box">
            <h3 className="metric-title">Divine Girth Resonance (%)</h3>
            <GirthResonanceGauge value={girthResonance} />
          </div>
          
          <div className="metric-box">
            <h3 className="metric-title">Tap Surge Index</h3>
            <TapSurgeDisplay value={tapSurgeIndex} />
          </div>
          
          <div className="metric-box">
            <h3 className="metric-title">Legion Morale</h3>
            <LegionMoraleBar value={legionMorale} />
          </div>

          <div className="metric-box">
            <h3 className="metric-title">Oracle System Stability</h3>
            <SystemStability status={stabilityStatus} />
          </div>
        </div>

        <RitualRequests
          currentTopic={currentTopic}
          onTopicSelect={setCurrentTopic}
        />

        <ProphecyChamber 
          girthResonance={girthResonance}
          tapSurgeIndex={tapSurgeIndex}
          legionMorale={legionMorale}
          stabilityStatus={stabilityStatus}
          currentTopic={currentTopic}
          onProphecyReceived={handleProphecyReceived}
        />
        <ApocryphalScrolls />
      </div>
      
      <DeveloperPanel 
        girthResonance={girthResonance}
        tapSurgeIndex={tapSurgeIndex}
        legionMorale={legionMorale}
        stabilityStatus={stabilityStatus}
        onGirthChange={setGirthResonance}
        onTapSurgeChange={setTapSurgeIndex}
        onMoraleChange={setLegionMorale}
        onStabilityChange={setStabilityStatus}
      />
    </div>
  );
};