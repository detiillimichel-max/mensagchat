// assets/js/app.js
let meuNome = localStorage.getItem('vibe_user') || 'Visitante';

async function enviar() {
  const input = document.getElementById('msgInput');
  const texto = input.value.trim();
  if (!texto) return;

  // 1. Cifrar mensagem (E2E)
  const textoCifrado = await cifrar(texto);

  // 2. Enviar para o Supabase
  const { error } = await dbMsg.insert([
    { author: meuNome, content: textoCifrado, chat_room: 'Geral' }
  ]);

  if (!error) {
    input.value = '';
    toast("➤ Enviada");
  }
}

// Escuta em tempo real do Supabase
sb.channel('public:messages')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
    renderizarMensagem(payload.new);
  })
  .subscribe();

async function renderizarMensagem(m) {
  const container = document.getElementById('mensagens');
  const textoDecifrado = await decifrar(m.content);
  
  const div = document.createElement('div');
  div.className = `mw ${m.author === meuNome ? 'me' : 'them'}`;
  div.innerHTML = `
    <div class="bub">
      <div class="bub-txt">${textoDecifrado}</div>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// Inicialização ao carregar
document.addEventListener('DOMContentLoaded', () => {
  gerarChavesE2E();
  // Outras funções de boot...
});
