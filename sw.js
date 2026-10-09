
const PREFIX = 'fruit-orchard-' + self.registration.scope;
const CACHE = PREFIX + "55fd2cbbc0185c21";
const FILES = ["index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable.png","art/neon-stage-v2.webp","art/neon-sprites/watermelon.png","art/neon-sprites/watermelon-cut.png","art/neon-sprites/orange.png","art/neon-sprites/orange-cut.png","art/neon-sprites/kiwi.png","art/neon-sprites/kiwi-cut.png","art/neon-sprites/strawberry.png","art/neon-sprites/strawberry-cut.png","art/neon-sprites/peach.png","art/neon-sprites/peach-cut.png","art/neon-sprites/dragon.png","art/neon-sprites/dragon-cut.png","assets/index-BsluFwEN.css","assets/three-DeEm-WMF.js","assets/index-BOLZmRrU.js"].map(p => new URL(p, self.registration.scope).href);
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    if (event.request.mode === 'navigate') return (await cache.match(new URL('index.html', self.registration.scope).href)) || fetch(event.request);
    return (await cache.match(event.request)) || fetch(event.request);
  }));
});
