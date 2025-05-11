const CACHE_NAME = "lunch-wheel-v1";
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "icon.png",
  "og_image.png"
];

// 설치: 핵심 리소스 캐싱
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// 활성화: 오래된 캐시 정리
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

// fetch: 캐시 우선, 실패 시 네트워크
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(
      (res) => res || fetch(e.request).catch(() => caches.match("index.html"))
    )
  );
});
