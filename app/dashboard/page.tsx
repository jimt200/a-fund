'use client'

import Link from 'next/link'
import {
  TrendingUp, Wallet, ArrowUpRight, Bell,
  CheckCircle, Clock, Sprout, PiggyBank, BarChart3
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { DASHBOARD_NAV } from '@/lib/constants'
import { currentUser, investments, transactions, notifications } from '@/lib/data'
import { formatCurrency } from '@/lib/utils'
import StatsCard from '@/components/ui/StatsCard'
import Badge from '@/components/ui/Badge'

export default function DashboardPage() {
  const activeInvestments = investments.filter(i => i.status === 'actif')
  const unreadNotifs = notifications.filter(n => !n.lu).length

  return (
    <DashboardLayout
      navItems={DASHBOARD_NAV}
      title="Tableau de bord"
      subtitle={`Bonjour, ${currentUser.prenom} 👋`}
    >
      <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            label="Solde wallet"
            value={formatCurrency(currentUser.soldeWallet)}
            icon={Wallet}
            change="+12%"
            changeType="up"
          />
          <StatsCard
            label="Total investi"
            value={formatCurrency(currentUser.totalInvesti)}
            icon={TrendingUp}
            change="+8%"
            changeType="up"
          />
          <StatsCard
            label="Rendements"
            value={formatCurrency(currentUser.totalROI)}
            icon={PiggyBank}
            change="+24%"
            changeType="up"
          />
          <StatsCard
            label="Investissements actifs"
            value={String(activeInvestments.length)}
            icon={BarChart3}
          />
        </div>

        {/* Actions rapides */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/dashboard/wallet/deposit"
            className="card p-4 flex items-center gap-3 hover:border-green-200 hover:shadow-md transition-all group"
          >
            <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors">
              <Wallet size={20} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">Déposer</p>
              <p className="text-xs text-gray-400">Alimenter mon wallet</p>
            </div>
          </Link>
          <Link
            href="/campagnes"
            className="card p-4 flex items-center gap-3 hover:border-green-200 hover:shadow-md transition-all group"
          >
            <div className="bg-emerald-100 p-3 rounded-xl group-hover:bg-emerald-200 transition-colors">
              <Sprout size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">Investir</p>
              <p className="text-xs text-gray-400">Explorer les campagnes</p>
            </div>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Mes investissements */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800">
                Mes investissements
              </h2>
              <Link href="/dashboard/investments" className="text-xs text-green-600 hover:underline flex items-center gap-1">
                Voir tout <ArrowUpRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {investments.slice(0, 3).map(inv => (
                <div key={inv.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <TrendingUp size={14} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 line-clamp-1">{inv.campaignTitre}</p>
                      <p className="text-xs text-gray-400">{formatCurrency(inv.montant)}</p>
                    </div>
                  </div>
                  <Badge variant={inv.status === 'actif' ? 'success' : inv.status === 'en_attente' ? 'warning' : 'gray'}>
                    {inv.status === 'actif' ? 'Actif' : inv.status === 'en_attente' ? 'En attente' : 'Terminé'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800 flex items-center gap-2">
                <Bell size={16} className="text-green-600" />
                Notifications
                {unreadNotifs > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifs}
                  </span>
                )}
              </h2>
              <Link href="/dashboard/notifications" className="text-xs text-green-600 hover:underline">
                Voir tout
              </Link>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 4).map(notif => (
                <div key={notif.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className={`p-1.5 rounded-lg mt-0.5 ${notif.lu ? 'bg-gray-100' : 'bg-green-100'}`}>
                    {notif.lu
                      ? <CheckCircle size={14} className="text-gray-400" />
                      : <Clock size={14} className="text-green-600" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm leading-snug ${notif.lu ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                      {notif.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{notif.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Transactions récentes */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800">
              Transactions récentes
            </h2>
            <Link href="/dashboard/transactions" className="text-xs text-green-600 hover:underline flex items-center gap-1">
              Voir tout <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 4).map(tx => (
              <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-800">{tx.description}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
                <span className={`text-sm font-bold ${tx.type === 'depot' || tx.type === 'roi' ? 'text-green-600' : 'text-red-500'}`}>
                  {tx.type === 'depot' || tx.type === 'roi' ? '+' : '-'}{formatCurrency(tx.montant)}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}