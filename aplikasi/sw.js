// service worker aplikasi Retur (BEN, 15 Nov 2026) - versi 99d24b7202d8
const SIMPAN = "retur-laksana-ca592bcb0195";
const KERANGKA = ["./", "manifest.webmanifest", "ikon-192.png", "ikon-512.png", "ikon-180.png"];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(SIMPAN).then((c) => c.addAll(KERANGKA)).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("retur-laksana-") && k !== SIMPAN).map((k) => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.pathname.includes("/api/")) return;
  if (u.origin === location.origin) {
    e.respondWith(fetch(e.request).then((r) => { const s = r.clone(); caches.open(SIMPAN).then((c) => c.put(e.request, s)); return r; }).catch(() => caches.match(e.request)));
  } else if (u.hostname === "unpkg.com") {
    e.respondWith(caches.match(e.request).then((ada) => ada || fetch(e.request).then((r) => { const s = r.clone(); caches.open(SIMPAN).then((c) => c.put(e.request, s)); return r; })));
  }
});
