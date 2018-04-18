importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js');

if (workbox) {
  workbox.precaching.precacheAndRoute([]);
} else {
  console.log(`Workbox didn't load 😬`);
}