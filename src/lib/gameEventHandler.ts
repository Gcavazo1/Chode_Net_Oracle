import { supabase } from './supabase';

export interface GameEvent {
  event_type: string;
  session_id: string;
  event_payload?: Record<string, unknown>;
}

/**
 * Forwards a game event to the Supabase Edge Function
 */
async function forwardEventToSupabase(gameEventData: GameEvent): Promise<void> {
  try {
    const { data, error } = await supabase.functions.invoke('ingest-chode-event', {
      body: gameEventData
    });

    if (error) {
      console.error('Oracle Page: Error forwarding event to Supabase:', error.message);
      return;
    }

    console.log('Oracle Page: Event successfully forwarded to Supabase:', gameEventData.event_type);
  } catch (error) {
    console.error('Oracle Page: Failed to forward event:', error);
  }
}

/**
 * Validates the structure of a game event
 */
function isValidGameEvent(data: unknown): data is GameEvent {
  if (!data || typeof data !== 'object') return false;

  const event = data as Partial<GameEvent>;
  
  return (
    typeof event.event_type === 'string' &&
    typeof event.session_id === 'string' &&
    (event.event_payload === undefined || typeof event.event_payload === 'object')
  );
}

/**
 * Handles incoming game events from the iframe
 */
export function receiveGameEvent(event: MessageEvent): void {
  // TODO: Replace with actual game origin when deployed
  const ALLOWED_ORIGINS = [
    'http://localhost:5173', // Local development
    'http://localhost:3000',
    'https://chode-tapper-demo.netlify.app' // Example production URL
  ];

  // Verify origin
  if (!ALLOWED_ORIGINS.includes(event.origin)) {
    console.warn('Oracle Page: Received message from unauthorized origin:', event.origin);
    return;
  }

  // Parse and validate event data
  let parsedData: unknown;
  try {
    parsedData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
  } catch (error) {
    console.error('Oracle Page: Failed to parse game event:', error);
    return;
  }

  // Validate event structure
  if (!isValidGameEvent(parsedData)) {
    console.warn('Oracle Page: Invalid game event structure:', parsedData);
    return;
  }

  console.log('Oracle Page: Received game event from iframe:', parsedData);

  // Forward valid event to Supabase
  forwardEventToSupabase(parsedData);
}

/**
 * Sets up the game event listener
 */
export function setupGameEventListener(): () => void {
  const handler = (event: MessageEvent) => receiveGameEvent(event);
  window.addEventListener('message', handler, false);
  
  // Return cleanup function
  return () => window.removeEventListener('message', handler, false);
}