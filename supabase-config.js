// ============================================================
//  SkinAI — Supabase Configuration
//  1. Go to https://supabase.com → your project → Project Settings → API
//  2. Copy "Project URL" and paste below as SUPABASE_URL
//  3. Copy "anon / public" key and paste below as SUPABASE_ANON_KEY
// ============================================================

const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';   // e.g. https://xyzxyz.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';  // starts with eyJ...

// Create and expose the global Supabase client
const { createClient } = supabase;          // 'supabase' comes from the CDN script
window._supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
