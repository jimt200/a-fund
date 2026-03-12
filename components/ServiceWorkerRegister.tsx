'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then(reg => {
            console.log('[SW] Enregistré :', reg.scope)

            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing
              if (!newWorker) return
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  if (confirm('Une nouvelle version d\'A-FUND est disponible. Mettre à jour ?')) {
                    newWorker.postMessage({ type: 'SKIP_WAITING' })
                    window.location.reload()
                  }
                }
              })
            })
          })
          .catch(err => console.error('[SW] Erreur :', err))
      })
    }

    let deferredPrompt: any
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      deferredPrompt = e
      window.dispatchEvent(new CustomEvent('pwaInstallAvailable', { detail: deferredPrompt }))
    })
  }, [])

  return null
}