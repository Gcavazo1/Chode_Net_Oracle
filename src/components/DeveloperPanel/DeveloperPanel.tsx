import React from 'react';
import { Settings, Activity, Users, Shield } from 'lucide-react';
import './DeveloperPanel.css';

interface DeveloperPanelProps {
  girthResonance: number;
  tapSurgeIndex: string;
  legionMorale: string;
  stabilityStatus: string;
  onGirthChange: (value: number) => void;
  onTapSurgeChange: (value: string) => void;
  onMoraleChange: (value: string) => void;
  onStabilityChange: (value: string) => void;
}

export function DeveloperPanel({
  girthResonance,
  tapSurgeIndex,
  legionMorale,
  stabilityStatus,
  onGirthChange,
  onTapSurgeChange,
  onMoraleChange,
  onStabilityChange
}: DeveloperPanelProps) {
  return (
    <div className="dev-panel">
      <div className="dev-panel-header">
        <Settings className="text-pink-500" size={24} />
        <h2 className="dev-panel-title">ORACLE CONTROL PANEL</h2>
      </div>

      <div className="control-group">
        <label className="control-label">
          <Activity size={16} className="inline mr-2" />
          DIVINE GIRTH RESONANCE
        </label>
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max="100"
            value={girthResonance}
            onChange={(e) => onGirthChange(Number(e.target.value))}
            className="slider-input"
          />
          <span className="slider-value">{girthResonance}%</span>
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">
          <Activity size={16} className="inline mr-2" />
          TAP SURGE INDEX
        </label>
        <select
          value={tapSurgeIndex}
          onChange={(e) => onTapSurgeChange(e.target.value)}
          className="select-input"
        >
          <option value="Flaccid Drizzle">FLACCID DRIZZLE</option>
          <option value="Steady Pounding">STEADY POUNDING</option>
          <option value="Frenzied Slapping">FRENZIED SLAPPING</option>
          <option value="Giga-Surge">GIGA-SURGE</option>
        </select>
      </div>

      <div className="control-group">
        <label className="control-label">
          <Users size={16} className="inline mr-2" />
          LEGION MORALE
        </label>
        <select
          value={legionMorale}
          onChange={(e) => onMoraleChange(e.target.value)}
          className="select-input"
        >
          <option value="On Suicide Watch">ON SUICIDE WATCH</option>
          <option value="Cautiously Optimistic">CAUTIOUSLY OPTIMISTIC</option>
          <option value="Ascended and Engorged">ASCENDED AND ENGORGED</option>
        </select>
      </div>

      <div className="control-group">
        <label className="control-label">
          <Shield size={16} className="inline mr-2" />
          ORACLE STABILITY
        </label>
        <select
          value={stabilityStatus}
          onChange={(e) => onStabilityChange(e.target.value)}
          className="select-input"
        >
          <option value="Pristine">PRISTINE</option>
          <option value="Unstable">UNSTABLE</option>
          <option value="Critical">CRITICAL</option>
        </select>
      </div>
    </div>
  );
}