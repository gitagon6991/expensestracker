const CACHE_NAME = "expenses-pwa-v1";
const urlsToCache = [
  "/expensestracker/",
  "/expensestracker/index.html",
  "/expensestracker/manifest.json",
  "/expensestracker/service-worker.js",
  "https://cdn.jsdelivr.net/npm/chart.js",
  "/expensestracker/icons/icon-192.png",
  "/expensestracker/icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
