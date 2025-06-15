const CACHE_NAME = 'swagometer-cache-v1';
const urlsToCache = [
  '/',
  '/swagometer',
  'https://zaebizwear.com/zbs.svg',
  'https://zaebizwear.com/favicon.webp',
  'https://zaebizwear.com/swaga.mp3',
  'https://www.myinstants.com/media/sounds/aaaaaaa-skrimer.mp3',
  'https://c.tenor.com/qM90pXzX1KQAAAAd/tenor.gif',
  'https://c.tenor.com/2_hwjYcJlSoAAAAd/tenor.gif',
  'https://c.tenor.com/BH3AVKkqbU8AAAAC/tenor.gif',
  'https://c.tenor.com/6rBuC3Ip7oYAAAAd/tenor.gif',
  'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => caches.match('/swagometer'))
  );
});