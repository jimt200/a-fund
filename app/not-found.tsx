import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Sprout, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-md">
          <div className="relative mb-8">
            <p style={{ fontFamily: 'Georgia, serif' }} className="text-9xl font-bold text-green-100 select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-green-50 p-5 rounded-full">
                <Sprout size={48} className="text-green-500" />
              </div>
            </div>
          </div>

          <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-gray-800 mb-3">
            Page introuvable
          </h1>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer votre parcours d'investissement.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/" className="btn-primary flex items-center gap-2">
              <Home size={15} /> Accueil
            </Link>
            <Link href="/campagnes" className="btn-outline flex items-center gap-2">
              <Sprout size={15} /> Voir les campagnes
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}