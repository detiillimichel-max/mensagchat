// assets/js/supabase-config.js
const SB_URL = 'https://uqdwtzlkqaosnweyoyit.supabase.co';
const SB_KEY = 'sb_publishable_uafBQD1aJ3w8_eq4meOsNQ_wzk8TwhA';

// Inicialização do cliente Supabase via CDN
const sb = supabase.createClient(SB_URL, SB_KEY);

// Referências globais para o sistema
const dbMsg = sb.from('messages');
const dbStatus = sb.from('presence');
const dbProds = sb.from('products');

