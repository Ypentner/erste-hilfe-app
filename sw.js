const CACHE_NAME = 'erste-hilfe-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/src/css/styles.css',
  '/src/js/app.js',
  '/src/js/services/NavigationService.js',
  '/src/js/services/CprService.js',
  '/src/js/services/GeolocationService.js',
  '/src/js/services/DarkModeService.js',
  '/src/js/components/HeaderView.js',
  '/src/js/components/HomeView.js',
  '/src/js/components/GuideView.js',
  '/src/js/components/CprView.js',
  '/src/js/components/InfoView.js',
  '/src/js/data/emergencySteps.js',
  '/src/js/utils/helpers.js',
  '/manifest.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache geöffnet');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});