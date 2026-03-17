'use client'

import { useState } from 'react'
import {
  Users, Search, UserPlus, Phone, MapPin,
  CheckCircle, Clock, TrendingUp, MoreHorizontal
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { COOPERATIVE_NAV } from '@/lib/constants'
import Badge from '@/components/ui/Badge'

const membres = [
  { id: 'm001', nom: 'Kouassi Aya', telephone: '+225 07 11 22 33', ville: 'Bouaké', surface: 3.5, status: 'actif', campagnes: 4, gainTotal: 850000, dateAdhesion: '2021-03-15' },
  { id: 'm002', nom: 'Traoré Mamadou', telephone: '+225 05 44 55 66', ville: 'Bouaké', surface: 2.0, status: 'actif', campagnes: 3, gainTotal: 620000, dateAdhesion: '2021-06-20' },
  { id: 'm003', nom: 'N\'Guessan Brou', telephone: '+225 01 77 88 99', ville: 'Brobo', surface: 4.2, status: 'actif', campagnes: 5, gainTotal: 1100000, dateAdhesion: '2020-11-10' },
  { id: 'm004', nom: 'Diallo Fatoumata', telephone: '+225 07 22 33 44', ville: 'Bouaké', surface: 1.8, status: 'inactif', campagnes: 1, gainTotal: 180000, dateAdhesion: '2022-01-05' },
  { id: 'm005', nom: 'Koné Seydou', telephone: '+225 05 55 66 77', ville: 'Sakassou', surface: 5.0, status: 'actif', campagnes: 6, gainTotal: 1450000, dateAdhesion: '2020-08-22' },
  { id: 'm006', nom: 'Bamba Aminata', telephone: '+225 01 88 99 00', ville: 'Bouaké', surface: 2.5, status: 'actif', campagnes: 4, gainTotal: 760000, dateAdhesion: '2021-09-14' },
  { id: 'm007', nom: 'Ouattara Ibrahim', telephone: '+225 07 33 44 55', ville: 'Brobo', surface: 3.0, status: 'en_attente', campagnes: 0, gainTotal: 0, dateAdhesion: '2024-04-01' },
  { id: 'm008', nom: 'Coulibaly Mariam', telephone: '+225 05 66 77 88', ville: 'Bouaké', surface: 1.5, status: 'actif', campagnes: 2, gainTotal: 310000, dateAdhesion: '2022-07-18' },
]

export default function MembersPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('tous')

  const filtered = membres.filter(m => {
    const matchSearch = m.nom.toLowerCase().includes(search.toLowerCase()) ||
      m.ville.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'tous' || m.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalSurface = membres.filter(m => m.status === 'actif').reduce((s, m) => s + m.surface, 0)
  const totalGains = membres.reduce((s, m) => s + m.gainTotal, 0)

  return (
    <DashboardLayout navItems={COOPERATIVE_NAV} title="Membres" subtitle="Coopérative Agri-Bouaké">
      <div className="space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total membres', value: membres.length, icon: Users, color: 'bg-green-100 text-green-600' },
            { label: 'Membres actifs', value: membres.filter(m => m.status === 'actif').length, icon: CheckCircle, color: 'bg-blue-100 text-blue-600' },
            { label: 'Surface totale', value: totalSurface.toFixed(1) + ' ha', icon: MapPin, color: 'bg-amber-100 text-amber-600' },
            { label: 'Gains distribués', value: (totalGains / 1000000).toFixed(1) + 'M FCFA', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
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

        {/* Filters & Search */}
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field pl-9 w-full"
              />
            </div>
            <div className="flex bg-gray-100 rounded-xl p-1 text-xs">
              {['tous', 'actif', 'inactif', 'en_attente'].map(f => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    statusFilter === f ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  {f === 'tous' ? 'Tous' : f === 'actif' ? 'Actifs' : f === 'inactif' ? 'Inactifs' : 'En attente'}
                </button>
              ))}
            </div>
            <button className="btn-primary flex items-center gap-2 text-sm whitespace-nowrap">
              <UserPlus size={15} /> Ajouter un membre
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-2 text-xs text-gray-400 font-medium">Membre</th>
                  <th className="text-left py-3 px-2 text-xs text-gray-400 font-medium hidden sm:table-cell">Contact</th>
                  <th className="text-left py-3 px-2 text-xs text-gray-400 font-medium hidden lg:table-cell">Surface</th>
                  <th className="text-left py-3 px-2 text-xs text-gray-400 font-medium hidden lg:table-cell">Campagnes</th>
                  <th className="text-left py-3 px-2 text-xs text-gray-400 font-medium">Statut</th>
                  <th className="text-left py-3 px-2 text-xs text-gray-400 font-medium hidden md:table-cell">Gains</th>
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(m => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-green-700">
                            {m.nom.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{m.nom}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin size={10} />{m.ville}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 hidden sm:table-cell">
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <Phone size={11} />{m.telephone}
                      </p>
                    </td>
                    <td className="py-3 px-2 hidden lg:table-cell">
                      <span className="text-gray-700 font-medium">{m.surface} ha</span>
                    </td>
                    <td className="py-3 px-2 hidden lg:table-cell">
                      <span className="text-gray-700">{m.campagnes}</span>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant={m.status === 'actif' ? 'success' : m.status === 'en_attente' ? 'warning' : 'gray'}>
                        {m.status === 'actif' ? 'Actif' : m.status === 'en_attente' ? 'En attente' : 'Inactif'}
                      </Badge>
                    </td>
                    <td className="py-3 px-2 hidden md:table-cell">
                      <span className="text-green-600 font-semibold text-xs">
                        {m.gainTotal > 0 ? (m.gainTotal / 1000).toFixed(0) + 'k FCFA' : '—'}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-400 text-sm">Aucun membre trouvé</p>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-400 text-right">
            {filtered.length} membre{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}