const VERSION = '1.16.7';

var req = new Request('.?v=' + VERSION);
self.addEventListener('install', (event) =>
    event.waitUntil(
        caches.open('v1').then((cache) =>
            fetch(req).then((response) => {
                if (response.ok) {
                    var cachedCopy = response.clone();
                    return cache.put(req, cachedCopy);
                }
            })
        )
    )
);

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request.url).then((response) => response || fetch(event.request))
    );
});
