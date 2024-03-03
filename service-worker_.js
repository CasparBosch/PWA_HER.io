importScripts('./src/js/localforage.min.js');

const cacheName = 'v3';

// // Call Install Event
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
})

// // Call Activate Event
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

// // // Call Fetch Event
// // self.addEventListener('fetch', event => {
// //     console.log('Service Working: Fetching');

// //     event.respondWith(
// //         // Fetch for Indexed Pages
// //         // fetch(event.request).catch(() => caches.match(event.request));

// //         // Fetch for Full Site
// //         fetch(event.request)
// //             .then(res => {

// //                 // Tags
// //                 if (event.request.url.includes('https://cmgt.hr.nl/api/tags')) {
// //                     event.respondWith(
// //                         fetch(event.request)
// //                             .then(res => {
// //                                 const resClone = res.clone();
            
// //                                 caches.open(cacheName).then(cache => {
// //                                     cache.put(event.request, resClone);
// //                                 });
// //                                 return res;
// //                             })
// //                         .catch(error => {
// //                             return caches.match(event.request).then(res => res);
// //                         })
// //                     );
// //                 }

// //                 // Make copy/clone of respone
// //                 const resClone = res.clone();
// //                 // Open cache
// //                 caches
// //                     .open(cacheName)
// //                     .then(cache => {
// //                         // Add response to cache
// //                         cache.put(event.request, resClone);
// //                     });
// //                 return res;
// //             }).catch(error => caches.match(event.request).then(res => res))
// //     );
// // })


//Fetch
self.addEventListener('fetch', event => {
    console.log('Service Working: Fetching');
    localforage.createInstance();
    // console.log(localforage.createInstance())

    if (event.request.url.includes('https://cmgt.hr.nl/api/tags')) {
        event.respondWith(
            console.log("test")
            )
    }


    // Clone the request
    const requestClone = event.request.clone();

    // Req before, respondWidth rather in if
    event.respondWith(
        // Fetch for Full Site
        fetch(requestClone)
            .then(res => {
                // Clone the response
                const responseClone = res.clone();

                // Tags
                if (event.request.url.includes('https://cmgt.hr.nl/api/tags')) {
                    caches.open(cacheName).then(cache => {
                        cache.put(requestClone, responseClone);
                    });
                } 
                // Projects
                if (event.request.url.includes('https://cmgt.hr.nl/api/projects')) {
                    caches.open(cacheName).then(cache => {
                        cache.put(requestClone, responseClone);
                    });
                } 

                return res;

            })
            .catch(error => {
                // If fetch fails, try to match the request from cache
                return caches.match(requestClone)
                    .then(res => res || Promise.reject('no-match'));
            })
    );
});


// self.addEventListener('fetch', event => {
//     console.log('Service Worker: Fetching');

//     // Initialize localforage instance
//     const localforageInstance = localforage.createInstance();

//     // Check if the request URL includes the specified endpoint
//     if (event.request.url.includes('https://cmgt.hr.nl/api/tags')) {
//         // Intercept the request and respond accordingly
//         event.respondWith(
//             fetch(event.request) // Fetch the request
//                 .then(response => {
//                     // Log the response
//                     console.log("Response:", response);
//                     return response; // Return the response
//                 })
//                 .catch(error => {
//                     // Log any errors
//                     console.error("Error fetching data:", error);
//                     // Respond with an error message or fallback response
//                     return new Response("An error occurred while fetching data.", { status: 500 });
//                 })
//         );
//     }  

//     else if (event.request.url.includes('https://cmgt.hr.nl/api/projects')) {
//         // Intercept the request and respond accordingly
//         event.respondWith(
//             fetch(event.request) // Fetch the request
//                 .then(response => {
//                     // Log the response
//                     console.log("Response:", response);
//                     return response; // Return the response
//                 })
//                 .catch(error => {
//                     // Log any errors
//                     console.error("Error fetching data:", error);
//                     // Respond with an error message or fallback response
//                     return new Response("An error occurred while fetching data.", { status: 500 });
//                 })
//         );
//     }  
// });
