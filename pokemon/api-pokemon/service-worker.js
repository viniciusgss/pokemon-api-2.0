const CACHE_NAME = 'api-pokemon';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/index.js',
    '/manifest.json',
    '/icones/icon-192x192.png',
    '/icones/icon-512x512.png',
    'api-pokemon/Pokebola-pokeball-png-0.png',
    'api-pokemon/pokemonbackground.jpg',
    'api-pokemon/tabelafraquezas.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
