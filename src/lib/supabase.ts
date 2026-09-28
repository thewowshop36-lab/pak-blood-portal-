import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://mvqnekaobsyreegkouca.supabase.co";
const SUPABASE_KEY = "sb_publishable_WuDQresEEX_duONM1RwKbg_zVYtxoV0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
