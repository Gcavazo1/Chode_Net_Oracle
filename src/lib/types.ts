export type StabilityStatus = 'Pristine' | 'Unstable' | 'Critical';

export interface GirthIndexValues {
  id: number;
  last_updated: string;
  divine_girth_resonance: number;
  tap_surge_index: string;
  legion_morale: string;
  oracle_stability_status: string;
}

export const TAP_SURGE_STATES = [
  'Flaccid Drizzle',
  'Steady Pounding',
  'Frenzied Slapping',
  'Giga-Surge'
] as const;

export const LEGION_MORALE_STATES = [
  'On Suicide Watch',
  'Cautiously Optimistic',
  'Ascended and Engorged'
] as const;

export type TapSurgeState = typeof TAP_SURGE_STATES[number];
export type LegionMoraleState = typeof LEGION_MORALE_STATES[number];