const staticAssets = [
    './views/index.ejs',
    './views/modals/signin.ejs',
    './views/modals/signup.ejs',
    './stylesheets/style.css',
    './javascripts/index.js',
    './javascripts/sockets.js',
    './javascripts/user.js',
    './images/logo.png',
];


self.addEventListener('install', async event => {
    const cache = await caches.open('static-cache');
    cache.addAll(staticAssets);
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.url) {
        event.respondWith(cacheFirst(req));
    } else {
        event.respondWith(networkFirst(req));
    }
});

async function cacheFirst(req) {
    const cachedResponse = caches.match(req);
    return cachedResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open('dynamic-cache');

    try {
        const res = await fetch(req);
        //cache.put(req, res.clone());
        return res;
    } catch (error) {
        return await cache.match(req);
    }
}

self.addEventListener('notificationclose', function(e) {
    console.log('Closed notification: ' + primaryKey);
        var notification = e.notification;
        var primaryKey = notification.data.primaryKey;
      

});
