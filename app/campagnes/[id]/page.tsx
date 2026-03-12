import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, Users, Clock, Shield, Award, TrendingUp,
  CheckCircle, ArrowRight, ChevronLeft, Scale, Sprout, Building
} from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CampaignCard from '@/components/campaign/CampaignCard'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { campaigns } from '@/lib/data'
import {
  formatCurrency, formatCurrencyFull, formatDate,
  calculateProgress, calculateDaysLeft, getRiskLabel, getRiskColor
} from '@/lib/utils'

export async function generateStaticParams() {
  return campaigns.map(c => ({ id: c.slug }))
}

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = campaigns.find(c => c.slug === params.id)
  if (!campaign) notFound()

  const progress = calculateProgress(campaign.montantLeve, campaign.montantCible)
  const daysLeft = calculateDaysLeft(campaign.dateFin)
  const similar = campaigns
    .filter(c => c.id !== campaign.id && (c.produit === campaign.produit || c.region === campaign.region))
    .slice(0, 3)

  const statusVariant = campaign.status === 'levee' ? 'success' : campaign.status === 'production' ? 'info' : 'gray'
  const statusLabel = campaign.status === 'levee' ? 'En levée' : campaign.status === 'production' ? 'En production' : 'Terminée'

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary-600">Accueil</Link>
            <ChevronLeft className="w-3 h-3 rotate-180" />
            <Link href="/campagnes" className="hover:text-primary-600">Campagnes</Link>
            <ChevronLeft className="w-3 h-3 rotate-180" />
            <span className="text-gray-800 font-medium truncate max-w-xs">{campaign.titre}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero Image */}
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden">
              <Image
                src={campaign.image}
                alt={campaign.titre}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant={statusVariant}>{statusLabel}</Badge>
                {campaign.assurance && (
                  <Badge variant="primary">🛡️ Assuré</Badge>
                )}
              </div>
            </div>

            {/* Title Card */}
            <div className="card p-6">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />{campaign.ville}, {campaign.region}
                </span>
                <span className="font-semibold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full">
                  {campaign.produit}
                </span>
                <span className={'text-xs font-semibold px-2 py-1 rounded-full ' + getRiskColor(campaign.risque)}>
                  {getRiskLabel(campaign.risque)}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                {campaign.titre}
              </h1>
              <p className="text-gray-600 leading-relaxed">{campaign.description}</p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'ROI visé', value: campaign.roiMin + '-' + campaign.roiMax + '%', icon: TrendingUp, color: 'text-primary-600 bg-primary-50' },
                { label: 'Durée', value: campaign.dureeJours + ' jours', icon: Clock, color: 'text-blue-600 bg-blue-50' },
                { label: 'Surface', value: campaign.surface + ' ha', icon: Sprout, color: 'text-green-600 bg-green-50' },
                { label: 'Rendement', value: campaign.rendementAttendu + ' t', icon: Award, color: 'text-secondary-600 bg-secondary-50' },
              ].map(s => (
                <div key={s.label} className="card p-4 text-center">
                  <div className={'w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ' + s.color}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <p className="font-bold text-gray-900">{s.value}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Cooperative */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <Building className="w-5 h-5 text-primary-500" /> La coopérative
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Sprout className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{campaign.cooperativeNom}</p>
                  <p className="text-sm text-gray-500">{campaign.cooperativeMembers} membres · {campaign.ville}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="w-4 h-4 text-primary-500" />
                    <span className="text-xs text-primary-600 font-medium">Coopérative certifiée A-FUND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Purchase Contract */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <Scale className="w-5 h-5 text-blue-500" /> Contrat d&apos;achat
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Acheteur', value: campaign.acheteur },
                  { label: 'Prix garanti', value: formatCurrencyFull(campaign.prixGarantiKg) + '/kg' },
                  { label: 'Quantité contractée', value: campaign.quantiteContratTonnes + ' tonnes' },
                ].map(item => (
                  <div key={item.label} className="bg-blue-50 rounded-xl p-3">
                    <p className="text-xs text-blue-600 font-medium mb-1">{item.label}</p>
                    <p className="font-bold text-blue-900">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Agronomic Report */}
            <div className="card p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
                <Award className="w-5 h-5 text-green-500" /> Rapport agronomique
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{campaign.agronome}</p>
                  <p className="text-sm text-gray-500">Agronome certifié A-FUND</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">{campaign.scoreAgronomique}</p>
                  <p className="text-xs text-gray-500">/100</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">Score de viabilité</span>
                  <span className="text-sm font-bold text-green-800">{campaign.scoreAgronomique}/100</span>
                </div>
                <ProgressBar value={campaign.scoreAgronomique} color="success" />
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* Investment Widget */}
              <div className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                  Investir dans ce projet
                </h3>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-primary-600 text-lg">
                      {formatCurrency(campaign.montantLeve)}
                    </span>
                    <span className="text-gray-400 text-sm">
                      sur {formatCurrency(campaign.montantCible)}
                    </span>
                  </div>
                  <ProgressBar value={progress} />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{progress.toFixed(0)}% financé</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />{campaign.nombreInvestisseurs}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {daysLeft > 0 ? daysLeft + ' j.' : 'Terminé'}
                    </span>
                  </div>
                </div>

                {/* ROI Calculator */}
                <div className="bg-primary-50 rounded-xl p-4 mb-4">
                  <p className="text-sm font-semibold text-primary-800 mb-3">
                    Calculateur de rendement
                  </p>
                  <div className="space-y-2 text-sm">
                    {[50000, 100000, 250000, 500000].map(amount => (
                      <div key={amount} className="flex justify-between">
                        <span className="text-gray-600">{formatCurrencyFull(amount)}</span>
                        <span className="font-bold text-primary-700">
                          +{formatCurrencyFull(Math.round(amount * campaign.roiMin / 100))}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/register"
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Investir maintenant <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-xs text-gray-400 text-center mt-3">
                  Minimum 5 000 FCFA · Sécurisé
                </p>

                {/* Guarantees */}
                <div className="mt-4 space-y-2">
                  {[
                    "Contrat d'achat garanti",
                    'Validation agronomique',
                    campaign.assurance ? 'Assurance récolte incluse' : 'Rendement certifié',
                  ].map(g => (
                    <div key={g} className="flex items-center gap-2 text-xs text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>

              {/* Calendar */}
              <div className="card p-5">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm">Calendrier</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Début levée', date: campaign.dateDebut },
                    { label: 'Fin levée', date: campaign.dateFin },
                    { label: 'Récolte prévue', date: campaign.dateRecolte },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-medium text-gray-800">{formatDate(item.date)}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Campaigns */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Campagnes similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map(c => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}