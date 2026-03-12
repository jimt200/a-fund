import Link from 'next/link'
import { WifiOff, RefreshCw, Home, Sprout } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="bg-green-600 p-2 rounded-xl">
            <Sprout size={22} className="text-white" />
          </div>
          <span style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-gray-800">
            A-FUND
          </span>
        </div>

        {/* Icône */}
        <div className="relative mb-8">
          <p style={{ fontFamily: 'Georgia, serif' }} className="text-9xl font-bold text-gray-100 select-none">
            OFF
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-100 p-5 rounded-full">
              <WifiOff size={48} className="text-gray-400" />
            </div>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-gray-800 mb-3">
          Vous êtes hors ligne
        </h1>
        <p className="text-gray-500 leading-relaxed mb-8">
          Pas de connexion internet détectée. Vérifiez votre connexion et réessayez. Certaines pages sont disponibles hors ligne.
        </p>

        {/* Pages disponibles offline */}
        <div className="bg-green-50 rounded-2xl p-5 mb-8 text-left">
          <p className="text-sm font-semibold text-green-800 mb-3">
            📱 Pages disponibles hors ligne
          </p>
          <div className="space-y-2">
            {[
              { href: '/', label: 'Page d\'accueil' },
              { href: '/campagnes', label: 'Liste des campagnes' },
              { href: '/how-it-works', label: 'Comment ça marche' },
              { href: '/faq', label: 'Questions fréquentes' },
            ].map((page, i) => (
              <Link
                key={i}
                href={page.href}
                className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 hover:underline"
              >
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                {page.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
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