importScripts('./src/js/localforage.min.js');

const cacheName = 'v3';

// Call Install Event
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
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


// // Fetch
// async function getProjectData() {
//     const data = await fetch('https://cmgt.hr.nl/api/projects');
//     return data;
// }
// async function getTagData() {
//     const data = await fetch('https://cmgt.hr.nl/api/tags');
//     return data;
// }

// getProjectData().then((resp) => {
//     resp.json().then((resp) => {
//         saveDataToDb(resp.data[1]);
//     })
// }).catch((err) => console.log(err));


// // LocalForage / IndexedDB
// function saveDataToDb(data) {
//     localforage.setItem('project', data).then(() => {
//         console.log('Project Saved');
//     })
// }

// function getDataFromDb(key) {
//     if(!localforage.getItem(key)) return;
//     return localforage.getItem(key);
// }

// getDataFromDb('project').then((resp) => {
//     console.log('here', resp);
// })


// Fetch from API
// Fetch from API
async function getProjectData() {
    try {
        const data = await fetch('https://cmgt.hr.nl/api/projects');
        return data.json();
    } catch (error) {
        console.error('Failed to fetch project data:', error);
        return null; // Returning null to indicate failure
    }
}

async function getTagData() {
    try {
        const data = await fetch('https://cmgt.hr.nl/api/tags');
        return data.json();
    } catch (error) {
        console.error('Failed to fetch tag data:', error);
        return null; // Returning null to indicate failure
    }
}

// Save to IndexedDB
async function saveDataToDb(key, newData) {
    if (newData !== null) {
        const existingData = await localforage.getItem(key);
        if (existingData) {
            // If data already saved, replace with new data
            await localforage.setItem(key, newData);
            console.log(key + ' Updated');
        } else {
            // When no data, save data
            await localforage.setItem(key, newData);
            console.log(key + ' Saved');
        }
    }
}

// Fetch from getProject and getTagData
Promise.all([getProjectData(), getTagData()])
    .then(([projectData, tagData]) => {
        saveDataToDb('Project', projectData);
        saveDataToDb('Tag', tagData);
    })
    .catch((err) => console.error(err));

// Retrieve data from IndexedDB
async function getDataFromDb(key) {
    const data = await localforage.getItem(key);
    console.log('here', data);
    return data;
}

// Usage
getDataFromDb('project');
getDataFromDb('tag');
