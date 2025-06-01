import { serve } from 'https://deno.fresh.dev/std@v9.6.2/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

interface GirthIndexUpdate {
  divine_girth_resonance: number;
  tap_surge_index: string;
  legion_morale: string;
  oracle_stability_status: string;
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    // Initialize Supabase client with admin privileges
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Parse request body
    const updates: GirthIndexUpdate = await req.json();

    // Validate input
    if (!updates || typeof updates !== 'object') {
      throw new Error('Invalid request body');
    }

    // Update the single row in girth_index_current_values
    const { error } = await supabaseClient
      .from('girth_index_current_values')
      .update({
        divine_girth_resonance: updates.divine_girth_resonance,
        tap_surge_index: updates.tap_surge_index,
        legion_morale: updates.legion_morale,
        oracle_stability_status: updates.oracle_stability_status,
        last_updated: new Date().toISOString()
      })
      .eq('id', 1);

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
});