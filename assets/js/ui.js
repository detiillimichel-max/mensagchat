// assets/js/ui.js

// 1. Alternar entre as telas do App
function abrirTela(id) {
  // Remove a classe 'ativa' de todas as telas e botões
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.querySelectorAll('.topo-btn').forEach(b => b.classList.remove('ativo'));
  
  // Ativa a tela e o botão seleccionados
  const telaAlvo = document.getElementById(`tela-${id}`);
  const btnAlvo = document.getElementById(id === 'chat' ? 'btnChat' : 'btnFeed');
  
  if (telaAlvo) telaAlvo.classList.add('ativa');
  if (btnAlvo) btnAlvo.classList.add('ativo');
}

// 2. Sistema de Mensagens Flutuantes (Toast)
function toast(msg) {
  const container = document.getElementById('toasts');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  container.appendChild(el);
  
  // Remove automaticamente após 3 segundos
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 500);
  }, 3000);
}

// 3. Renderizar os Membros na barra superior (Stories)
function renderMembros(membros) {
  const bar = document.getElementById('familia-bar');
  if (!bar) return;
  
  bar.innerHTML = membros.map(m => `
    <div class="membro-st" onclick="verStory('${m.nome}')">
      <div class="st-aro">
        <img src="${m.avatar || 'https://ui-avatars.com/api/?name='+m.nome+'&background=2a3942&color=fff'}" class="st-img">
      </div>
      <div class="st-nome">${m.nome}</div>
    </div>
  `).join('');
}

// 4. Modal de Membro
function fecharModal(e) {
  if (e.target.id === 'modalMembro' || e === 'force') {
    document.getElementById('modalMembro').style.display = 'none';
  }
}

// 5. Inicialização do Background Animado (Canvas)
function initVisuals() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  };

  class Particle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.size = Math.random() * 80 + 20;
      this.color = Math.random() > 0.5 ? 'rgba(37, 211, 102, 0.05)' : 'rgba(18, 140, 126, 0.05)';
      this.velX = Math.random() * 0.4 - 0.2;
      this.velY = Math.random() * 0.4 - 0.2;
    }
    update() {
      this.x += this.velX;
      this.y += this.velY;
      if (this.x > w) this.x = 0; if (this.x < 0) this.x = w;
      if (this.y > h) this.y = 0; if (this.y < 0) this.y = h;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  const animate = () => {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  };

  window.addEventListener('resize', resize);
  resize();
  for (let i = 0; i < 8; i++) particles.push(new Particle());
  animate();
}

document.addEventListener('DOMContentLoaded', initVisuals);

