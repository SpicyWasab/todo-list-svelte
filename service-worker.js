const n = [
  "/todo-list-svelte/_app/immutable/start-754dcc4d.js",
  "/todo-list-svelte/_app/immutable/pages/__layout.svelte-ebc0eeb4.js",
  "/todo-list-svelte/_app/immutable/pages/__error.svelte-3a563875.js",
  "/todo-list-svelte/_app/immutable/pages/categories/_...unknownCategory_.svelte-d95a71f6.js",
  "/todo-list-svelte/_app/immutable/pages/categories/_category_category_/lists/_...unknownList_.svelte-07d6ebe4.js",
  "/todo-list-svelte/_app/immutable/pages/categories/_category_category_/lists/_list_.svelte-df4a8786.js",
  "/todo-list-svelte/_app/immutable/pages/categories/_category_category_.svelte-3b2cdb1c.js",
  "/todo-list-svelte/_app/immutable/assets/[category=category]-750f9fef.css",
  "/todo-list-svelte/_app/immutable/pages/index.svelte-773cb263.js",
  "/todo-list-svelte/_app/immutable/chunks/index-c2d942cd.js",
  "/todo-list-svelte/_app/immutable/chunks/singletons-d06f5170.js",
  "/todo-list-svelte/_app/immutable/chunks/paths-b9644fda.js",
  "/todo-list-svelte/_app/immutable/chunks/db-07f01c9f.js",
  "/todo-list-svelte/_app/immutable/chunks/Drawer-aad33b62.js",
  "/todo-list-svelte/_app/immutable/chunks/navigation-67d377f0.js",
  "/todo-list-svelte/_app/immutable/chunks/Fab-79b3ce5b.js"
], p = [
  "/todo-list-svelte/.nojekyll",
  "/todo-list-svelte/app.css",
  "/todo-list-svelte/favicon.png",
  "/todo-list-svelte/logos/img2x.png",
  "/todo-list-svelte/logos/img3x.png",
  "/todo-list-svelte/logos/img4x.png",
  "/todo-list-svelte/logos/img6x.png",
  "/todo-list-svelte/manifest.webmanifest",
  "/todo-list-svelte/smui-dark.css",
  "/todo-list-svelte/smui.css"
], o = "v1", i = n.concat(p), d = new Set(i);
self.addEventListener("install", (t) => {
  t.waitUntil(caches.open(o).then((e) => e.addAll(i)).then(() => {
    self.skipWaiting();
  }));
});
self.addEventListener("activate", (t) => {
  t.waitUntil(caches.keys().then(async (e) => {
    for (const s of e)
      s !== o && await caches.delete(s);
    self.clients.claim();
  }));
});
async function r(t) {
  const e = await caches.open(o);
  try {
    const s = await fetch(t);
    return e.put(t, s.clone()), s;
  } catch (s) {
    const a = await e.match(t);
    if (a)
      return a;
    throw s;
  }
}
self.addEventListener("fetch", (t) => {
  if (t.request.method !== "GET" || t.request.headers.has("range"))
    return;
  const e = new URL(t.request.url), s = e.protocol.startsWith("http"), a = e.hostname === self.location.hostname && e.port !== self.location.port, l = e.host === self.location.host && d.has(e.pathname), c = t.request.cache === "only-if-cached" && !l;
  s && !a && !c && t.respondWith((async () => l && await caches.match(t.request) || r(t.request))());
});
