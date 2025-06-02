import { create } from 'zustand';
import { supabase } from './supabase';
import { GirthIndexValues, StabilityStatus, TAP_SURGE_STATES, LEGION_MORALE_STATES } from './types';

interface GirthIndexStore {
  girthResonance: number;
  tapSurgeIndex: string;
  legionMorale: string;
  stabilityStatus: StabilityStatus;
  lastUpdated: string;
  isSimulated: boolean;
  isLoading: boolean;
  error: string | null;
  setupRealtimeSubscription: () => Promise<void>;
  updateMetrics: (metrics: Partial<{
    girthResonance: number;
    tapSurgeIndex: string;
    legionMorale: string;
    stabilityStatus: StabilityStatus;
  }>) => Promise<void>;
}

export const useGirthIndexStore = create<GirthIndexStore>((set, get) => ({
  girthResonance: 50,
  tapSurgeIndex: 'Steady Pounding',
  legionMorale: 'Cautiously Optimistic',
  stabilityStatus: 'Pristine',
  lastUpdated: new Date().toISOString(),
  isSimulated: true,
  isLoading: true,
  error: null,

  setupRealtimeSubscription: async () => {
    try {
      console.log('GirthIndexStore: Setting up realtime subscription...');
      
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
          tapSurgeIndex: data.tap_surge_index,
          legionMorale: data.legion_morale,
          stabilityStatus: data.oracle_stability_status as StabilityStatus,
          lastUpdated: data.last_updated,
          isSimulated: false,
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
              tapSurgeIndex: newData.tap_surge_index,
              legionMorale: newData.legion_morale,
              stabilityStatus: newData.oracle_stability_status as StabilityStatus,
              lastUpdated: newData.last_updated,
              isSimulated: false
            });
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error('GirthIndexStore: Error in subscription setup:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      });
    }
  },

  updateMetrics: async (metrics) => {
    try {
      const currentState = get();
      const updates = {
        divine_girth_resonance: metrics.girthResonance ?? currentState.girthResonance,
        tap_surge_index: metrics.tapSurgeIndex ?? currentState.tapSurgeIndex,
        legion_morale: metrics.legionMorale ?? currentState.legionMorale,
        oracle_stability_status: metrics.stabilityStatus ?? currentState.stabilityStatus
      };

      console.log('GirthIndexStore: Sending metrics update to Edge Function:', updates);

      // Update local state immediately for responsiveness
      set({ 
        ...metrics,
        lastUpdated: new Date().toISOString(),
        isSimulated: true 
      });

      const response = await fetch('https://errgidlsmozmfnsoyxvw.supabase.co/functions/v1/admin-update-girth-index', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Edge Function error: ${errorData.message || response.statusText}`);
      }

      const responseData = await response.json();
      console.log('GirthIndexStore: Metrics update successful:', responseData);

    } catch (error) {
      console.error('GirthIndexStore: Error updating metrics:', error);
      
      // Revert to previous state on error
      const { data } = await supabase
        .from('girth_index_current_values')
        .select('*')
        .eq('id', 1)
        .single();

      if (data) {
        set({
          girthResonance: data.divine_girth_resonance,
          tapSurgeIndex: data.tap_surge_index,
          legionMorale: data.legion_morale,
          stabilityStatus: data.oracle_stability_status as StabilityStatus,
          lastUpdated: data.last_updated,
          isSimulated: false
        });
      }
    }
  }
}));