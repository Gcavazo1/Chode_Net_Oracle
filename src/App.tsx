import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProphecyChamber } from './components/ProphecyChamber/ProphecyChamber';
import { ApocryphalScrolls } from './components/ApocryphalScrolls/ApocryphalScrolls';
import { DeveloperPanel } from './components/DeveloperPanel/DeveloperPanel';
import './App.css';

function App() {
  const [showDevPanel, setShowDevPanel] = useState(false);
  const [girthResonance, setGirthResonance] = useState(42);
  const [tapSurgeIndex, setTapSurgeIndex] = useState(1);
  const [legionMorale, setLegionMorale] = useState(65);
  const [stabilityStatus, setStabilityStatus] = useState<'STABLE' | 'UNSTABLE' | 'CRITICAL_CORRUPTION'>('STABLE');

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">CHODE-NET ORACLE</h1>
        <button 
          className="dev-panel-toggle"
          onClick={() => setShowDevPanel(!showDevPanel)}
        >
          <Settings size={24} />
        </button>
      </header>

      <main className="main-content">
        <aside className="left-panel">
          <Dashboard 
            girthResonance={girthResonance}
            tapSurgeIndex={tapSurgeIndex}
            legionMorale={legionMorale}
            stabilityStatus={stabilityStatus}
          />
        </aside>

        <section className="center-panel">
          <div className="game-container">
            <iframe 
              src="about:blank" // Replace with actual game URL
              title="CHODE Tapper Game"
              className="game-frame"
            />
          </div>
        </section>

        <aside className="right-panel">
          <ProphecyChamber 
            girthResonance={girthResonance}
            tapSurgeIndex={tapSurgeIndex}
            legionMorale={legionMorale}
            stabilityStatus={stabilityStatus}
            currentTopic={null}
            onProphecyReceived={() => {}}
          />
          <ApocryphalScrolls />
        </aside>
      </main>

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

      <footer className="app-footer">
        <div className="footer-content">
          <span>CHODE-NET ORACLE v1.0</span>
          <a 
            href="https://stackblitz.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="built-on-bolt"
          >
            Built on Bolt
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;