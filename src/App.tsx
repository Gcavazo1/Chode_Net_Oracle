import React from 'react';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Monitor as MonitorHeart } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <MonitorHeart size={32} color="#ff00ff" />
          <span>CHODE-NET</span>
        </div>
        <div className="header-status">ORACLE P0 TERMINAL</div>
      </header>
      
      <main className="app-main">
        <Dashboard />
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