'use strict';

var CACHE_NAME = 'site-cache-v1';
var urlsToCache = [
  '/',
  '/assets/css/all.css',
  '/logo.png',

  "/2018/02/10/lection/",

  "/2017/12/17/workshop/",

  "/2017/09/28/workshop/",

  "/2017/07/19/lection/",

  "/2017/07/09/solving/",

  "/2017/06/10/workshop/",

  "/2017/05/27/lection/",



  

  
    "/assets/css/all.css",
  

  

  
    "/atom.xml",
  

  

  
    "/",
  

  

  
    "/tag/lection/",
  

  

  
    "/tag/meetup/",
  

  

  
    "/site.json",
  

  

  
    "/tag/solving/",
  

  

  
    "/sw.js",
  

  

  
    "/tag/workshop/",
  

  

  
    "/feed.xml",
  

];


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(caches.open(CACHE_NAME).then(function(cache) {
    console.log('Opened cache');
    return cache.addAll(urlsToCache);
  }).catch(function(err) {
    console.log('cahce add error', err);
  }));
});

self.addEventListener('fetch', function(event) {
  return event.respondWith(caches.open(CACHE_NAME).then(function(cache) {
    return caches.match(event.request).then(function(response) {
      return response || fetch(event.request.clone()).then(function(response) {
          if(!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          cache.put(event.request, response.clone());
          return response;
        }
      );
    });
  }));
});

// network-first-cache-fallback
self.addEventListener('fetch', function(event) {
  return event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});
