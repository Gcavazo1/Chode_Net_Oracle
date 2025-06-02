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
    console.log('ApocryphalScrolls: Setting up subscription');
    setupRealtimeSubscription();
  }, [setupRealtimeSubscription]);

  useEffect(() => {
    console.log('ApocryphalScrolls: Rendering with prophecies:', prophecies.length);
    
    if (prophecies.length > previousPropheciesLength.current) {
      const newIds = new Set(newProphecyIds);
      newIds.add(prophecies[0].id);
      setNewProphecyIds(newIds);

      setTimeout(() => {
        setNewProphecyIds(prev => {
          const updated = new Set(prev);
          updated.delete(prophecies[0].id);
          return updated;
        });
      }, 3000);

      if (scrollContainerRef.current?.scrollTop ?? 0 < 50) {
        scrollContainerRef.current?.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
    previousPropheciesLength.current = prophecies.length;
  }, [prophecies]);

  if (isLoading) {
    return (
      <div className="apocryphal-scrolls">
        <div className="scrolls-header">
          <Scroll className="header-icon\" size={24} />
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

  return (
    <div className="apocryphal-scrolls">
      <div className="scrolls-header">
        <Scroll className="header-icon" size={24} />
        <h2><PixelText>SACRED ARCHIVES</PixelText></h2>
        <Scroll className="header-icon" size={24} />
      </div>

      <div className="scrolls-container" ref={scrollContainerRef}>
        {prophecies.map((prophecy, index) => (
          <React.Fragment key={prophecy.id}>
            <PixelBorder 
              isCorrupted={prophecy.corruption_level !== 'none'}
              className={`prophecy-entry ${newProphecyIds.has(prophecy.id) ? 'new-entry highlight' : ''}`}
            >
              <div className="prophecy-timestamp">
                {new Date(prophecy.created_at).toLocaleString()}
              </div>
              <div className="prophecy-content">
                {prophecy.prophecy_text}
              </div>
            </PixelBorder>
            {index < prophecies.length - 1 && <PixelDivider />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};