self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { nome: 'OIO ONE', texto: 'Nova mensagem!' };
  self.registration.showNotification(data.nome, {
    body: data.texto,
    icon: '/assets/img/logo.png',
    badge: '/assets/img/logo.png',
    data: { url: '/' }
  });
});

