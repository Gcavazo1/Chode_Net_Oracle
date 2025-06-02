import React from 'react';
import { Scroll, Sparkles } from 'lucide-react';
import { type RitualTopic } from '../../lib/types';
import './RitualRequests.css';

interface RitualRequestsProps {
  currentTopic: RitualTopic | null;
  onTopicSelect: (topic: RitualTopic | null) => void;
}

const RITUAL_TOPICS: Array<{
  id: RitualTopic;
  text: string;
  description: string;
}> = [
  {
    id: 'FUTURE_OF_GIRTH',
    text: 'Future of $GIRTH',
    description: 'Oracle, reveal the secrets of the Future of $GIRTH!'
  },
  {
    id: 'ANCIENT_TECHNIQUES',
    text: 'Ancient Techniques',
    description: 'Oracle, speak of the Ancient Chodes and their Lost Slapping Techniques!'
  },
  {
    id: 'MEME_COINS',
    text: 'Meme Prophecies',
    description: 'Oracle, what omens do the Next Meme Coins carry?'
  },
  {
    id: 'FUD_STORMS',
    text: 'FUD Warnings',
    description: 'Oracle, warn us of the Coming FUD Storms!'
  }
];

export const RitualRequests: React.FC<RitualRequestsProps> = ({
  currentTopic,
  onTopicSelect,
}) => {
  const handleTopicClick = (topicId: RitualTopic) => {
    onTopicSelect(currentTopic === topicId ? null : topicId);
  };

  return (
    <div className="ritual-requests">
      <div className="ritual-header">
        <Scroll className="ritual-icon" size={24} />
        <h2>SEEK SPECIFIC WISDOM</h2>
        <Scroll className="ritual-icon" size={24} />
      </div>

      <div className="ritual-topics">
        {RITUAL_TOPICS.map((topic) => (
          <button
            key={topic.id}
            className={`ritual-button ${currentTopic === topic.id ? 'active' : ''}`}
            onClick={() => handleTopicClick(topic.id)}
            aria-pressed={currentTopic === topic.id}
            style={{ 
              width: '200px',
              height: '60px'
            }}
          >
            <Sparkles className="button-icon" size={16} />
            <div className="button-content">
              <span className="button-title">{topic.text}</span>
              <span className="button-description">{topic.description}</span>
            </div>
            <Sparkles className="button-icon" size={16} />
          </button>
        ))}
      </div>

      {currentTopic && (
        <div className="ritual-status">
          <span className="status-label">DIVINING:</span>
          <span className="status-topic">
            {RITUAL_TOPICS.find(t => t.id === currentTopic)?.description}
          </span>
        </div>
      )}
    </div>
  );
};