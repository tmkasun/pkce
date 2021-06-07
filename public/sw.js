self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("kasun_test_cache").then((cache) => {
      console.log("Cache opened");
      return cache.addAll(["/", "/static/sample.json"]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      debugger;
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

//control current page
self.addEventListener("activate", function (event) {
  debugger;
  console.log("Claiming control");
  return self.clients.claim();
});
