'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ProgressBar from '@/components/ui/ProgressBar'
import Badge from '@/components/ui/Badge'
import { investments, campaigns } from '@/lib/data'
import { DASHBOARD_NAV } from '@/lib/constants'
import { TrendingUp, Sprout, Clock, CheckCircle, Filter, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const statusLabel: Record<string, string> = {
  actif: 'Actif',
  termine: 'Terminé',
  en_attente: 'En attente',
}

const statusColor: Record<string, 'success' | 'warning' | 'gray'> = {
  actif: 'success',
  termine: 'gray',
  en_attente: 'warning',
}

function formatMontant(n: number) {
  return n.toLocaleString('fr-CI') + ' FCFA'
}

export default function InvestmentsPage() {
  const [filtre, setFiltre] = useState<'tous' | 'actif' | 'termine'>('tous')

  const filtered = investments.filter(inv =>
    filtre === 'tous' ? true : inv.status === filtre
  )

  const totalInvesti = investments.reduce((s, i) => s + i.montant, 0)
  const totalActif = investments.filter(i => i.status === 'actif').reduce((s, i) => s + i.montant, 0)
  const totalROI = investments.filter(i => i.roiActual).reduce((s, i) => s + i.montant * (i.roiActual! / 100), 0)

  return (
    <DashboardLayout navItems={DASHBOARD_NAV} title="Mes Investissements">
      <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-5 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <TrendingUp className="text-green-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total investi</p>
              <p className="font-bold text-gray-800">{formatMontant(totalInvesti)}</p>
            </div>
          </div>
          <div className="card p-5 flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-xl">
              <Sprout className="text-emerald-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Actifs en cours</p>
              <p className="font-bold text-gray-800">{formatMontant(totalActif)}</p>
            </div>
          </div>
          <div className="card p-5 flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-xl">
              <CheckCircle className="text-yellow-600" size={22} />
            </div>
            <div>
              <p className="text-sm text-gray-500">ROI encaissé</p>
              <p className="font-bold text-gray-800">{formatMontant(totalROI)}</p>
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          {(['tous', 'actif', 'termine'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                filtre === f
                  ? 'bg-green-600 text-white border-green-600'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
              }`}
            >
              {f === 'tous' ? 'Tous' : f === 'actif' ? 'Actifs' : 'Terminés'}
            </button>
          ))}
        </div>

        {/* Liste */}
        <div className="space-y-4">
          {filtered.map(inv => {
            const campaign = campaigns.find(c => c.id === inv.campaignId)
            const progress = campaign
              ? Math.round((campaign.montantLeve / campaign.montantCible) * 100)
              : 100

            return (
              <div key={inv.id} className="card p-5">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Image */}
                  {campaign?.image && (
                    <img
                      src={campaign.image}
                      alt={inv.campaignTitre}
                      className="w-full md:w-24 h-20 object-cover rounded-xl flex-shrink-0"
                    />
                  )}

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                          {inv.campaignTitre}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">{inv.campaignProduit}</p>
                      </div>
                      <Badge variant={statusColor[inv.status]}>
                        {statusLabel[inv.status]}
                      </Badge>
                    </div>

                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs">Investi</p>
                        <p className="font-semibold text-gray-800">{formatMontant(inv.montant)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">ROI attendu</p>
                        <p className="font-semibold text-green-600">{inv.roiExpected}%</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">
                          {inv.status === 'termine' ? 'ROI réel' : 'Retour prévu'}
                        </p>
                        <p className="font-semibold text-gray-800">
                          {inv.status === 'termine' && inv.roiActual
                            ? `${inv.roiActual}%`
                            : new Date(inv.dateRetourPrev).toLocaleDateString('fr-CI', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs">Date</p>
                        <p className="font-semibold text-gray-800">
                          {new Date(inv.dateInvestissement).toLocaleDateString('fr-CI', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {inv.status === 'actif' && campaign && (
                      <div className="mt-3">
                        <ProgressBar value={progress} max={100} />
                        <p className="text-xs text-gray-400 mt-1">Levée : {progress}%</p>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  {campaign && (
                    <Link
                      href={`/campagnes/${campaign.slug}`}
                      className="flex-shrink-0 flex items-center gap-1 text-green-600 text-sm font-medium hover:underline"
                    >
                      Voir <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="card p-10 text-center text-gray-400">
              <Sprout size={36} className="mx-auto mb-3 opacity-40" />
              <p>Aucun investissement dans cette catégorie.</p>
              <Link href="/campagnes" className="btn-primary inline-block mt-4 text-sm">
                Découvrir les campagnes
              </Link>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}