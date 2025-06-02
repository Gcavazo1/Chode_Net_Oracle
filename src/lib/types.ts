export type StabilityStatus = 'Pristine' | 'Unstable' | 'Critical';

export type RitualTopic = 'FUTURE_OF_GIRTH' | 'ANCIENT_TECHNIQUES' | 'MEME_COINS' | 'FUD_STORMS';

export interface GirthIndexValues {
  id: number;
  last_updated: string;
  divine_girth_resonance: number;
  tap_surge_index: string;
  legion_morale: string;
  oracle_stability_status: string;
}

export const TAP_SURGE_STATES = {
  'Flaccid Drizzle': { color: '#39ff14', label: 'FLACCID DRIZZLE' },
  'Steady Pounding': { color: '#ffff00', label: 'STEADY POUNDING' },
  'Frenzied Slapping': { color: '#ff9900', label: 'FRENZIED SLAPPING' },
  'Giga-Surge': { color: '#ff3131', label: 'GIGA-SURGE' }
} as const;

export const LEGION_MORALE_STATES = [
  'On Suicide Watch',
  'Cautiously Optimistic',
  'Ascended and Engorged'
] as const;

export type TapSurgeState = keyof typeof TAP_SURGE_STATES;
export type LegionMoraleState = typeof LEGION_MORALE_STATES[number];

export interface CorruptionState {
  level: 'none' | 'glitched' | 'cryptic' | 'hostile_fragment';
  color: string;
  effect: string;
}

export const CORRUPTION_STATES: Record<StabilityStatus, CorruptionState> = {
  'Pristine': {
    level: 'none',
    color: '#00FF00',
    effect: 'none'
  },
  'Unstable': {
    level: 'cryptic',
    color: '#FFFF00',
    effect: 'blur'
  },
  'Critical': {
    level: 'hostile_fragment',
    color: '#FF0000',
    effect: 'glitch'
  }
};