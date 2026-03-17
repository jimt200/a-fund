'use client'

import { useState } from 'react'
import {
  FileText, Download, TrendingUp, Sprout,
  Calendar, Eye, BarChart3, CheckCircle
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { COOPERATIVE_NAV } from '@/lib/constants'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'

const rapports = [
  {
    id: 'r001',
    titre: 'Rapport agronomique Q1 2024 — Tomates cerises',
    type: 'agronomique',
    campagne: 'Tomates cerises bio 2024',
    agronome: 'Dr. Kouassi Emmanuel',
    date: '2024-04-01',
    score: 92,
    status: 'publie',
  },
  {
    id: 'r002',
    titre: 'Rapport de production — Maïs hybride N\'Zi',
    type: 'production',
    campagne: 'Maïs hybride Vallée N\'Zi',
    agronome: 'M. Bamba Seydou',
    date: '2024-03-15',
    score: 88,
    status: 'publie',
  },
  {
    id: 'r003',
    titre: 'Rapport financier — Campagne Riz Comoé',
    type: 'financier',
    campagne: 'Riz paddy Comoé 2023',
    agronome: 'M. Kassi Théodore',
    date: '2024-05-01',
    score: 91,
    status: 'publie',
  },
  {
    id: 'r004',
    titre: 'Rapport intermédiaire — Anacarde Côte Ouest',
    type: 'intermediaire',
    campagne: 'Anacarde premium 2024',
    agronome: 'Mme. Touré Aïssatou',
    date: '2024-04-20',
    score: 94,
    status: 'brouillon',
  },
  {
    id: 'r005',
    titre: 'Rapport de clôture — Riz paddy 2023',
    type: 'cloture',
    campagne: 'Riz paddy Comoé 2023',
    agronome: 'M. Kassi Théodore',
    date: '2024-03-01',
    score: 89,
    status: 'publie',
  },
]

const typeColors: Record<string, string> = {
  agronomique: 'bg-green-100 text-green-700',
  production: 'bg-blue-100 text-blue-700',
  financier: 'bg-purple-100 text-purple-700',
  intermediaire: 'bg-amber-100 text-amber-700',
  cloture: 'bg-gray-100 text-gray-700',
}

const typeLabels: Record<string, string> = {
  agronomique: 'Agronomique',
  production: 'Production',
  financier: 'Financier',
  intermediaire: 'Intermédiaire',
  cloture: 'Clôture',
}

export default function ReportsPage() {
  const [selected, setSelected] = useState<string | null>(null)
  const selectedRapport = rapports.find(r => r.id === selected)

  return (
    <DashboardLayout navItems={COOPERATIVE_NAV} title="Rapports" subtitle="Coopérative Agri-Bouaké">
      <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total rapports', value: rapports.length, icon: FileText, color: 'bg-green-100 text-green-600' },
            { label: 'Publiés', value: rapports.filter(r => r.status === 'publie').length, icon: CheckCircle, color: 'bg-blue-100 text-blue-600' },
            { label: 'Score moyen', value: Math.round(rapports.reduce((s, r) => s + r.score, 0) / rapports.length) + '/100', icon: BarChart3, color: 'bg-purple-100 text-purple-600' },
            { label: 'Ce mois', value: '2', icon: Calendar, color: 'bg-amber-100 text-amber-600' },
          ].map(s => (
            <div key={s.label} className="card p-5 flex items-center gap-3">
              <div className={`p-3 rounded-xl ${s.color}`}>
                <s.icon size={20} />
              </div>
              <div>
                <p style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-bold text-gray-800">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Liste */}
          <div className="card p-6">
            <h2 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-green-600" /> Tous les rapports
            </h2>
            <div className="space-y-3">
              {rapports.map(r => (
                <div
                  key={r.id}
                  onClick={() => setSelected(r.id === selected ? null : r.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selected === r.id ? 'border-green-400 bg-green-50' : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-sm font-semibold text-gray-800 leading-snug">{r.titre}</p>
                    <Badge variant={r.status === 'publie' ? 'success' : 'warning'}>
                      {r.status === 'publie' ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[r.type]}`}>
                      {typeLabels[r.type]}
                    </span>
                    <span className="text-xs text-gray-400">{r.date}</span>
                    <span className="text-xs text-green-600 font-semibold">Score: {r.score}/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Détail */}
          <div className="card p-6">
            {selectedRapport ? (
              <>
                <div className="flex items-start justify-between mb-6">
                  <h2 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800 leading-snug">
                    {selectedRapport.titre}
                  </h2>
                  <button className="flex items-center gap-1 text-xs text-green-600 hover:text-green-800 bg-green-50 px-3 py-1.5 rounded-lg">
                    <Download size={13} /> PDF
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Campagne</span>
                    <span className="font-medium text-gray-800">{selectedRapport.campagne}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Agronome</span>
                    <span className="font-medium text-gray-800">{selectedRapport.agronome}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-800">{selectedRapport.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Statut</span>
                    <Badge variant={selectedRapport.status === 'publie' ? 'success' : 'warning'}>
                      {selectedRapport.status === 'publie' ? 'Publié' : 'Brouillon'}
                    </Badge>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">Score de viabilité</span>
                      <span className="font-bold text-green-600">{selectedRapport.score}/100</span>
                    </div>
                    <ProgressBar value={selectedRapport.score} color="success" />
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 mt-4">
                    <p className="text-xs text-green-700 font-medium mb-2">Résumé exécutif</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Le rapport indique une progression conforme aux prévisions avec un score agronomique de {selectedRapport.score}/100.
                      Les conditions climatiques ont été favorables et les pratiques culturales respectées.
                      La récolte est estimée dans les délais prévus.
                    </p>
                  </div>

                  <button className="btn-primary w-full flex items-center justify-center gap-2 text-sm mt-2">
                    <Eye size={15} /> Voir le rapport complet
                  </button>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="bg-gray-100 p-5 rounded-full mb-4">
                  <FileText size={32} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">Sélectionnez un rapport pour voir les détails</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}