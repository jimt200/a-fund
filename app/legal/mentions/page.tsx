import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function MentionsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-16 px-4 text-center">
        <p className="text-green-300 text-sm font-medium uppercase tracking-widest mb-3">Légal</p>
        <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-4xl font-bold mb-4">
          Mentions Légales
        </h1>
        <p className="text-green-200 text-sm">Dernière mise à jour : 1er janvier 2024</p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {[
            {
              titre: 'Éditeur de la plateforme',
              items: [
                { label: 'Société', value: 'HOKMA Labs SARL' },
                { label: 'Forme juridique', value: 'Société à Responsabilité Limitée (SARL)' },
                { label: 'Capital social', value: '10 000 000 FCFA' },
                { label: 'RCCM', value: 'CI-ABJ-2022-B-XXXXX' },
                { label: 'Siège social', value: 'Cocody, Riviera Palmeraie, Abidjan, Côte d\'Ivoire' },
                { label: 'Email', value: 'legal@afund.ci' },
                { label: 'Téléphone', value: '+225 27 20 00 00 00' },
                { label: 'Directeur de publication', value: 'Joël YEMIAN, CEO' },
              ],
            },
            {
              titre: 'Hébergement',
              items: [
                { label: 'Hébergeur', value: 'Vercel Inc.' },
                { label: 'Adresse', value: '340 Pine Street, Suite 701, San Francisco, CA 94104, USA' },
                { label: 'Site', value: 'https://vercel.com' },
              ],
            },
            {
              titre: 'Régulation financière',
              items: [
                { label: 'Cadre réglementaire', value: 'Conforme aux directives UEMOA sur les services de paiement' },
                { label: 'Autorité de tutelle', value: 'Ministère de l\'Économie et des Finances de Côte d\'Ivoire' },
                { label: 'Agrément', value: 'En cours d\'obtention auprès de la BCEAO' },
              ],
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-lg font-bold text-gray-800 mb-4">
                {section.titre}
              </h2>
              <div className="card overflow-hidden">
                {section.items.map((item, j) => (
                  <div key={j} className={`flex gap-4 px-5 py-3 text-sm ${j % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <span className="text-gray-500 w-40 flex-shrink-0">{item.label}</span>
                    <span className="text-gray-800 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex gap-4 pt-4 border-t border-gray-100 text-sm">
            <Link href="/legal/terms" className="text-green-600 hover:underline">CGU</Link>
            <Link href="/legal/privacy" className="text-green-600 hover:underline">Politique de confidentialité</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}