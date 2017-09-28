---
---
'use strict';

var CACHE_NAME = 'site-cache-v1';
var urlsToCache = [
  '/',
  '/assets/css/all.css',
  '/logo.png',
{% for post in site.posts %}
  "{{ post.url }}",
{% endfor %}

{% for page in site.pages %}
  {% if page.permalink %}
    "{{ page.url }}",
  {% endif %}

  {% if page.url %}
    "{{ page.url }}",
  {% endif %}
{% endfor %}
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
