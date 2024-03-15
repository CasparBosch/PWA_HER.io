importScripts("./src/js/localforage.min.js");

const cacheName = "v3";

// Index of Pages
const cacheAssets = [
  "index.html",
  "project.html",
  // CSS
  "/src/css/input.css",
  "/src/css/output.css",
  // JS
  "/src/js/index.js",
  "/src/js/fetch.js.",
  "/src/js/localforage.min.js",
  "service-worker.js",
];

// Call Install Event
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");

  // Cache Content of Indexed Pages
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");

  // Remove Unwanted Caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Service Working: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", (event) => {
  console.log("Service Working: Fetching");

  // tags
  // projects
    // fetch naar projects
    async function getProjectData() {
      try {
        const data = await fetch("https://cmgt.hr.nl/api/projects");
        return data.json();
      } catch (error) {
        console.error("Failed to fetch project data:", error);
        return null;
      }
    }
      // lukt dit, save to indexeddb en return response
      // lukt dit niet, get from indexeddb en return promise met daarin een response met de data
  // (project details)
  // app shell
  event.respondWith(
    // Fetch for Indexed Pages
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

// Fetch from API
async function getProjectData() {
  try {
    const data = await fetch("https://cmgt.hr.nl/api/projects");
    return data.json();
  } catch (error) {
    console.error("Failed to fetch project data:", error);
    return null;
  }
}

async function getTagData() {
  try {
    const data = await fetch("https://cmgt.hr.nl/api/tags");
    return data.json();
  } catch (error) {
    console.error("Failed to fetch tag data:", error);
    return null;
  }
}

// Save to IndexedDB
async function saveDataToDb(key, newData) {
  if (newData !== null) {
    const existingData = await localforage.getItem(key);
    if (existingData) {
      // If data already saved, replace with new data
      await localforage.setItem(key, newData);
    } else {
      // When no data, save data
      await localforage.setItem(key, newData);
    }
  }
}

// Fetch from getProject and getTagData
Promise.all([getProjectData(), getTagData()])
  .then(([projectData, tagData]) => {
    saveDataToDb("Project", projectData);
    saveDataToDb("Tag", tagData);
  })
  .catch((err) => console.error(err));

// Retrieve data from IndexedDB
async function getDataFromDb(key) {
  const data = await localforage.getItem(key);
  // console.log('here', data);
  return data;
}

getDataFromDb("project");
getDataFromDb("tag");
