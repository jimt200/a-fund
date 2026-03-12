'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative mb-8">
          <p style={{ fontFamily: 'Georgia, serif' }} className="text-9xl font-bold text-red-50 select-none">
            500
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-red-50 p-5 rounded-full">
              <AlertTriangle size={48} className="text-red-400" />
            </div>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-gray-800 mb-3">
          Une erreur est survenue
        </h1>
        <p className="text-gray-500 mb-2 leading-relaxed">
          Quelque chose s'est mal passé. Notre équipe a été notifiée et travaille à résoudre le problème.
        </p>
        {error.digest && (
          <p className="text-xs text-gray-400 font-mono mb-8">
            Code : {error.digest}
          </p>
        )}

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={reset}
            className="btn-primary flex items-center gap-2"
          >
            <RefreshCw size={15} /> Réessayer
          </button>
          <Link href="/" className="btn-outline flex items-center gap-2">
            <Home size={15} /> Accueil
          </Link>
        </div>
      </div>
    </div>
  )
}