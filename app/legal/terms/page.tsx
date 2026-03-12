import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-16 px-4 text-center">
        <p className="text-green-300 text-sm font-medium uppercase tracking-widest mb-3">Légal</p>
        <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-4xl font-bold mb-4">
          Conditions Générales d&apos;Utilisation
        </h1>
        <p className="text-green-200 text-sm">Dernière mise à jour : 1er janvier 2024</p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {[
            {
              titre: '1. Objet',
              contenu: "Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de la plateforme A-FUND, éditée par HOKMA Labs SARL, société de droit ivoirien immatriculée au RCCM d'Abidjan. En accédant à la plateforme, vous acceptez sans réserve les présentes CGU.",
            },
            {
              titre: '2. Description du service',
              contenu: "A-FUND est une plateforme de financement participatif agricole qui met en relation des investisseurs particuliers et professionnels avec des coopératives agricoles ivoiriennes. A-FUND agit en qualité d'intermédiaire et ne garantit pas les rendements annoncés, qui sont des estimations basées sur des analyses agronomiques indépendantes.",
            },
            {
              titre: "3. Conditions d'accès",
              contenu: "Pour utiliser la plateforme, vous devez être une personne physique majeure (18 ans ou plus) ou une personne morale régulièrement constituée, résider en Côte d'Ivoire ou dans un pays membre de l'UEMOA, et compléter la vérification d'identité (KYC) pour accéder aux fonctionnalités d'investissement et de retrait.",
            },
            {
              titre: "4. Risques liés à l'investissement",
              contenu: "L'investissement dans des projets agricoles comporte des risques de perte partielle ou totale du capital investi. Les performances passées ne préjugent pas des performances futures. A-FUND met en œuvre des mécanismes de protection (assurance, contrats d'achat, validation agronomique) mais ne peut garantir les rendements. Nous vous recommandons de ne pas investir des sommes que vous ne pouvez vous permettre de perdre.",
            },
            {
              titre: '5. Wallet et paiements',
              contenu: "Les fonds déposés sur votre wallet A-FUND sont conservés sur un compte séquestre dédié, séparé des fonds propres de HOKMA Labs. Les dépôts sont acceptés via Orange Money, Wave, MTN Money et virement bancaire. Les retraits sont traités sous 24 à 72 heures ouvrables.",
            },
            {
              titre: '6. Propriété intellectuelle',
              contenu: "L'ensemble des contenus de la plateforme (marques, logos, textes, images, données) sont la propriété exclusive de HOKMA Labs ou de ses partenaires. Toute reproduction, représentation ou exploitation sans autorisation préalable est strictement interdite.",
            },
            {
              titre: '7. Modification des CGU',
              contenu: "HOKMA Labs se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront informés de toute modification substantielle par email ou notification sur la plateforme. La poursuite de l'utilisation de la plateforme après modification vaut acceptation des nouvelles CGU.",
            },
            {
              titre: '8. Droit applicable',
              contenu: "Les présentes CGU sont soumises au droit ivoirien. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, les tribunaux compétents d'Abidjan seront seuls compétents.",
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-lg font-bold text-gray-800 mb-3">
                {section.titre}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">{section.contenu}</p>
            </div>
          ))}

          <div className="flex gap-4 pt-4 border-t border-gray-100 text-sm">
            <Link href="/legal/privacy" className="text-green-600 hover:underline">Politique de confidentialité</Link>
            <Link href="/legal/mentions" className="text-green-600 hover:underline">Mentions légales</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}