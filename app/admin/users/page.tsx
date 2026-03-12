'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Badge from '@/components/ui/Badge'
import { ADMIN_NAV } from '@/lib/constants'
import { Search, Filter, Eye, ShieldCheck, ShieldX, MoreHorizontal, UserCheck, UserX } from 'lucide-react'

const mockUsers = [
  { id: 'u001', nom: 'Kouamé Jean-Baptiste', email: 'jb.kouame@gmail.com', role: 'investisseur', kyc: 'verifie', totalInvesti: 12500000, dateInscription: '2023-06-15', isActive: true },
  { id: 'u002', nom: 'Traoré Aminata', email: 'aminata.traore@gmail.com', role: 'investisseur', kyc: 'en_attente', totalInvesti: 0, dateInscription: '2024-05-03', isActive: true },
  { id: 'u003', nom: 'Bamba Sekou', email: 'sekou.bamba@yahoo.fr', role: 'investisseur', kyc: 'en_attente', totalInvesti: 500000, dateInscription: '2024-05-02', isActive: true },
  { id: 'u004', nom: 'N\'Guessan Paul', email: 'paul.nguessan@gmail.com', role: 'cooperative', kyc: 'verifie', totalInvesti: 0, dateInscription: '2024-04-01', isActive: true },
  { id: 'u005', nom: 'Diallo Fatoumata', email: 'fatoumata.diallo@gmail.com', role: 'investisseur', kyc: 'non_soumis', totalInvesti: 0, dateInscription: '2024-04-20', isActive: false },
  { id: 'u006', nom: 'Coulibaly Ibrahim', email: 'ibrahim.coul@gmail.com', role: 'investisseur', kyc: 'verifie', totalInvesti: 3200000, dateInscription: '2023-11-10', isActive: true },
  { id: 'u007', nom: 'Koné Mariam', email: 'mariam.kone@gmail.com', role: 'cooperative', kyc: 'verifie', totalInvesti: 0, dateInscription: '2023-09-05', isActive: true },
  { id: 'u008', nom: 'Yao Ekra', email: 'yao.ekra@gmail.com', role: 'investisseur', kyc: 'rejete', totalInvesti: 0, dateInscription: '2024-03-12', isActive: false },
]

const kycVariant: Record<string, 'success' | 'warning' | 'gray' | 'error'> = {
  verifie: 'success', en_attente: 'warning', non_soumis: 'gray', rejete: 'error',
}
const kycLabel: Record<string, string> = {
  verifie: 'Vérifié', en_attente: 'En attente', non_soumis: 'Non soumis', rejete: 'Rejeté',
}
const roleVariant: Record<string, 'info' | 'primary'> = {
  investisseur: 'info', cooperative: 'primary',
}

function formatMontant(n: number) {
  return n > 0 ? n.toLocaleString('fr-CI') + ' FCFA' : '—'
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'tous' | 'investisseur' | 'cooperative'>('tous')
  const [kycFilter, setKycFilter] = useState<'tous' | 'verifie' | 'en_attente' | 'non_soumis' | 'rejete'>('tous')

  const filtered = mockUsers.filter(u => {
    const matchSearch = u.nom.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'tous' || u.role === roleFilter
    const matchKyc = kycFilter === 'tous' || u.kyc === kycFilter
    return matchSearch && matchRole && matchKyc
  })

  return (
    <DashboardLayout navItems={ADMIN_NAV} title="Gestion des utilisateurs">
      <div className="space-y-5">

        {/* Stats rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: mockUsers.length, color: 'gray' },
            { label: 'KYC vérifiés', value: mockUsers.filter(u => u.kyc === 'verifie').length, color: 'green' },
            { label: 'En attente KYC', value: mockUsers.filter(u => u.kyc === 'en_attente').length, color: 'amber' },
            { label: 'Inactifs', value: mockUsers.filter(u => !u.isActive).length, color: 'red' },
          ].map((s, i) => (
            <div key={i} className="card p-4 text-center">
              <p className={`text-2xl font-bold text-${s.color}-600`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9 py-2 text-sm w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['tous', 'investisseur', 'cooperative'] as const).map(r => (
              <button key={r} onClick={() => setRoleFilter(r)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${roleFilter === r ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}>
                {r === 'tous' ? 'Tous rôles' : r}
              </button>
            ))}
            {(['tous', 'verifie', 'en_attente', 'non_soumis', 'rejete'] as const).map(k => (
              <button key={k} onClick={() => setKycFilter(k)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${kycFilter === k ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}>
                {k === 'tous' ? 'Tous KYC' : kycLabel[k]}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Utilisateur</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Rôle</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">KYC</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Statut</th>
                  <th className="text-right px-5 py-3 text-gray-500 font-medium">Total investi</th>
                  <th className="text-left px-5 py-3 text-gray-500 font-medium">Inscription</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {user.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user.nom}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={roleVariant[user.role]} size="sm">{user.role}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={kycVariant[user.kyc]} size="sm">{kycLabel[user.kyc]}</Badge>
                    </td>
                    <td className="px-5 py-3">
                      <Badge variant={user.isActive ? 'success' : 'gray'} size="sm">
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-right font-medium text-gray-700 text-xs">
                      {formatMontant(user.totalInvesti)}
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-xs">
                      {new Date(user.dateInscription).toLocaleDateString('fr-CI', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 bg-blue-50 text-blue-500 rounded-lg hover:bg-blue-100 transition-colors" title="Voir">
                          <Eye size={13} />
                        </button>
                        <button className="p-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors" title={user.isActive ? 'Désactiver' : 'Activer'}>
                          {user.isActive ? <UserX size={13} /> : <UserCheck size={13} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-10 text-center text-gray-400 text-sm">
                <Search size={28} className="mx-auto mb-2 opacity-30" />
                Aucun utilisateur trouvé
              </div>
            )}
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}