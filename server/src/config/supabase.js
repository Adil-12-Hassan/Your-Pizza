// Service-role client: bypasses RLS. Server-side only, never expose to the browser.
import { createClient } from '@supabase/supabase-js';
import { config } from './env.js';

export const supabase = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
