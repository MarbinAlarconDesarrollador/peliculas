const CACHE_NAME = 'cineruleta-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Instalar y guardar en caché
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Responder desde caché si no hay red
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});