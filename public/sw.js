const CACHE = "deutsch-phrasebook-v1";
const ASSETS = ["/manifest.json", "/icon-192.svg", "/icon-512.svg"];

self.addEventListener("install", (event) => {
	event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)));
	self.skipWaiting();
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((k) => k !== CACHE)
						.map((k) => caches.delete(k)),
				),
			),
	);
	self.clients.claim();
});

self.addEventListener("fetch", (event) => {
	if (event.request.mode === "navigate") return;
	if (event.request.method !== "GET") return;

	const url = new URL(event.request.url);
	if (url.origin !== self.location.origin) return;
	if (!/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?|webp)$/i.test(url.pathname)) return;

	event.respondWith(
		caches.match(event.request).then((cached) => {
			const fetchPromise = fetch(event.request)
				.then((response) => {
					if (response.ok) {
						const clone = response.clone();
						caches
							.open(CACHE)
							.then((cache) => cache.put(event.request, clone));
					}
					return response;
				})
				.catch(() => cached);
			return cached || fetchPromise;
		}),
	);
});
