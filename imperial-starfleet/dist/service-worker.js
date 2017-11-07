var CACHE_NAME = 'service-worker-cache-v1';
var urlsToCache = [
  'service-worker.js',
	'index.html',
  'assets/images/tie-fighter.png',
  'assets/images/turret.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        //console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  //console.log("working!");
  //console.log(event);
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        //console.log(response);
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});