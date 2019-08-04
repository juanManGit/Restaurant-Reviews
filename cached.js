//This is a Service Worker Script for caching pages to the browser

const cacheName = 'v1';

//List of pages to be cached
const pages = [
  '/',
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
  '/img/10.jpg',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
];

// Install Service Worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName)
    .then( cache => {
        cache.addAll(pages);
        self.skipWaiting();
      })
    .catch(err =>{ console.log(`Could not cache files. Error:` + err)} )
  );
});

//Activate Service Worker
self.addEventListener('activate', event => {
  console.log("Service worker is Active");
  event.waitUntil(clients.claim());
});

//Listen for a fetch event. If it matches the cache it serves the cached file to the browser

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.match(event.request, {'ignoreSearch': true})
//         .then(response => {
//           // if cached then serve the page
//             return response;
//         })
//         .catch(err=>{
//             console.error("File was not found in cache");
//             return fetch(event.request);
//         })
//     );
//   });

// Call Fetch Event
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching');
  //Attempt to fetch asset from network
  event.respondWith(
    fetch(event.request)
    //If asset or network are not available attempt to load from cache
    .catch(() => caches.match(event.request, {'ignoreSearch': true})));
});

