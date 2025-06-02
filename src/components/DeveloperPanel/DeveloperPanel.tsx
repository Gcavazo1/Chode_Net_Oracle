import React, { useState, useCallback } from 'react';
import { Activity, Play, Square } from 'lucide-react';
import { type StabilityStatus } from '../../lib/types';
import { GhostLegionSimulator, type SimulationConfig, type SimulationStats, defaultConfig } from '../../lib/ghostLegionSimulator';
import './DeveloperPanel.css';

interface DeveloperPanelProps {
  girthResonance: number;
  tapSurgeIndex: string;
  legionMorale: string;
  stabilityStatus: StabilityStatus;
  onGirthChange: (value: number) => void;
  onTapSurgeChange: (value: string) => void;
  onMoraleChange: (value: string) => void;
  onStabilityChange: (value: StabilityStatus) => void;
}

export const DeveloperPanel: React.FC<DeveloperPanelProps> = ({
  girthResonance,
  tapSurgeIndex,
  legionMorale,
  stabilityStatus,
  onGirthChange,
  onTapSurgeChange,
  onMoraleChange,
  onStabilityChange
}) => {
  const [simulator, setSimulator] = useState<GhostLegionSimulator | null>(null);
  const [config, setConfig] = useState<SimulationConfig>(defaultConfig);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<SimulationStats | null>(null);

  const handleConfigChange = (key: keyof SimulationConfig, value: number) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleEvent = useCallback((event: any) => {
    console.log('Ghost Legion Event:', event);
    // Forward to existing game event handler
    window.postMessage(event, '*');
  }, []);

  const handleProgress = useCallback((value: number) => {
    setProgress(value);
  }, []);

  const handleStats = useCallback((stats: SimulationStats) => {
    setStats(stats);
  }, []);

  const startSimulation = () => {
    if (simulator?.isRunning()) return;
    
    const newSimulator = new GhostLegionSimulator(
      config,
      handleEvent,
      handleProgress,
      handleStats
    );
    
    setSimulator(newSimulator);
    newSimulator.start();
  };

  const stopSimulation = () => {
    simulator?.stop();
    setSimulator(null);
  };

  return (
    <div className="dev-panel">
      <div className="dev-panel-header">
        <h2>Developer Controls</h2>
        <div className="panel-status">ORACLE SIMULATION CONTROLS</div>
      </div>
      
      <div className="controls-container">
        {/* Existing controls... */}
        <div className="control-group">
          <label htmlFor="girth-resonance">Divine Girth Resonance (%): {girthResonance}</label>
          <div className="slider-container">
            <input
              type="range"
              id="girth-resonance"
              min="0"
              max="100"
              value={girthResonance}
              onChange={(e) => onGirthChange(parseInt(e.target.value))}
              className="cyber-slider"
            />
            <div className="slider-buttons">
              <button onClick={() => onGirthChange(Math.max(0, girthResonance - 10))}>-10</button>
              <button onClick={() => onGirthChange(Math.min(100, girthResonance + 10))}>+10</button>
            </div>
          </div>
        </div>
        
        <div className="control-group">
          <label>Tap Surge Index:</label>
          <div className="button-group">
            <button 
              className={tapSurgeIndex === 'Flaccid Drizzle' ? 'active' : ''} 
              onClick={() => onTapSurgeChange('Flaccid Drizzle')}
              style={{ backgroundColor: tapSurgeIndex === 'Flaccid Drizzle' ? '#39ff14' : undefined }}
            >
              FLACCID DRIZZLE
            </button>
            <button 
              className={tapSurgeIndex === 'Steady Pounding' ? 'active' : ''} 
              onClick={() => onTapSurgeChange('Steady Pounding')}
              style={{ backgroundColor: tapSurgeIndex === 'Steady Pounding' ? '#ffff00' : undefined }}
            >
              STEADY POUNDING
            </button>
            <button 
              className={tapSurgeIndex === 'Frenzied Slapping' ? 'active' : ''} 
              onClick={() => onTapSurgeChange('Frenzied Slapping')}
              style={{ backgroundColor: tapSurgeIndex === 'Frenzied Slapping' ? '#ff9900' : undefined }}
            >
              FRENZIED SLAPPING
            </button>
            <button 
              className={tapSurgeIndex === 'Giga-Surge' ? 'active' : ''} 
              onClick={() => onTapSurgeChange('Giga-Surge')}
              style={{ backgroundColor: tapSurgeIndex === 'Giga-Surge' ? '#ff3131' : undefined }}
            >
              GIGA-SURGE
            </button>
          </div>
        </div>
        
        <div className="control-group">
          <label>Legion Morale:</label>
          <div className="button-group">
            <button 
              className={legionMorale === 'On Suicide Watch' ? 'active' : ''} 
              onClick={() => onMoraleChange('On Suicide Watch')}
              style={{ backgroundColor: legionMorale === 'On Suicide Watch' ? '#ff3131' : undefined }}
            >
              ON SUICIDE WATCH
            </button>
            <button 
              className={legionMorale === 'Cautiously Optimistic' ? 'active' : ''} 
              onClick={() => onMoraleChange('Cautiously Optimistic')}
              style={{ backgroundColor: legionMorale === 'Cautiously Optimistic' ? '#ffff00' : undefined }}
            >
              CAUTIOUSLY OPTIMISTIC
            </button>
            <button 
              className={legionMorale === 'Ascended and Engorged' ? 'active' : ''} 
              onClick={() => onMoraleChange('Ascended and Engorged')}
              style={{ backgroundColor: legionMorale === 'Ascended and Engorged' ? '#39ff14' : undefined }}
            >
              ASCENDED AND ENGORGED
            </button>
          </div>
        </div>

        <div className="control-group">
          <label>Oracle System Stability:</label>
          <div className="button-group stability-buttons">
            <button 
              className={`stability-button ${stabilityStatus === 'Pristine' ? 'active' : ''}`}
              onClick={() => onStabilityChange('Pristine')}
              style={{ backgroundColor: stabilityStatus === 'Pristine' ? '#39ff14' : undefined }}
            >
              PRISTINE
            </button>
            <button 
              className={`stability-button ${stabilityStatus === 'Unstable' ? 'active' : ''}`}
              onClick={() => onStabilityChange('Unstable')}
              style={{ backgroundColor: stabilityStatus === 'Unstable' ? '#ffff00' : undefined }}
            >
              UNSTABLE
            </button>
            <button 
              className={`stability-button ${stabilityStatus === 'Critical' ? 'active' : ''}`}
              onClick={() => onStabilityChange('Critical')}
              style={{ backgroundColor: stabilityStatus === 'Critical' ? '#ff3131' : undefined }}
            >
              CRITICAL
            </button>
          </div>
        </div>

        {/* Ghost Legion Simulator */}
        <div className="simulation-controls">
          <div className="simulation-header">
            <h3>Ghost Legion Simulator</h3>
            <Activity size={24} className="header-icon" />
          </div>

          <div className="simulation-config">
            <div className="config-row">
              <label>Duration (seconds):</label>
              <input
                type="number"
                min="1"
                max="300"
                value={config.durationSeconds}
                onChange={(e) => handleConfigChange('durationSeconds', parseInt(e.target.value))}
                disabled={simulator?.isRunning()}
              />
            </div>

            <div className="config-row">
              <label>Event Frequency (ms):</label>
              <input
                type="number"
                min="100"
                max="1000"
                step="50"
                value={config.eventFrequencyMs}
                onChange={(e) => handleConfigChange('eventFrequencyMs', parseInt(e.target.value))}
                disabled={simulator?.isRunning()}
              />
            </div>

            <div className="config-row">
              <label>Session Count:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={config.sessionCount}
                onChange={(e) => handleConfigChange('sessionCount', parseInt(e.target.value))}
                disabled={simulator?.isRunning()}
              />
            </div>
          </div>

          <div className="simulation-progress">
            <div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          {stats && (
            <div className="simulation-stats">
              <div className="stat-item">
                <div className="stat-label">Events Generated</div>
                <div className="stat-value">{stats.eventsGenerated}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Active Sessions</div>
                <div className="stat-value">{stats.activeSessionIds.length}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Tap Bursts</div>
                <div className="stat-value">{stats.eventsByType.tap_activity_burst}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Mega Slaps</div>
                <div className="stat-value">{stats.eventsByType.mega_slap_landed}</div>
              </div>
            </div>
          )}

          <button
            className="simulation-button"
            onClick={simulator?.isRunning() ? stopSimulation : startSimulation}
            disabled={false}
          >
            {simulator?.isRunning() ? (
              <>
                <Square size={20} />
                STOP SIMULATION
              </>
            ) : (
              <>
                <Play size={20} />
                START SIMULATION
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};