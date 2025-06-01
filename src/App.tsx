import React, { useState, useEffect, useRef } from 'react';
import { Monitor } from 'lucide-react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { ProphecyChamber } from './components/ProphecyChamber/ProphecyChamber';
import { ApocryphalScrolls } from './components/ApocryphalScrolls/ApocryphalScrolls';
import { RitualRequests } from './components/RitualRequests/RitualRequests';
import { DeveloperPanel } from './components/DeveloperPanel/DeveloperPanel';
import { DebugPanel } from './components/DebugPanel/DebugPanel';
import { setupGameEventListener } from './lib/gameEventHandler';
import './App.css';

export type StabilityStatus = 'STABLE' | 'UNSTABLE' | 'CRITICAL_CORRUPTION';

type GameMessage = {
  action: 'show_oracle_prophecy' | 'show_oracle_scrolls' | 'show_ritual_requests';
};

type UnreadCountMessage = {
  event: 'oracle_update_unread_count';
  count: number;
};

function App() {
  const [currentView, setCurrentView] = useState<'prophecy' | 'scrolls' | 'ritual'>('prophecy');
  const [girthResonance, setGirthResonance] = useState(42);
  const [tapSurgeIndex, setTapSurgeIndex] = useState(1);
  const [legionMorale, setLegionMorale] = useState(65);
  const [stabilityStatus, setStabilityStatus] = useState<StabilityStatus>('STABLE');
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [showDevPanel, setShowDevPanel] = useState(false);
  
  const gameIframeRef = useRef<HTMLIFrameElement>(null);

  // Set up game event listener
  useEffect(() => {
    const cleanup = setupGameEventListener();
    return cleanup;
  }, []);

  // Listen for messages from the game iframe
  useEffect(() => {
    const handleGameMessage = (event: MessageEvent) => {
      // Validate message origin if needed
      // if (event.origin !== "expected-origin") return;
      
      const message = event.data as GameMessage;
      
      switch (message.action) {
        case 'show_oracle_prophecy':
          setCurrentView('prophecy');
          break;
        case 'show_oracle_scrolls':
          setCurrentView('scrolls');
          break;
        case 'show_ritual_requests':
          setCurrentView('ritual');
          break;
      }
    };

    window.addEventListener('message', handleGameMessage);
    return () => window.removeEventListener('message', handleGameMessage);
  }, []);

  // Function to update unread counter in game
  const updateGameUnreadCounter = (count: number) => {
    if (gameIframeRef.current?.contentWindow) {
      const message: UnreadCountMessage = {
        event: 'oracle_update_unread_count',
        count: count
      };
      gameIframeRef.current.contentWindow.postMessage(message, '*');
    }
  };

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
                  onProphecyReceived={() => {
                    setCurrentTopic(null);
                    // Increment unread counter when new prophecy is received
                    updateGameUnreadCounter(1);
                  }}
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
              ref={gameIframeRef}
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

      <DebugPanel />
    </div>
  );
}

export default App;