import React from 'react';
import { Activity } from 'lucide-react';
import { GirthResonanceGauge } from '../GirthResonanceGauge/GirthResonanceGauge';
import { TapSurgeDisplay } from '../TapSurgeDisplay/TapSurgeDisplay';
import { LegionMoraleBar } from '../LegionMoraleBar/LegionMoraleBar';
import { SystemStability } from '../SystemStability/SystemStability';
import { GlitchyTitle } from '../GlitchyTitle/GlitchyTitle';
import './Dashboard.css';

export type StabilityStatus = 'STABLE' | 'UNSTABLE' | 'CRITICAL_CORRUPTION';

interface DashboardProps {
  girthResonance: number;
  tapSurgeIndex: string;
  legionMorale: string;
  stabilityStatus: StabilityStatus;
  lastUpdated: string;
  isSimulated?: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({
  girthResonance,
  tapSurgeIndex,
  legionMorale,
  stabilityStatus,
  lastUpdated,
  isSimulated = true
}) => {
  const formattedTimestamp = new Date(lastUpdated).toLocaleTimeString();

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="dashboard-header">
          <GlitchyTitle />
          <div className={`data-source-status ${isSimulated ? 'simulated' : 'live'}`}>
            <Activity size={16} />
            <span>STATUS: {isSimulated ? 'Local Simulation Active' : 'Live Oracle Feed'}</span>
          </div>
        </div>
        
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

        <div className="dashboard-footer">
          <span className="timestamp">Oracle Index Last Updated: {formattedTimestamp}</span>
        </div>
      </div>
    </div>
  );
};