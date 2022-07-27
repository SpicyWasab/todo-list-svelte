const t = [
  "/todo-list-svelte/_app/immutable/start-f6a870e0.js",
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
], s = "v1";
caches.open(s).then((e) => e.addAll(t));
self.addEventListener("fetch", async (e) => {
  e.respondWith(await caches.match(e.request) ?? await fetch(e.request));
});
