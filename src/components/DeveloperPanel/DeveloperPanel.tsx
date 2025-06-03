import React from 'react';

interface DeveloperPanelProps {
  girthResonance: number;
  tapSurgeIndex: string;
  legionMorale: string;
  stabilityStatus: string;
  onGirthChange: (value: number) => void;
  onTapSurgeChange: (value: string) => void;
  onMoraleChange: (value: string) => void;
  onStabilityChange: (value: string) => void;
}

export function DeveloperPanel({
  girthResonance,
  tapSurgeIndex,
  legionMorale,
  stabilityStatus,
  onGirthChange,
  onTapSurgeChange,
  onMoraleChange,
  onStabilityChange
}: DeveloperPanelProps) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Developer Controls</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-white mb-2">Divine Girth Resonance</label>
          <input
            type="range"
            min="0"
            max="100"
            value={girthResonance}
            onChange={(e) => onGirthChange(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-white">{girthResonance}</span>
        </div>

        <div>
          <label className="block text-white mb-2">Tap Surge Index</label>
          <select
            value={tapSurgeIndex}
            onChange={(e) => onTapSurgeChange(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="Steady Pounding">Steady Pounding</option>
            <option value="Rising Tension">Rising Tension</option>
            <option value="Peak Throbbing">Peak Throbbing</option>
            <option value="Post-Surge Clarity">Post-Surge Clarity</option>
          </select>
        </div>

        <div>
          <label className="block text-white mb-2">Legion Morale</label>
          <select
            value={legionMorale}
            onChange={(e) => onMoraleChange(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="Cautiously Optimistic">Cautiously Optimistic</option>
            <option value="Absolutely Pumped">Absolutely Pumped</option>
            <option value="Slightly Concerned">Slightly Concerned</option>
            <option value="Total Despair">Total Despair</option>
          </select>
        </div>

        <div>
          <label className="block text-white mb-2">Oracle Stability</label>
          <select
            value={stabilityStatus}
            onChange={(e) => onStabilityChange(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="Pristine">Pristine</option>
            <option value="Slightly Corrupted">Slightly Corrupted</option>
            <option value="Heavily Corrupted">Heavily Corrupted</option>
            <option value="Complete Chaos">Complete Chaos</option>
          </select>
        </div>
      </div>
    </div>
  );
}