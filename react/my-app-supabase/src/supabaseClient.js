import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://anhqgbsmdojmnupbrusj.supabase.co'; // あなたのプロジェクトURL
const supabaseKey = 'sb_publishable_GcX4_d6PvjAhf2_g65H4VA_Mfj0L-FX';     // あなたのAPIキー
export const supabase = createClient(supabaseUrl, supabaseKey);