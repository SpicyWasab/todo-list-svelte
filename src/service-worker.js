import { build } from "$service-worker";

caches.open('v1').then(cache => cache.addAll(build));