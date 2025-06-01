import { create } from 'zustand';
import { supabase } from './supabase';
import { GirthIndexValues, StabilityStatus, TAP_SURGE_STATES } from './types';

interface GirthIndexStore {
  girthResonance: number;
  tapSurgeIndex: number;
  legionMorale: number;
  stabilityStatus: StabilityStatus;
  isLoading: boolean;
  error: string | null;
  setupRealtimeSubscription: () => Promise<void>;
  updateMetrics: (metrics: Partial<{
    girthResonance: number;
    tapSurgeIndex: number;
    legionMorale: number;
    stabilityStatus: StabilityStatus;
  }>) => Promise<void>;
}

export const useGirthIndexStore = create<GirthIndexStore>((set, get) => ({
  girthResonance: 50,
  tapSurgeIndex: 1,
  legionMorale: 65,
  stabilityStatus: 'STABLE',
  isLoading: true,
  error: null,

  setupRealtimeSubscription: async () => {
    try {
      // Initial fetch
      const { data, error } = await supabase
        .from('girth_index_current_values')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) throw error;

      if (data) {
        set({
          girthResonance: data.divine_girth_resonance,
          tapSurgeIndex: Math.max(0, TAP_SURGE_STATES.indexOf(data.tap_surge_index)),
          legionMorale: parseInt(data.legion_morale),
          stabilityStatus: data.oracle_stability_status as StabilityStatus,
          isLoading: false
        });
      }

      // Setup realtime subscription
      const subscription = supabase
        .channel('girth-index-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'girth_index_current_values',
            filter: 'id=eq.1'
          },
          (payload) => {
            const newData = payload.new as GirthIndexValues;
            set({
              girthResonance: newData.divine_girth_resonance,
              tapSurgeIndex: Math.max(0, TAP_SURGE_STATES.indexOf(newData.tap_surge_index)),
              legionMorale: parseInt(newData.legion_morale),
              stabilityStatus: newData.oracle_stability_status as StabilityStatus
            });
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', isLoading: false });
    }
  },

  updateMetrics: async (metrics) => {
    try {
      const currentState = get();
      const updates = {
        divine_girth_resonance: metrics.girthResonance ?? currentState.girthResonance,
        tap_surge_index: TAP_SURGE_STATES[metrics.tapSurgeIndex ?? currentState.tapSurgeIndex],
        legion_morale: String(metrics.legionMorale ?? currentState.legionMorale),
        oracle_stability_status: metrics.stabilityStatus ?? currentState.stabilityStatus
      };

      // Update local state immediately for responsiveness
      set({ ...metrics });

      // Update via Edge Function
      const { error } = await supabase.functions.invoke('admin-update-girth-index', {
        body: updates
      });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to update metrics:', error);
      // Revert to previous state on error
      const { data } = await supabase
        .from('girth_index_current_values')
        .select('*')
        .eq('id', 1)
        .single();

      if (data) {
        set({
          girthResonance: data.divine_girth_resonance,
          tapSurgeIndex: Math.max(0, TAP_SURGE_STATES.indexOf(data.tap_surge_index)),
          legionMorale: parseInt(data.legion_morale),
          stabilityStatus: data.oracle_stability_status as StabilityStatus
        });
      }
    }
  }
}));