import React from 'react';
import './GlitchyTitle.css';

interface GlitchyTitleProps {
  text: string;
  className?: string;
}

export function GlitchyTitle({ text, className = '' }: GlitchyTitleProps) {
  return (
    <div className={`glitchy-title-container ${className}`}>
      <h1 className="glitchy-title">
        <span aria-hidden="true">{text}</span>
        {text}
        <span aria-hidden="true">{text}</span>
      </h1>
    </div>
  );
}

export default GlitchyTitle;