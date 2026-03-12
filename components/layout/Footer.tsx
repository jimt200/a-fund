import Link from 'next/link'
import { Sprout, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary-500 rounded-xl flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
                A-<span className="text-primary-400">FUND</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Plateforme de financement participatif agricole en Afrique de l&apos;Ouest.
              Connectons investisseurs et coopératives pour une agriculture durable.
            </p>
          </div>

          {/* Plateforme */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Plateforme</h4>
            <ul className="space-y-3">
              {[
                { href: '/campagnes', label: 'Toutes les campagnes' },
                { href: '/how-it-works', label: 'Comment ça marche' },
                { href: '/dashboard', label: 'Espace investisseur' },
                { href: '/cooperative/dashboard', label: 'Espace coopérative' },
                { href: '/register', label: 'Créer un compte' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Légal & Aide</h4>
            <ul className="space-y-3">
              {[
                { href: '/legal/terms', label: 'CGU' },
                { href: '/legal/privacy', label: 'Politique de confidentialité' },
                { href: '/legal/mentions', label: 'Mentions légales' },
                { href: '/faq', label: 'FAQ' },
                { href: '/support', label: "Centre d'aide" },
                { href: '/blog', label: 'Blog' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-400">Cocody Riviera 3, Abidjan, Côte d&apos;Ivoire</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">+225 27 22 00 00 00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">contact@a-fund.ci</span>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-primary-900/30 rounded-xl border border-primary-800/30">
              <p className="text-xs text-primary-300 font-medium">
                🛡️ Plateforme régulée · Fonds sécurisés · KYC obligatoire
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2024 A-FUND · HOKMA Labs · Tous droits réservés
          </p>
          <p className="text-xs text-gray-500">
            Investir comporte des risques · Les performances passées ne préjugent pas des performances futures
          </p>
        </div>
      </div>
    </footer>
  )
}