const CACHE_NAME = 'afund-v1'
const STATIC_ASSETS = [
  '/',
  '/campagnes',
  '/how-it-works',
  '/about',
  '/faq',
  '/offline',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
]

// Installation — mise en cache des assets statiques
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activation — nettoyage des anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Fetch — stratégie Network First pour les pages, Cache First pour les assets
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Ignorer les requêtes non-GET et les API
  if (request.method !== 'GET') return
  if (url.pathname.startsWith('/api/')) return

  // Cache First pour les images et fonts
  if (
    request.destination === 'image' ||
    request.destination === 'font' ||
    url.pathname.startsWith('/icons/')
  ) {
    event.respondWith(
      caches.match(request).then(cached => {
        return cached || fetch(request).then(response => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
          return response
        })
      })
    )
    return
  }

  // Network First pour les pages HTML
  event.respondWith(
    fetch(request)
      .then(response => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone))
        return response
      })
      .catch(() => {
        return caches.match(request).then(cached => {
          return cached || caches.match('/offline')
        })
      })
  )
})

// Notifications push
self.addEventListener('push', event => {
  if (!event.data) return
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title || 'A-FUND', {
      body: data.body || 'Nouvelle notification',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      data: { url: data.url || '/' },
      actions: [
        { action: 'open', title: 'Voir' },
        { action: 'close', title: 'Fermer' },
      ],
    })
  )
})

// Clic sur notification
self.addEventListener('notificationclick', event => {
  event.notification.close()
  if (event.action === 'close') return
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      const url = event.notification.data?.url || '/'
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) return client.focus()
      }
      if (clients.openWindow) return clients.openWindow(url)
    })
  )
})