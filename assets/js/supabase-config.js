// assets/js/supabase-config.js

const SB_URL = 'https://uqdwtzlkqaosnweyoyit.supabase.co';
const SB_KEY = 'sb_publishable_uafBQD1aJ3w8_eq4meOsNQ_wzk8TwhA';

// Cria a conexão global 'sb' que os outros arquivos vão usar
const sb = supabase.createClient(SB_URL, SB_KEY);

console.log("Supabase Conectado com sucesso!");
