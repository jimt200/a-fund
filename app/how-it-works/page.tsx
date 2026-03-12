import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { UserPlus, Search, TrendingUp, Banknote, ShieldCheck, FileText, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const stepsInvestisseur = [
  { num: '01', icon: <UserPlus size={22} />, titre: 'Créez votre compte', desc: 'Inscription gratuite en 2 minutes. Vérifiez votre identité (KYC) pour débloquer toutes les fonctionnalités.' },
  { num: '02', icon: <Banknote size={22} />, titre: 'Alimentez votre wallet', desc: 'Déposez des fonds via Orange Money, Wave, MTN Money ou virement bancaire. Minimum 10 000 FCFA.' },
  { num: '03', icon: <Search size={22} />, titre: 'Choisissez une campagne', desc: 'Parcourez les campagnes certifiées. Consultez les scores agronomiques, contrats d\'achat et ROI estimés.' },
  { num: '04', icon: <TrendingUp size={22} />, titre: 'Investissez & suivez', desc: 'Investissez en quelques clics. Suivez l\'avancement via rapports agronomiques et mises à jour en temps réel.' },
  { num: '05', icon: <Star size={22} />, titre: 'Recevez vos rendements', desc: 'À la récolte, votre capital + ROI sont versés sur votre wallet. Retirez ou réinvestissez librement.' },
]

const guarantees = [
  { icon: <ShieldCheck size={20} className="text-green-600" />, titre: 'Score agronomique ≥ 80/100', desc: 'Chaque projet est évalué par un agronome certifié indépendant avant publication.' },
  { icon: <FileText size={20} className="text-green-600" />, titre: 'Contrat d\'achat pré-signé', desc: 'Un acheteur vérifié (Nestlé, OLAM, Cargill...) s\'engage à acheter la récolte avant la levée de fonds.' },
  { icon: <ShieldCheck size={20} className="text-green-600" />, titre: 'Assurance récolte', desc: 'Les campagnes éligibles bénéficient d\'une couverture assurance en cas d\'aléas climatiques.' },
]

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-20 px-4 text-center">
        <p className="text-green-300 text-sm font-medium uppercase tracking-widest mb-3">Comment ça marche</p>
        <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-4xl md:text-5xl font-bold mb-5">
          Investir en 5 étapes simples
        </h1>
        <p className="text-green-100 text-lg max-w-xl mx-auto">
          De l'inscription au versement de vos rendements, voici comment fonctionne A-FUND.
        </p>
      </section>

      {/* Étapes investisseur */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-center text-gray-800 mb-12">
            Pour les investisseurs
          </h2>
          <div className="space-y-6">
            {stepsInvestisseur.map((step, i) => (
              <div key={i} className="flex gap-5 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                    {step.num}
                  </div>
                  {i < stepsInvestisseur.length - 1 && (
                    <div className="w-px h-10 bg-green-100 mt-2" />
                  )}
                </div>
                <div className="card p-5 flex-1 flex gap-4 items-start">
                  <div className="bg-green-50 p-2.5 rounded-xl text-green-600 flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{step.titre}</h3>
                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garanties */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-center text-gray-800 mb-3">
            Notre mécanisme de protection à 3 niveaux
          </h2>
          <p className="text-center text-gray-500 mb-10 text-sm">
            Taux de succès de 97.4% depuis notre lancement
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {guarantees.map((g, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="bg-green-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  {g.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 text-sm">{g.titre}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ rapide */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-center text-gray-800 mb-10">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {[
              { q: 'Quel est le montant minimum pour investir ?', r: '10 000 FCFA par campagne, sans limite maximale.' },
              { q: 'Quand est-ce que je récupère mon argent ?', r: 'À la date de récolte prévue, votre capital + ROI sont versés sur votre wallet A-FUND automatiquement.' },
              { q: 'Que se passe-t-il en cas de mauvaise récolte ?', r: 'Les campagnes assurées sont couvertes. Pour les autres, notre équipe négocie avec la coopérative un plan de remboursement.' },
              { q: 'Puis-je investir dans plusieurs campagnes ?', r: 'Oui, il n\'y a pas de limite. Diversifier vos investissements réduit le risque global.' },
            ].map((faq, i) => (
              <div key={i} className="card p-5">
                <p className="font-semibold text-gray-800 text-sm">{faq.q}</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{faq.r}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-green-700 text-white text-center">
        <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-3xl font-bold mb-4">
          Prêt à investir ?
        </h2>
        <p className="text-green-200 mb-8">Rejoignez 1 200+ investisseurs qui font fructifier leur épargne.</p>
        <Link href="/campagnes" className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-3 rounded-xl hover:bg-green-50 transition-colors">
          Voir les campagnes <ArrowRight size={16} />
        </Link>
      </section>

      <Footer />
    </div>
  )
}