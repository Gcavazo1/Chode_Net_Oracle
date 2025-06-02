import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import './SystemStability.css';

interface SystemStabilityProps {
  status: 'Pristine' | 'Unstable' | 'Critical';
}

export const SystemStability: React.FC<SystemStabilityProps> = ({ status }) => {
  const [animateChange, setAnimateChange] = useState(false);

  useEffect(() => {
    setAnimateChange(true);
    const timer = setTimeout(() => setAnimateChange(false), 1000);
    return () => clearTimeout(timer);
  }, [status]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Critical':
        return {
          color: '#ff3131',
          label: 'CRITICAL',
          pulseClass: 'pulse-critical',
          icon: true
        };
      case 'Unstable':
        return {
          color: '#ffff00',
          label: 'UNSTABLE',
          pulseClass: 'pulse-warning',
          icon: true
        };
      default:
        return {
          color: '#39ff14',
          label: 'PRISTINE',
          pulseClass: 'pulse-stable',
          icon: false
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className="stability-container">
      <div className={`stability-indicator ${config.pulseClass} ${animateChange ? 'animate-change' : ''}`}>
        <div 
          className="stability-bar"
          style={{ 
            backgroundColor: config.color,
            boxShadow: `0 0 20px ${config.color}`
          }}
        />
        <div className="stability-status" style={{ color: config.color }}>
          {config.icon && (
            <AlertTriangle className="warning-icon" size={24} />
          )}
          <span>{config.label}</span>
        </div>
      </div>
    </div>
  );
};