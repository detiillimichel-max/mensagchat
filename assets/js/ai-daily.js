// assets/js/ai-daily.js

const GEMINI_API_KEY = "AIzaSyA3cNz026IdiXVV6f-aeNSxD6IFI8iULI4";

async function gerarDailyIA() {
    const container = document.getElementById('ia-response-container');
    
    // Verifica se o container existe na tela antes de continuar
    if (!container) {
        toast("❌ Área do Daily não encontrada");
        return;
    }
    
    toast("🪄 Vibe IA a analisar o Daily...");

    try {
        // 1. Procurar contexto no Supabase
        const { data: posts, error } = await sb.from('messages').select('content').limit(5);
        
        let contexto = "A família está tranquila hoje.";
        if (!error && posts && posts.length > 0) {
            contexto = posts.map(p => p.content).join(", ");
        }

        // 2. Chamada à API Gemini com a sua chave
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Com base nestas interações da família: "${contexto}", cria um resumo motivador e "premium" para o Daily de hoje em 2 frases.` }]
                }]
            })
        });

        const data = await response.json();
        
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error("Resposta vazia da API");
        }
        
        const textoIA = data.candidates[0].content.parts[0].text;

        // 3. Exibir com estilo Glassmorphism
        container.style.display = 'block';
        container.innerHTML = `
            <div class="ia-card">
                <div class="ia-badge" style="color: var(--g); font-size: 0.8rem; font-weight: 800; margin-bottom: 8px;">
                    <i class="fa-solid fa-sparkles"></i> INSIGHT IA
                </div>
                <p style="font-size: 0.95rem; line-height: 1.4; color: #fff;">${textoIA}</p>
                <button onclick="this.parentElement.parentElement.style.display='none'" style="margin-top: 12px; background: var(--card); border: 1px solid var(--bdr); color: #fff; padding: 8px 15px; border-radius: 8px; font-weight: 600; width: 100%;">Fechar Insight</button>
            </div>
        `;

    } catch (error) {
        console.error("Erro na IA:", error);
        toast("❌ Erro ao conectar com Vibe IA");
    }
}
