'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { ChevronDown, Search } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    categorie: 'Investissement',
    items: [
      { q: 'Quel est le montant minimum pour investir ?', r: 'Le montant minimum est de 10 000 FCFA par campagne. Il n\'y a pas de limite maximale.' },
      { q: 'Quels sont les rendements attendus ?', r: 'Les ROI varient entre 15% et 28% selon les campagnes, sur des durées de 90 à 180 jours. Chaque campagne affiche ses projections détaillées.' },
      { q: 'Puis-je investir dans plusieurs campagnes simultanément ?', r: 'Oui, vous pouvez investir dans autant de campagnes que vous souhaitez. La diversification est même recommandée pour réduire le risque global.' },
      { q: 'Quand est-ce que je récupère mon capital et mes rendements ?', r: 'À la date de récolte prévue, votre capital + ROI sont versés automatiquement sur votre wallet A-FUND.' },
    ],
  },
  {
    categorie: 'Sécurité & Risques',
    items: [
      { q: 'Comment A-FUND sécurise-t-il mes investissements ?', r: 'Notre protection repose sur 3 niveaux : validation agronomique indépendante (score ≥ 80/100), contrat d\'achat pré-signé avec un acheteur vérifié, et assurance récolte pour les campagnes éligibles.' },
      { q: 'Que se passe-t-il en cas de mauvaise récolte ?', r: 'Pour les campagnes assurées, l\'assurance couvre les pertes. Pour les autres, notre équipe négocie avec la coopérative un plan de remboursement structuré.' },
      { q: 'Les campagnes sont-elles vérifiées avant publication ?', r: 'Oui, chaque campagne est évaluée par un agronome certifié indépendant et doit obtenir un score minimum de 80/100 avant d\'être publiée sur la plateforme.' },
      { q: 'A-FUND est-elle une société réglementée ?', r: 'A-FUND opère en conformité avec les réglementations financières de l\'UEMOA et est enregistrée auprès des autorités compétentes ivoiriennes.' },
    ],
  },
  {
    categorie: 'Compte & KYC',
    items: [
      { q: 'Pourquoi dois-je vérifier mon identité (KYC) ?', r: 'La vérification KYC est obligatoire pour effectuer des retraits et accéder à toutes les campagnes. Elle protège votre compte et respecte les réglementations anti-blanchiment.' },
      { q: 'Quels documents sont nécessaires pour le KYC ?', r: 'Une pièce d\'identité nationale ou passeport, un justificatif de domicile de moins de 3 mois, et un numéro de contribuable ou attestation fiscale.' },
      { q: 'Combien de temps prend la vérification KYC ?', r: 'La vérification prend généralement 24 à 48 heures ouvrables après soumission de vos documents.' },
    ],
  },
  {
    categorie: 'Wallet & Paiements',
    items: [
      { q: 'Quels moyens de paiement sont acceptés ?', r: 'Orange Money, Wave, MTN Money et virement bancaire. Les dépôts sont instantanés pour les mobile money.' },
      { q: 'Y a-t-il des frais sur les dépôts et retraits ?', r: 'Les dépôts sont gratuits. Les retraits sont soumis à des frais de 1% du montant retiré, plafonnés à 5 000 FCFA.' },
      { q: 'Quel est le délai de traitement des retraits ?', r: 'Les retraits vers mobile money sont traités en 24h ouvrables. Les virements bancaires prennent 2 à 3 jours ouvrables.' },
    ],
  },
]

export default function FaqPage() {
  const [search, setSearch] = useState('')
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggle = (key: string) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }))

  const filtered = faqs.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.r.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter(cat => cat.items.length > 0)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-20 px-4 text-center">
        <p className="text-green-300 text-sm font-medium uppercase tracking-widest mb-3">FAQ</p>
        <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-4xl md:text-5xl font-bold mb-5">
          Questions fréquentes
        </h1>
        <p className="text-green-100 text-lg max-w-xl mx-auto mb-8">
          Tout ce que vous devez savoir sur A-FUND et l'investissement agricole.
        </p>
        <div className="relative max-w-md mx-auto">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une question..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl text-gray-800 text-sm outline-none"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-10">
          {filtered.map(cat => (
            <div key={cat.categorie}>
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-green-500 rounded-full inline-block" />
                {cat.categorie}
              </h2>
              <div className="space-y-2">
                {cat.items.map((item, i) => {
                  const key = `${cat.categorie}-${i}`
                  const open = !!openItems[key]
                  return (
                    <div key={i} className="card overflow-hidden">
                      <button
                        onClick={() => toggle(key)}
                        className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                      >
                        <span className="font-medium text-gray-800 text-sm">{item.q}</span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {open && (
                        <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                          {item.r}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Search size={32} className="mx-auto mb-3 opacity-30" />
              <p>Aucun résultat pour "{search}"</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA contact */}
      <section className="py-12 px-4 bg-gray-50 text-center">
        <p className="text-gray-600 mb-4">Vous ne trouvez pas votre réponse ?</p>
        <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
          Contacter le support
        </Link>
      </section>

      <Footer />
    </div>
  )
}