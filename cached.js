//This is a Service Worker Script for caching pages to the browser

const cacheName = 'v1';

//List of pages to be cached
const pages = [
  'index.html',
  'restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

// Install Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then( cache => {
        cache.addAll(pages);
      })
      .then( () => self.skipWaiting() ).catch(err =>{ console.log(`error:` + err)} )
  );
});



//Listen for a fetch event. If it matches the cache it serves the cached file to the browser

self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(response => {
          // if cached then serve the page
          if (response) {
            return response;
          }
          return fetch(e.request);
        }
      )
    );
  });