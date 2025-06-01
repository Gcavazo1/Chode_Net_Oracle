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
  generateProphecy: (metrics: any, topic: string | null) => Promise<void>;
}

export const useProphecyStore = create<ProphecyStore>((set, get) => ({
  prophecies: [],
  latestProphecy: null,
  isLoading: true,
  error: null,
  unreadCount: 0,

  setupRealtimeSubscription: async () => {
    try {
      // Initial fetch of recent prophecies
      const { data: initialProphecies, error: fetchError } = await supabase
        .from('apocryphal_scrolls')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (fetchError) throw fetchError;

      set({
        prophecies: initialProphecies || [],
        latestProphecy: initialProphecies?.[0] || null,
        isLoading: false
      });

      // Setup realtime subscription
      const subscription = supabase
        .channel('prophecy-feed')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'apocryphal_scrolls'
          },
          (payload) => {
            const newProphecy = payload.new as Prophecy;
            
            set((state) => ({
              prophecies: [newProphecy, ...state.prophecies],
              latestProphecy: newProphecy
            }));

            // Increment unread count and notify game
            get().incrementUnreadCount();

            // Send message to game iframe
            const gameFrame = document.querySelector<HTMLIFrameElement>('.game-frame');
            if (gameFrame?.contentWindow) {
              gameFrame.contentWindow.postMessage({
                event: 'oracle_update_unread_count',
                count: get().unreadCount
              }, '*'); // Replace '*' with actual game origin in production
            }
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error',
        isLoading: false 
      });
    }
  },

  generateProphecy: async (metrics, topic) => {
    try {
      const { error } = await supabase.functions.invoke('oracle-prophecy-generator', {
        body: {
          metrics,
          ritual_request_topic: topic
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to generate prophecy:', error);
      throw error;
    }
  },

  resetUnreadCount: () => set({ unreadCount: 0 }),
  
  incrementUnreadCount: () => set((state) => ({ unreadCount: state.unreadCount + 1 }))
}));