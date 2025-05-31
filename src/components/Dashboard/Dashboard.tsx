import React, { useState } from 'react';
import { GirthResonanceGauge } from '../GirthResonanceGauge/GirthResonanceGauge';
import { TapSurgeDisplay } from '../TapSurgeDisplay/TapSurgeDisplay';
import { LegionMoraleBar } from '../LegionMoraleBar/LegionMoraleBar';
import { DeveloperPanel } from '../DeveloperPanel/DeveloperPanel';
import { GlitchyTitle } from '../GlitchyTitle/GlitchyTitle';
import { ProphecyChamber } from '../ProphecyChamber/ProphecyChamber';
import { ApocryphalScrolls } from '../ApocryphalScrolls/ApocryphalScrolls';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const [girthResonance, setGirthResonance] = useState(42);
  const [tapSurgeIndex, setTapSurgeIndex] = useState(1);
  const [legionMorale, setLegionMorale] = useState(65);

  return (
    <div className="dashboard-container">
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
        </div>

        <ProphecyChamber 
          girthResonance={girthResonance}
          tapSurgeIndex={tapSurgeIndex}
          legionMorale={legionMorale}
        />
        <ApocryphalScrolls />
      </div>
      
      <DeveloperPanel 
        girthResonance={girthResonance}
        tapSurgeIndex={tapSurgeIndex}
        legionMorale={legionMorale}
        onGirthChange={setGirthResonance}
        onTapSurgeChange={setTapSurgeIndex}
        onMoraleChange={setLegionMorale}
      />
    </div>
  );
};