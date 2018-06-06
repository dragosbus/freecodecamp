var CACHE_NAME = 'myapp-cache-v1.0';

var urlsToCache = [
  '/freecodecamp/advanced_projects/tic-tac-toe/',
  '/freecodecamp/advanced_projects/tic-tac-toe/css/style.css',
  '/freecodecamp/advanced_projects/tic-tac-toe/js/script.js',
  '/freecodecamp/advanced_projects/tic-tac-toe/img/x.svg',
  '/freecodecamp/advanced_projects/tic-tac-toe/img/o.svg'
]

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(function (register) {
    console.log('Serviceworker succesfull with scope: ', register.scope)
  }).catch(function (err) {
    console.log('Fail', err);
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Openend cache');
      return cache.addAll(urlsToCache);
    })
  )
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(function (response) {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        var responseToCache = response.clone();
        caches.open(CACHE_NAME)
          .then(function (cache) {
            cache.put(event.request, responseToCache);
          });
        return response;
      });
    })
  )
});