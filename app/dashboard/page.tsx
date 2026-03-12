import Link from 'next/link'
import {
  TrendingUp, Wallet, ArrowRight, Clock,
  CheckCircle, AlertCircle, Sprout
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import StatsCard from '@/components/ui/StatsCard'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'
import { DASHBOARD_NAV } from '@/lib/constants'
import { currentUser, investments, transactions, campaigns } from '@/lib/data'
import { formatCurrency, formatCurrencyFull, formatDate, calculateProgress } from '@/lib/utils'

export default function DashboardPage() {
  const activeInvestments = investments.filter(i => i.status === 'actif')
  const recentTransactions = transactions.slice(0, 4)
  const recommendedCampaigns = campaigns.filter(c => c.status === 'levee').slice(0, 2)

  return (
    <DashboardLayout navItems={DASHBOARD_NAV} title="Mon tableau de bord">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
          Bonjour, {currentUser.prenom} 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Voici un aperçu de votre portefeuille au {new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          label="Solde wallet"
          value={formatCurrency(currentUser.soldeWallet)}
          icon={Wallet}
          color="primary"
          change="Disponible"
          changeType="neutral"
        />
        <StatsCard
          label="Total investi"
          value={formatCurrency(currentUser.totalInvesti)}
          icon={TrendingUp}
          color="secondary"
          change="+2 ce mois"
          changeType="up"
        />
        <StatsCard
          label="ROI total gagné"
          value={formatCurrency(currentUser.totalROI)}
          icon={TrendingUp}
          color="blue"
          change="+131 250 FCFA"
          changeType="up"
        />
        <StatsCard
          label="Investissements actifs"
          value={String(activeInvestments.length)}
          icon={Sprout}
          color="purple"
          change="En cours"
          changeType="neutral"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Active Investments */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
              Investissements actifs
            </h2>
            <Link
              href="/dashboard/investments"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
            >
              Voir tout <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {activeInvestments.map(inv => {
            const campaign = campaigns.find(c => c.id === inv.campaignId)
            const progress = campaign
              ? calculateProgress(campaign.montantLeve, campaign.montantCible)
              : 0
            return (
              <div key={inv.id} className="card p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{inv.campaignTitre}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{inv.campaignProduit}</p>
                  </div>
                  <Badge variant="success" size="sm">Actif</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Investi</p>
                    <p className="font-bold text-gray-900 text-sm">{formatCurrency(inv.montant)}</p>
                  </div>
                  <div className="bg-primary-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">ROI attendu</p>
                    <p className="font-bold text-primary-600 text-sm">{inv.roiExpected}%</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2">
                    <p className="text-xs text-gray-500">Gain prévu</p>
                    <p className="font-bold text-green-600 text-sm">
                      +{formatCurrency(Math.round(inv.montant * inv.roiExpected / 100))}
                    </p>
                  </div>
                </div>
                {campaign && (
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progression campagne</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <ProgressBar value={progress} size="sm" />
                  </div>
                )}
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">
                    Retour prévu le {formatDate(inv.dateRetourPrev)}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Wallet Card */}
          <div className="card p-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <p className="text-primary-100 text-sm font-medium mb-1">Mon wallet</p>
            <p className="text-3xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              {formatCurrencyFull(currentUser.soldeWallet)}
            </p>
            <div className="flex gap-2">
              <Link
                href="/dashboard/wallet/deposit"
                className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 px-3 rounded-lg text-center transition-colors"
              >
                + Recharger
              </Link>
              <Link
                href="/dashboard/wallet/withdraw"
                className="flex-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold py-2 px-3 rounded-lg text-center transition-colors"
              >
                Retirer
              </Link>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900 text-sm" style={{ fontFamily: 'Georgia, serif' }}>
                Transactions récentes
              </h3>
              <Link
                href="/dashboard/transactions"
                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                Voir tout
              </Link>
            </div>
            <div className="space-y-3">
              {recentTransactions.map(tx => (
                <div key={tx.id} className="flex items-center gap-3">
                  <div className={
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ' +
                    (tx.type === 'roi' || tx.type === 'depot'
                      ? 'bg-green-100'
                      : 'bg-red-100')
                  }>
                    {tx.type === 'roi' || tx.type === 'depot'
                      ? <CheckCircle className="w-4 h-4 text-green-600" />
                      : <AlertCircle className="w-4 h-4 text-red-500" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">{tx.description}</p>
                    <p className="text-xs text-gray-400">{formatDate(tx.date)}</p>
                  </div>
                  <span className={
                    'text-xs font-bold flex-shrink-0 ' +
                    (tx.type === 'roi' || tx.type === 'depot'
                      ? 'text-green-600'
                      : 'text-red-500')
                  }>
                    {tx.type === 'roi' || tx.type === 'depot' ? '+' : '-'}
                    {formatCurrency(tx.montant)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended */}
          <div className="card p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Campagnes recommandées
            </h3>
            <div className="space-y-3">
              {recommendedCampaigns.map(c => (
                <Link
                  key={c.id}
                  href={'/campagnes/' + c.slug}
                  className="flex items-center gap-3 hover:bg-gray-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sprout className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 truncate">{c.produit}</p>
                    <p className="text-xs text-gray-400">{c.region}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-primary-600">{c.roiMin}-{c.roiMax}%</p>
                    <p className="text-xs text-gray-400">ROI</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/campagnes"
              className="block text-center text-xs text-primary-600 font-medium mt-4 hover:text-primary-700"
            >
              Voir toutes les campagnes →
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}