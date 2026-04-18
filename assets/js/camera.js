// assets/js/camera.js

// 1. Abrir a câmara nativa para fotos ou vídeos
function abrirCamera() {
  // Dispara o input de média configurado no index.html
  document.getElementById('midiaInput').click();
}

// 2. Função para postar um Story
function postarStory() {
  document.getElementById('videoInput').click();
}

// 3. Processamento de Upload para o Supabase
async function handleMediaUpload(input, folder) {
  const file = input.files[0];
  if (!file) return;

  toast("📤 A enviar média...");
  
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}_${meuNome}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Upload para o bucket 'chat-media' que criámos no Supabase
    const { data, error } = await sb.storage
      .from('chat-media')
      .upload(filePath, file);

    if (error) throw error;

    // Obter a URL pública do ficheiro
    const { data: { publicUrl } } = sb.storage
      .from('chat-media')
      .getPublicUrl(filePath);

    if (folder === 'stories') {
      // Grava o registo na tabela de stories para expirar em 24h
      await sb.from('stories').insert([
        { 
          author: meuNome, 
          media_url: publicUrl, 
          type: file.type.includes('video') ? 'video' : 'image',
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        }
      ]);
      toast("✅ Story publicado!");
    } else {
      // Se for câmara comum, envia como mensagem de média no chat
      enviarMediaMensagem(publicUrl, file.type.includes('video') ? 'video' : 'image');
    }

  } catch (err) {
    console.error("Erro no upload:", err);
    toast("❌ Erro ao enviar ficheiro");
  } finally {
    input.value = ''; // Limpa o campo para o próximo uso
  }
}

// Configurar os ouvintes de eventos para os inputs
document.getElementById('midiaInput')?.addEventListener('change', function() {
  handleMediaUpload(this, 'chat');
});

document.getElementById('videoInput')?.addEventListener('change', function() {
  handleMediaUpload(this, 'stories');
});
