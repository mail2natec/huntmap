// RoCo Hunt service worker: makes the app installable.
// Network-first for the app page, so updates always show up right away.
// The last good copy is kept only as a fallback when there's no signal.
const CACHE = "rocohunt-shell-v1";
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.mode !== "navigate") return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put("./", copy)); }
      return r;
    }).catch(() => caches.match("./").then(r => r || Response.error()))
  );
});
