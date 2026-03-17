'use client'

import { useState } from 'react'
import {
  PiggyBank, TrendingUp, ArrowDownLeft, ArrowUpRight,
  Download, Filter, CheckCircle, Clock, XCircle
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { COOPERATIVE_NAV } from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

const stats = [
  { label: 'Solde disponible', value: '14 250 000 FCFA', change: '+8%', up: true },
  { label: 'Fonds en campagne', value: '32 500 000 FCFA', change: '+15%', up: true },
  { label: 'ROI distribué', value: '6 800 000 FCFA', change: '+22%', up: true },
  { label: 'En attente', value: '1 200 000 FCFA', change: '-', up: null },
]

const transactions = [
  { id: 't001', date: '2024-05-02', description: 'Levée de fonds - Tomates bio', type: 'entree', montant: 6120000, status: 'valide' },
  { id: 't002', date: '2024-04-28', description: 'Achat intrants - Campagne Maïs', type: 'sortie', montant: 2400000, status: 'valide' },
  { id: 't003', date: '2024-04-20', description: 'Distribution ROI - Riz Comoé', type: 'sortie', montant: 1530000, status: 'valide' },
  { id: 't004', date: '2024-04-15', description: 'Levée de fonds - Anacarde', type: 'entree', montant: 18750000, status: 'valide' },
  { id: 't005', date: '2024-04-10', description: 'Frais agronome - Dr. Kouassi', type: 'sortie', montant: 350000, status: 'valide' },
  { id: 't006', date: '2024-04-05', description: 'Virement investisseurs - Sésame', type: 'entree', montant: 4200000, status: 'en_attente' },
  { id: 't007', date: '2024-03-28', description: 'Assurance récolte CNAAS', type: 'sortie', montant: 480000, status: 'valide' },
  { id: 't008', date: '2024-03-20', description: 'Remboursement capital - Riz', type: 'sortie', montant: 9000000, status: 'valide' },
]

export default function TreasuryPage() {
  const [filter, setFilter] = useState('tous')

  const filtered = filter === 'tous' ? transactions : transactions.filter(t => t.type === filter)

  return (
    <DashboardLayout navItems={COOPERATIVE_NAV} title="Trésorerie" subtitle="Coopérative Agri-Bouaké">
      <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="card p-5">
              <p className="text-xs text-gray-500 mb-1">{s.label}</p>
              <p style={{ fontFamily: 'Georgia, serif' }} className="text-lg font-bold text-gray-800">{s.value}</p>
              {s.up !== null && (
                <p className={`text-xs mt-1 font-medium ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                  {s.up ? '↑' : '↓'} {s.change} ce mois
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="card p-4 flex items-center gap-3 hover:border-green-300 transition-all group">
            <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-colors">
              <ArrowDownLeft size={20} className="text-green-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-gray-800">Recevoir des fonds</p>
              <p className="text-xs text-gray-400">Depuis les investisseurs</p>
            </div>
          </button>
          <button className="card p-4 flex items-center gap-3 hover:border-blue-300 transition-all group">
            <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-colors">
              <ArrowUpRight size={20} className="text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm text-gray-800">Effectuer un virement</p>
              <p className="text-xs text-gray-400">Vers fournisseurs ou membres</p>
            </div>
          </button>
        </div>

        {/* Transactions */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800 flex items-center gap-2">
              <PiggyBank size={18} className="text-green-600" /> Mouvements de fonds
            </h2>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-xl p-1 text-xs">
                {['tous', 'entree', 'sortie'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                      filter === f ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    {f === 'tous' ? 'Tous' : f === 'entree' ? 'Entrées' : 'Sorties'}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 px-3 py-2 border border-gray-200 rounded-xl">
                <Download size={13} /> Exporter
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {filtered.map(tx => (
              <div key={tx.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${tx.type === 'entree' ? 'bg-green-100' : 'bg-red-50'}`}>
                    {tx.type === 'entree'
                      ? <ArrowDownLeft size={16} className="text-green-600" />
                      : <ArrowUpRight size={16} className="text-red-500" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{tx.description}</p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${tx.type === 'entree' ? 'text-green-600' : 'text-red-500'}`}>
                    {tx.type === 'entree' ? '+' : '-'}{formatCurrency(tx.montant)}
                  </span>
                  <Badge variant={tx.status === 'valide' ? 'success' : 'warning'}>
                    {tx.status === 'valide' ? 'Validé' : 'En attente'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}