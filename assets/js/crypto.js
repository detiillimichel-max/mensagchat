// assets/js/crypto.js
const KeyHelper = libsignal.KeyHelper;

async function gerarChavesE2E() {
  let idKey = localStorage.getItem('oio_idkey');
  if (!idKey) {
    const identity = await KeyHelper.generateIdentityKeyPair();
    const registrationId = await KeyHelper.generateRegistrationId();
    localStorage.setItem('oio_idkey', JSON.stringify(identity));
    localStorage.setItem('oio_regid', registrationId);
  }
}

async function cifrar(texto) {
  const identity = JSON.parse(localStorage.getItem('oio_idkey'));
  const enc = new TextEncoder().encode(texto);
  // Importação da chave para cifragem AES-GCM
  const key = await crypto.subtle.importKey('jwk', identity.pubKey, {name:'AES-GCM'}, false, ['encrypt']);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cifrado = await crypto.subtle.encrypt({name:'AES-GCM', iv}, key, enc);
  return btoa(String.fromCharCode(...new Uint8Array(cifrado)));
}

async function decifrar(textoCifrado) {
  try {
    const identity = JSON.parse(localStorage.getItem('oio_idkey'));
    const key = await crypto.subtle.importKey('jwk', identity.pubKey, {name:'AES-GCM'}, false, ['decrypt']);
    const dec = await crypto.subtle.decrypt({name:'AES-GCM', iv:new Uint8Array(12)}, key, Uint8Array.from(atob(textoCifrado), c=>c.charCodeAt(0)));
    return new TextDecoder().decode(dec);
  } catch(e) {
    return textoCifrado; // Retorna o texto original se não conseguir decifrar
  }
}

