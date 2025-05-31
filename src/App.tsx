import React, { useState } from 'react';
import { Monitor } from 'lucide-react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProphecyChamber } from './components/ProphecyChamber/ProphecyChamber';
import { ApocryphalScrolls } from './components/ApocryphalScrolls/ApocryphalScrolls';
import { RitualRequests } from './components/RitualRequests/RitualRequests';
import { DeveloperPanel } from './components/DeveloperPanel/DeveloperPanel';
import './App.css';

export type StabilityStatus = 'STABLE' | 'UNSTABLE' | 'CRITICAL_CORRUPTION';

function App() {
  const [currentView, setCurrentView] = useState<'prophecy' | 'scrolls' | 'ritual'>('prophecy');
  const [girthResonance, setGirthResonance] = useState(42);
  const [tapSurgeIndex, setTapSurgeIndex] = useState(1);
  const [legionMorale, setLegionMorale] = useState(65);
  const [stabilityStatus, setStabilityStatus] = useState<StabilityStatus>('STABLE');
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [showDevPanel, setShowDevPanel] = useState(false);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <Monitor size={32} color="#ff00ff" />
          <span>CHODE-NET ORACLE</span>
        </div>
        <button 
          className="dev-panel-toggle"
          onClick={() => setShowDevPanel(!showDevPanel)}
        >
          {showDevPanel ? 'HIDE CONTROLS' : 'SHOW CONTROLS'}
        </button>
      </header>

      <main className="app-main">
        <div className="oracle-layout">
          <section className="top-panel">
            <div className="panel-controls">
              <button 
                className={currentView === 'prophecy' ? 'active' : ''} 
                onClick={() => setCurrentView('prophecy')}
              >
                PROPHECY CHAMBER
              </button>
              <button 
                className={currentView === 'scrolls' ? 'active' : ''} 
                onClick={() => setCurrentView('scrolls')}
              >
                APOCRYPHAL SCROLLS
              </button>
              <button 
                className={currentView === 'ritual' ? 'active' : ''} 
                onClick={() => setCurrentView('ritual')}
              >
                RITUAL REQUESTS
              </button>
            </div>

            <div className="panel-content">
              {currentView === 'prophecy' && (
                <ProphecyChamber 
                  girthResonance={girthResonance}
                  tapSurgeIndex={tapSurgeIndex}
                  legionMorale={legionMorale}
                  stabilityStatus={stabilityStatus}
                  currentTopic={currentTopic}
                  onProphecyReceived={() => setCurrentTopic(null)}
                />
              )}
              {currentView === 'scrolls' && <ApocryphalScrolls />}
              {currentView === 'ritual' && (
                <RitualRequests
                  currentTopic={currentTopic}
                  onTopicSelect={setCurrentTopic}
                />
              )}
            </div>
          </section>

          <section className="game-container">
            <iframe 
              src="about:blank" // Replace with actual game URL
              title="CHODE Tapper Game"
              className="game-frame"
            />
          </section>

          <section className="bottom-panel">
            <Dashboard 
              girthResonance={girthResonance}
              tapSurgeIndex={tapSurgeIndex}
              legionMorale={legionMorale}
              stabilityStatus={stabilityStatus}
            />
          </section>
        </div>

        {showDevPanel && (
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
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-text">
          CHODE-NET ORACLE v0.1 - AUTHORIZED ACCESS ONLY
        </div>
        <div className="footer-status">
          <div className="status-indicator"></div>
          SECURE CONNECTION ESTABLISHED
        </div>
      </footer>
    </div>
  );
}

export default App;