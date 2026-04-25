 // Very basic service worker - cache important files
const CACHE_NAME = 'my-pwa-v1';
const urlsToCache = [
  '/SwingTrail/',
  '/SwingTrail/index.html',
  '/SwingTrail/jack-n-jill.html',
  '/SwingTrail/dance-cal.html',
  '/SwingTrail/events.html',
  '/SwingTrail/style.css',
  '/SwingTrail/app.js',
  '/SwingTrail/manifest.json',
  '/SwingTrail/icons/icon-192.png',
  '/SwingTrail/icons/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
