var CACHE_NAME = "0.0.4";
const FILES_TO_CACHE = [
  './index.html',
  './icon/drawing.svg',
  './init.js',
  './main.css',
  'https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js',
  'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then((cache)=> {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', function(event) {  
  event.waitUntil(
      caches.keys().then((keyList) => {
          return Promise.all(keyList.map((key) => {
            if (key!=="userData" && key !== CACHE_NAME) {
              console.log('[ServiceWorker] Removing old cache', key);
              return caches.delete(key);
            }
          }));
        })
    
  );
});
self.addEventListener('fetch', function(evt) {
  console.log("request file:"+evt.request.url);
  evt.respondWith(
    caches.match(evt.request).then(res=>{
      /*
      if(evt.request.url=="https://rawgit.com/web-animations/web-animations-js/master/web-animations.min.js"&&!navigator.onLine)
      if(res)cache
      */
      return res || fetch(evt.request);
    })
  );
  
});

  /*

s = ["72x72","96x96", "128x128", "144x144", "152x152", "192x192", "384x384", "512x512"]
for(x=0;x<s.length;x++){
  console.log(`{
    "src": "./icon-${s[x]}.png",
    "sizes": "${s[x]}",
    "type": "image/png"
  },`);
}
*/