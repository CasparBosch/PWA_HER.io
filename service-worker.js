const cacheName = 'v1';

// // Index of Pages
// const cacheAssets = [
//     'index.html',
//     // CSS
//     '/src/css/input.css',
//     '/src/css/output.css',
//     // JS
//     '/src/js/index.js'
// ]

// Call Install Event
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');

    // // Cache Content of Indexed Pages
    // event.waitUntil(
    //     caches
    //         .open(cacheName)
    //         .then(cache => {
    //             console.log('Service Worker: Caching Files');
    //             cache.addAll(cacheAssets);
    //         })
    //         .then(() => self.skipWaiting())
    // );
})

// Call Activate Event
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');

    // Remove Unwanted Caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Working: Clearing Old Cache');
                        return caches.delete(cache)
                    }
                })
            )
        })
    );
})

// Call Fetch Event
self.addEventListener('fetch', event => {
    console.log('Service Working: Fetching');

    event.respondWith(
        // Fetch for Indexed Pages
        // fetch(event.request).catch(() => caches.match(event.request));

        // Fetch for Full Site
        fetch(event.request)
            .then(res => {
                // Make copy/clone of respone
                const resClone = res.clone();
                // Open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        // Add response to cache
                        cache.put(event.request, resClone);
                    });
                return res;
            }).catch(error => caches.match(event.request).then(res => res))
    );
})