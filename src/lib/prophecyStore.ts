import { create } from 'zustand';
import { supabase } from './supabase';

export interface Prophecy {
  id: string;
  created_at: string;
  prophecy_text: string;
  corruption_level: 'none' | 'glitched' | 'cryptic' | 'hostile_fragment';
  source_metrics_snapshot?: Record<string, any>;
}

interface ProphecyStore {
  prophecies: Prophecy[];
  latestProphecy: Prophecy | null;
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
  setupRealtimeSubscription: () => Promise<void>;
  resetUnreadCount: () => void;
  incrementUnreadCount: () => void;
}

export const useProphecyStore = create<ProphecyStore>((set, get) => ({
  prophecies: [],
  latestProphecy: null,
  isLoading: true,
  error: null,
  unreadCount: 0,

  setupRealtimeSubscription: async () => {
    try {
      console.log('ProphecyStore: Initializing Supabase real-time subscription');
      
      // Initial fetch of recent prophecies
      const { data: initialProphecies, error: fetchError } = await supabase
        .from('apocryphal_scrolls')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (fetchError) throw fetchError;

      console.log('ProphecyStore: Initial prophecies loaded:', initialProphecies?.length);

      set({
        prophecies: initialProphecies || [],
        latestProphecy: initialProphecies?.[0] || null,
        isLoading: false
      });

      // Setup realtime subscription
      const subscription = supabase
        .channel('prophecy-updates')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'apocryphal_scrolls'
          },
          (payload) => {
            console.log('ProphecyStore: New prophecy received:', payload.new);
            
            const newProphecy = payload.new as Prophecy;
            set((state) => ({
              prophecies: [newProphecy, ...state.prophecies],
              latestProphecy: newProphecy
            }));
            get().incrementUnreadCount();

            // Notify game iframe
            window.postMessage(
              { 
                event: 'oracle_update_unread_count',
                unreadCount: get().unreadCount 
              },
              '*'
            );
            console.log('ProphecyStore: Game notification sent, unread count:', get().unreadCount);
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
        console.log('ProphecyStore: Subscription cleanup performed');
      };
    } catch (error) {
      console.error('ProphecyStore: Error in subscription setup:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      });
    }
  },

  resetUnreadCount: () => set({ unreadCount: 0 }),
  incrementUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount + 1 }))
}));