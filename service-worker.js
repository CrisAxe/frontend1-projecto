const CACHE_NAME = "pituxa-cache-v1";

const ASSETS = [
    "./",
    "./index.html",

    // CSS
    "./css/style.css",
    "./css/navbar.css",
    "./css/hero.css",
    "./css/sobre.css",
    "./css/menu.css",
    "./css/contactos.css",
    "./css/reservas.css",
    "./css/reviews.css",
    "./css/info-section.css",
    "./css/galeria.css",

    // JS
    "./js/datetime.js",
    "./js/scroll.js",
    "./js/reservation.js",
    "./js/reviews.js",
    "./js/canvas.js",
    "./js/pituxa-card.js",

    // HTML extra
    "./html/sobre.html",
    "./html/menu.html",
    "./html/galeria.html",
    "./html/contactos.html",
    "./html/reservas.html",

    // Imagens
    "./pics/LOGO B.png",
    "./pics/icon-192.png",
    "./pics/icon-512.png"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
