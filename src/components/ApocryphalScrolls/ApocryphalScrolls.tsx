import React, { useEffect, useRef, useState } from 'react';
import { Scroll, AlertTriangle } from 'lucide-react';
import { useProphecyStore } from '../../lib/prophecyStore';
import { PixelBorder, PixelText, PixelDivider } from '../PixelArt/PixelBorder';
import './ApocryphalScrolls.css';

export const ApocryphalScrolls: React.FC = () => {
  const { prophecies, isLoading, error, setupRealtimeSubscription } = useProphecyStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [newProphecyIds, setNewProphecyIds] = useState<Set<string>>(new Set());
  const previousPropheciesLength = useRef(prophecies.length);

  useEffect(() => {
    setupRealtimeSubscription();
  }, [setupRealtimeSubscription]);

  useEffect(() => {
    if (prophecies.length > previousPropheciesLength.current) {
      const newIds = new Set(newProphecyIds);
      newIds.add(prophecies[0].id);
      setNewProphecyIds(newIds);

      // Clear highlight after animation
      setTimeout(() => {
        setNewProphecyIds(prev => {
          const updated = new Set(prev);
          updated.delete(prophecies[0].id);
          return updated;
        });
      }, 3000);

      // Smooth scroll to top if user is already at top
      if (scrollContainerRef.current) {
        const { scrollTop } = scrollContainerRef.current;
        if (scrollTop < 50) { // User is near top
          scrollContainerRef.current.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      }
    }
    previousPropheciesLength.current = prophecies.length;
  }, [prophecies]);

  if (isLoading) {
    return (
      <div className="apocryphal-scrolls">
        <div className="scrolls-header">
          <Scroll className="header-icon" size={24} />
          <h2><PixelText>LOADING SACRED ARCHIVES...</PixelText></h2>
          <Scroll className="header-icon" size={24} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="apocryphal-scrolls">
        <div className="scrolls-header">
          <AlertTriangle className="header-icon" size={24} />
          <h2><PixelText>ARCHIVE ACCESS ERROR</PixelText></h2>
          <AlertTriangle className="header-icon" size={24} />
        </div>
        <div className="scrolls-error">{error}</div>
      </div>
    );
  }

  if (!prophecies.length) {
    return (
      <div className="apocryphal-scrolls">
        <div className="scrolls-header">
          <Scroll className="header-icon" size={24} />
          <h2><PixelText>SACRED ARCHIVES</PixelText></h2>
          <Scroll className="header-icon" size={24} />
        </div>
        <div className="scrolls-empty">
          No prophecies have been recorded yet...
        </div>
      </div>
    );
  }

  return (
    <div className="apocryphal-scrolls">
      <div className="scrolls-header">
        <Scroll className="scroll-icon" size={24} />
        <h2><PixelText>SACRED ARCHIVES</PixelText></h2>
        <Scroll className="scroll-icon" size={24} />
      </div>

      <div className="scrolls-container" ref={scrollContainerRef}>
        {prophecies.map((prophecy, index) => {
          const isCorrupted = prophecy.corruption_level !== 'none';
          const isNew = newProphecyIds.has(prophecy.id);
          
          return (
            <React.Fragment key={prophecy.id}>
              <PixelBorder 
                isCorrupted={isCorrupted}
                className={`prophecy-entry ${isNew ? 'new-entry highlight' : ''}`}
                style={{
                  '--corruption-color': getCorruptionColor(prophecy.corruption_level)
                } as React.CSSProperties}
              >
                <div className="prophecy-timestamp">
                  <span>{new Date(prophecy.created_at).toLocaleString()}</span>
                  {prophecy.corruption_level !== 'none' && (
                    <div className="corruption-indicator" title={`Corruption Level: ${prophecy.corruption_level}`}>
                      <AlertTriangle size={16} />
                    </div>
                  )}
                </div>
                <div className="prophecy-content">
                  {prophecy.prophecy_text}
                </div>
              </PixelBorder>
              {index < prophecies.length - 1 && <PixelDivider />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const getCorruptionColor = (level: string) => {
  switch (level) {
    case 'glitched': return '#00f0ff';
    case 'cryptic': return '#8a2be2';
    case 'hostile_fragment': return '#ff3131';
    default: return '#39ff14';
  }
};