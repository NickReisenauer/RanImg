// Register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((registration) => {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch((error) => {
      console.log("Service worker registration failed, error:", error);
    });
}

// Precaching Resources
const cacheName = "ranImgCache-v1";
const resourcesToCache = ["/", "/index.html", "/index.css", "index.js"];

self.addEventListener("install", (event) => {
  console.log(`Install Event`);
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        return cache.addAll(resourcesToCache);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      })
  );
});

// Implementing cache-first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      })
  );
});
