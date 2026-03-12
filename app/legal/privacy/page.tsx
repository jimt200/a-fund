import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-16 px-4 text-center">
        <p className="text-green-300 text-sm font-medium uppercase tracking-widest mb-3">Légal</p>
        <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-4xl font-bold mb-4">
          Politique de Confidentialité
        </h1>
        <p className="text-green-200 text-sm">Dernière mise à jour : 1er janvier 2024</p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-10">

          {[
            {
              titre: '1. Responsable du traitement',
              contenu: `HOKMA Labs SARL, dont le siège social est situé à Cocody, Riviera Palmeraie, Abidjan, Côte d'Ivoire, est responsable du traitement des données personnelles collectées via la plateforme A-FUND. Contact : privacy@afund.ci`,
            },
            {
              titre: '2. Données collectées',
              contenu: `Nous collectons les données suivantes : données d'identification (nom, prénom, date de naissance, nationalité), données de contact (email, téléphone, adresse), données KYC (copie de pièce d'identité, justificatif de domicile), données financières (transactions, investissements, solde wallet), et données de navigation (adresse IP, cookies, logs de connexion).`,
            },
            {
              titre: '3. Finalités du traitement',
              contenu: `Vos données sont traitées pour : l'exécution du contrat de service (gestion de votre compte, traitement des investissements et paiements), la conformité réglementaire (vérification KYC, lutte contre le blanchiment), la sécurité de la plateforme, l'amélioration de nos services, et la communication commerciale (avec votre consentement).`,
            },
            {
              titre: '4. Conservation des données',
              contenu: `Vos données sont conservées pendant toute la durée de votre relation contractuelle avec A-FUND, augmentée des délais légaux de conservation applicables (5 ans pour les données financières, 10 ans pour les données KYC conformément aux obligations UEMOA).`,
            },
            {
              titre: '5. Partage des données',
              contenu: `Vos données peuvent être partagées avec nos prestataires techniques (hébergement, paiement), les autorités de régulation sur demande légale, et les coopératives agricoles dans le strict cadre des investissements réalisés. Nous ne vendons jamais vos données à des tiers.`,
            },
            {
              titre: '6. Vos droits',
              contenu: `Conformément aux lois applicables, vous disposez des droits d'accès, de rectification, d'effacement, de portabilité et d'opposition concernant vos données personnelles. Pour exercer ces droits, contactez-nous à privacy@afund.ci. Vous pouvez également introduire une réclamation auprès de l'autorité de protection des données compétente.`,
            },
            {
              titre: '7. Cookies',
              contenu: `A-FUND utilise des cookies techniques nécessaires au fonctionnement de la plateforme, des cookies analytiques (avec votre consentement) pour améliorer l'expérience utilisateur. Vous pouvez gérer vos préférences cookies depuis les paramètres de votre navigateur.`,
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
            <Link href="/legal/terms" className="text-green-600 hover:underline">CGU</Link>
            <Link href="/legal/mentions" className="text-green-600 hover:underline">Mentions légales</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}