
// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js');

// Configuração do Vibe App
firebase.initializeApp({
  apiKey: "AIzaSyAWL1XRR8JK-J5Qk5DSIKmBl4ZYMZw1R4I",
  projectId: "vibe-app-bbba2",
  messagingSenderId: "123456789", 
  appId: "1:123456789:web:abc123" 
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/img/logo.png',
    badge: '/assets/img/logo.png',
    data: { url: '/' }
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
