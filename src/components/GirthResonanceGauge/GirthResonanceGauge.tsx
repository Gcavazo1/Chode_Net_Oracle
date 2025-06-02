import React, { useEffect, useRef } from 'react';
import './GirthResonanceGauge.css';

interface GirthResonanceGaugeProps {
  value: number;
}

export const GirthResonanceGauge: React.FC<GirthResonanceGaugeProps> = ({ value }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    const size = 220;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, size, size);
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;
    
    // Draw outer ring with improved depth
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 12, 0, Math.PI * 2);
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 24;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = 20;
    ctx.stroke();
    
    // Define precise gauge angles (200-degree sweep for better readability)
    const startAngle = Math.PI * 0.85;  // -153 degrees
    const endAngle = Math.PI * 2.15;    // +153 degrees
    const angleRange = endAngle - startAngle;
    
    // Draw gauge zones with improved gradients
    const drawGaugeZone = (start: number, end: number, color: string) => {
      const gradient = ctx.createLinearGradient(
        centerX + Math.cos(start) * radius,
        centerY + Math.sin(start) * radius,
        centerX + Math.cos(end) * radius,
        centerY + Math.sin(end) * radius
      );
      
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, color);
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, start, end);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 15;
      ctx.lineCap = 'butt';
      ctx.stroke();
    };
    
    // Draw zones with precise boundaries
    drawGaugeZone(startAngle, startAngle + angleRange * 0.25, 'rgba(255, 49, 49, 0.7)');
    drawGaugeZone(startAngle + angleRange * 0.25, startAngle + angleRange * 0.5, 'rgba(255, 165, 0, 0.7)');
    drawGaugeZone(startAngle + angleRange * 0.5, startAngle + angleRange * 0.75, 'rgba(255, 210, 0, 0.7)');
    drawGaugeZone(startAngle + angleRange * 0.75, endAngle, 'rgba(57, 255, 20, 0.7)');
    
    // Calculate precise needle angle
    const valueAngle = startAngle + (angleRange * (Math.min(Math.max(value, 0), 100) / 100));
    
    // Draw value arc with improved visual feedback
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, valueAngle);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.stroke();
    
    // Enhanced glow effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, valueAngle);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.5)';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.filter = 'blur(8px)';
    ctx.stroke();
    ctx.filter = 'none';
    
    // Draw calibrated needle
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(valueAngle);
    
    // Enhanced needle base
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
    gradient.addColorStop(0, '#00f0ff');
    gradient.addColorStop(1, 'rgba(0, 240, 255, 0.6)');
    
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Improved needle shadow
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Calibrated needle pointer
    ctx.beginPath();
    ctx.moveTo(-4, 0);
    ctx.lineTo(0, -radius - 12);
    ctx.lineTo(4, 0);
    ctx.fillStyle = '#00f0ff';
    ctx.fill();
    
    ctx.restore();
    
    // Draw precise value text
    ctx.font = 'bold 32px "Share Tech Mono", monospace';
    ctx.fillStyle = '#00f0ff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 8;
    ctx.fillText(`${value.toFixed(1)}%`, centerX, centerY + 60);
    ctx.shadowBlur = 0;
    
    // Draw calibrated tick marks
    const drawTicks = () => {
      const majorTickCount = 10;
      const minorTickCount = 50;
      
      // Draw minor ticks
      for (let i = 0; i <= minorTickCount; i++) {
        const tickAngle = startAngle + (angleRange * (i / minorTickCount));
        const tickLength = i % 5 === 0 ? 15 : 8;
        const tickStartRadius = radius + 15;
        const tickEndRadius = tickStartRadius - tickLength;
        
        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(tickAngle) * tickStartRadius,
          centerY + Math.sin(tickAngle) * tickStartRadius
        );
        ctx.lineTo(
          centerX + Math.cos(tickAngle) * tickEndRadius,
          centerY + Math.sin(tickAngle) * tickEndRadius
        );
        ctx.strokeStyle = i % 5 === 0 ? '#666' : '#444';
        ctx.lineWidth = i % 5 === 0 ? 2 : 1;
        ctx.stroke();
      }
      
      // Draw major tick labels
      for (let i = 0; i <= majorTickCount; i++) {
        const tickAngle = startAngle + (angleRange * (i / majorTickCount));
        const labelRadius = radius + 35;
        const labelValue = i * 10;
        
        ctx.font = '12px "Share Tech Mono", monospace';
        ctx.fillStyle = '#888';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const labelX = centerX + Math.cos(tickAngle) * labelRadius;
        const labelY = centerY + Math.sin(tickAngle) * labelRadius;
        
        // Rotate labels for better readability
        ctx.save();
        ctx.translate(labelX, labelY);
        ctx.rotate(tickAngle + Math.PI / 2);
        ctx.fillText(labelValue.toString(), 0, 0);
        ctx.restore();
      }
    };
    
    drawTicks();
    
  }, [value]);
  
  return (
    <div className="girth-gauge-container">
      <canvas ref={canvasRef} className="girth-gauge"></canvas>
    </div>
  );
};