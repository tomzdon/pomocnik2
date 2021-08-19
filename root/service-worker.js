/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "/precache-manifest.6e62309a9cdd8900675f173c50ad6ec1.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL("/index.html"), {
  
  blacklist: [/^\/_/,/\/[^/?]+\.[^/]+$/],
});

workbox.routing.registerRoute(/(.*)bootstrap(.*).(?:css|js)/, new workbox.strategies.CacheFirst({ "cacheName":"bootstrap-cdn", plugins: [new workbox.expiration.Plugin({ maxEntries: 2, maxAgeSeconds: 2592000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/(.*)popper(.*).js/, new workbox.strategies.CacheFirst({ "cacheName":"popper-cdn", plugins: [new workbox.expiration.Plugin({ maxEntries: 1, maxAgeSeconds: 2592000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/(.*)jquery(.*).js/, new workbox.strategies.CacheFirst({ "cacheName":"jquery-cdn", plugins: [new workbox.expiration.Plugin({ maxEntries: 1, maxAgeSeconds: 2592000, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/(.*)github.com\/users\/(.*)/, new workbox.strategies.StaleWhileRevalidate({ "cacheName":"github-repo", plugins: [new workbox.expiration.Plugin({ maxEntries: 2, maxAgeSeconds: 43200, purgeOnQuotaError: false })] }), 'GET');
workbox.routing.registerRoute(/(.*)fast-cliffs-09680.herokuapp.com\/posts\/*/, new workbox.strategies.NetworkOnly({ plugins: [new workbox.backgroundSync.Plugin("fast-cliffs", { maxRetentionTime: 5 })] }), 'POST');
