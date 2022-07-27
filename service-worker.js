const l = {
  toString: () => {
    throw new Error("`timestamp` has been removed from $service-worker. Use `version` instead");
  }
}, r = [
  "/todo-list-svelte/_app/immutable/start-966dac59.js",
  "/todo-list-svelte/_app/immutable/pages/__layout.svelte-b08fd73a.js",
  "/todo-list-svelte/_app/immutable/pages/__error.svelte-9a357fdd.js",
  "/todo-list-svelte/_app/immutable/pages/categories/_...unknownCategory_.svelte-5c88dd3b.js",
  "/todo-list-svelte/_app/immutable/pages/categories/_category_category_/lists/_...unknownList_.svelte-1d2103c1.js",
  "/todo-list-svelte/_app/immutable/pages/categories/_category_category_/lists/_list_.svelte-f02aed9e.js",
  "/todo-list-svelte/_app/immutable/pages/categories/_category_category_.svelte-219a1008.js",
  "/todo-list-svelte/_app/immutable/assets/[category=category]-750f9fef.css",
  "/todo-list-svelte/_app/immutable/pages/index.svelte-bc024c2f.js",
  "/todo-list-svelte/_app/immutable/chunks/index-f7c1fb44.js",
  "/todo-list-svelte/_app/immutable/chunks/singletons-3371444f.js",
  "/todo-list-svelte/_app/immutable/chunks/paths-b9644fda.js",
  "/todo-list-svelte/_app/immutable/chunks/db-07f01c9f.js",
  "/todo-list-svelte/_app/immutable/chunks/Drawer-31d0a32b.js",
  "/todo-list-svelte/_app/immutable/chunks/navigation-da1e81ae.js",
  "/todo-list-svelte/_app/immutable/chunks/Fab-01ceb877.js"
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
], i = `cache${l}`, c = r.concat(p), d = new Set(c);
self.addEventListener("install", (t) => {
  t.waitUntil(caches.open(i).then((e) => e.addAll(c)).then(() => {
    worker.skipWaiting();
  }));
});
self.addEventListener("activate", (t) => {
  t.waitUntil(caches.keys().then(async (e) => {
    for (const s of e)
      s !== i && await caches.delete(s);
    self.clients.claim();
  }));
});
async function m(t) {
  const e = await caches.open(`offline${l}`);
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
  const e = new URL(t.request.url), s = e.protocol.startsWith("http"), a = e.hostname === self.location.hostname && e.port !== self.location.port, o = e.host === self.location.host && d.has(e.pathname), n = t.request.cache === "only-if-cached" && !o;
  s && !a && !n && t.respondWith((async () => o && await caches.match(t.request) || m(t.request))());
});
