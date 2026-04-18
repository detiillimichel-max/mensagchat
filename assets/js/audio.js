// assets/js/audio.js
let mediaRecorder;
let audioChunks = [];

async function toggleGravacao() {
  const btn = document.getElementById('btnMic');
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = enviarAudio;
    
    mediaRecorder.start();
    btn.classList.add('gravando');
    toast("🎤 Gravando...");
  } else {
    mediaRecorder.stop();
    btn.classList.remove('gravando');
  }
}

async function enviarAudio() {
  const blob = new Blob(audioChunks, { type: 'audio/webm' });
  // Lógica de upload para o Storage do Supabase aqui
  toast("✅ Áudio enviado!");
}
