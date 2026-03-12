'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Badge from '@/components/ui/Badge'
import { ADMIN_NAV } from '@/lib/constants'
import { ShieldCheck, ShieldX, Eye, Search, CheckCircle, XCircle, Clock, Filter } from 'lucide-react'

const mockKycRequests = [
  { id: 'k001', userId: 'u002', nom: 'Traoré Aminata', email: 'aminata.traore@gmail.com', telephone: '+225 07 45 67 89 01', ville: 'Abidjan', dateNaissance: '1992-03-15', datesoumission: '2024-05-03', status: 'en_attente', docs: ['CNI', 'Justificatif domicile', 'Attestation fiscale'] },
  { id: 'k002', userId: 'u003', nom: 'Bamba Sekou', email: 'sekou.bamba@yahoo.fr', telephone: '+225 05 12 34 56 78', ville: 'Bouaké', dateNaissance: '1988-07-22', datesoumission: '2024-05-02', status: 'en_attente', docs: ['Passeport', 'Justificatif domicile'] },
  { id: 'k003', userId: 'u004', nom: 'N\'Guessan Paul', email: 'paul.nguessan@gmail.com', telephone: '+225 01 23 45 67 89', ville: 'Yamoussoukro', dateNaissance: '1985-11-08', datesoumission: '2024-04-28', status: 'verifie', docs: ['CNI', 'Justificatif domicile', 'Attestation fiscale'] },
  { id: 'k004', userId: 'u005', nom: 'Diallo Fatoumata', email: 'fatoumata.diallo@gmail.com', telephone: '+225 07 98 76 54 32', ville: 'San-Pédro', dateNaissance: '1995-01-30', datesoumission: '2024-04-15', status: 'rejete', docs: ['CNI'], rejetRaison: 'Document CNI expiré' },
  { id: 'k005', userId: 'u007', nom: 'Koné Mariam', email: 'mariam.kone@gmail.com', telephone: '+225 05 55 44 33 22', ville: 'Korhogo', dateNaissance: '1990-06-12', datesoumission: '2024-04-10', status: 'verifie', docs: ['Passeport', 'Justificatif domicile', 'Attestation fiscale'] },
  { id: 'k006', userId: 'u008', nom: 'Yao Ekra', email: 'yao.ekra@gmail.com', telephone: '+225 01 11 22 33 44', ville: 'Abidjan', dateNaissance: '1993-09-05', datesoumission: '2024-03-28', status: 'rejete', docs: ['CNI', 'Justificatif domicile'], rejetRaison: 'Justificatif domicile illisible' },
]

const statusVariant: Record<string, 'warning' | 'success' | 'error'> = {
  en_attente: 'warning', verifie: 'success', rejete: 'error',
}
const statusLabel: Record<string, string> = {
  en_attente: 'En attente', verifie: 'Vérifié', rejete: 'Rejeté',
}

export default function AdminKycPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'tous' | 'en_attente' | 'verifie' | 'rejete'>('tous')
  const [selected, setSelected] = useState<typeof mockKycRequests[0] | null>(null)
  const [requests, setRequests] = useState(mockKycRequests)

  const filtered = requests.filter(r => {
    const matchSearch = r.nom.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'tous' || r.status === statusFilter
    return matchSearch && matchStatus
  })

  const approve = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'verifie' } : r))
    setSelected(null)
  }

  const reject = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejete', rejetRaison: 'Rejeté par l\'administrateur' } : r))
    setSelected(null)
  }

  const pending = requests.filter(r => r.status === 'en_attente').length

  return (
    <DashboardLayout navItems={ADMIN_NAV} title="Vérification KYC">
      <div className="space-y-5">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-amber-500">{pending}</p>
            <p className="text-xs text-gray-500 mt-1">En attente</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{requests.filter(r => r.status === 'verifie').length}</p>
            <p className="text-xs text-gray-500 mt-1">Vérifiés</p>
          </div>
          <div className="card p-4 text-center">
            <p className="text-2xl font-bold text-red-500">{requests.filter(r => r.status === 'rejete').length}</p>
            <p className="text-xs text-gray-500 mt-1">Rejetés</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter size={15} className="text-gray-400" />
            {(['tous', 'en_attente', 'verifie', 'rejete'] as const).map(f => (
              <button key={f} onClick={() => setStatusFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${statusFilter === f ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'}`}>
                {f === 'tous' ? 'Tous' : statusLabel[f]}
                {f === 'en_attente' && pending > 0 && (
                  <span className="ml-1.5 bg-amber-400 text-white text-xs rounded-full w-4 h-4 inline-flex items-center justify-center">
                    {pending}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9 py-1.5 text-sm w-52" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">

          {/* Liste */}
          <div className="space-y-3">
            {filtered.map(req => (
              <button
                key={req.id}
                onClick={() => setSelected(req)}
                className={`w-full text-left card p-4 hover:shadow-md transition-all ${selected?.id === req.id ? 'ring-2 ring-green-500' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {req.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-gray-800 text-sm">{req.nom}</p>
                      <Badge variant={statusVariant[req.status]} size="sm">{statusLabel[req.status]}</Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{req.email}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock size={10} /> Soumis le {new Date(req.datesoumission).toLocaleDateString('fr-CI', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                {req.status === 'rejete' && req.rejetRaison && (
                  <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                    <XCircle size={11} /> {req.rejetRaison}
                  </p>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="card p-10 text-center text-gray-400">
                <ShieldCheck size={28} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Aucune demande trouvée</p>
              </div>
            )}
          </div>

          {/* Détail */}
          <div>
            {selected ? (
              <div className="card p-6 space-y-5 sticky top-6">
                <div className="flex items-center justify-between">
                  <h3 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800 text-lg">
                    Dossier KYC
                  </h3>
                  <Badge variant={statusVariant[selected.status]}>{statusLabel[selected.status]}</Badge>
                </div>

                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Nom complet', value: selected.nom },
                    { label: 'Email', value: selected.email },
                    { label: 'Téléphone', value: selected.telephone },
                    { label: 'Ville', value: selected.ville },
                    { label: 'Date de naissance', value: new Date(selected.dateNaissance).toLocaleDateString('fr-CI', { day: '2-digit', month: 'long', year: 'numeric' }) },
                    { label: 'Date soumission', value: new Date(selected.datesoumission).toLocaleDateString('fr-CI', { day: '2-digit', month: 'long', year: 'numeric' }) },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-50 pb-2">
                      <span className="text-gray-400">{item.label}</span>
                      <span className="font-medium text-gray-800">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-2 font-medium">Documents soumis</p>
                  <div className="space-y-2">
                    {selected.docs.map((doc, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2">
                        <p className="text-sm text-gray-700">{doc}</p>
                        <div className="flex items-center gap-2">
                          <CheckCircle size={14} className="text-green-500" />
                          <button className="text-xs text-blue-500 hover:underline flex items-center gap-1">
                            <Eye size={11} /> Voir
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selected.status === 'en_attente' && (
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => approve(selected.id)}
                      className="flex-1 btn-primary flex items-center justify-center gap-2 text-sm"
                    >
                      <CheckCircle size={15} /> Approuver
                    </button>
                    <button
                      onClick={() => reject(selected.id)}
                      className="flex-1 bg-red-50 text-red-600 border border-red-200 rounded-xl py-2 text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle size={15} /> Rejeter
                    </button>
                  </div>
                )}

                {selected.status === 'rejete' && selected.rejetRaison && (
                  <div className="bg-red-50 rounded-xl p-3 text-sm text-red-600">
                    <p className="font-medium mb-1">Raison du rejet :</p>
                    <p>{selected.rejetRaison}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="card p-12 text-center text-gray-400 h-full flex flex-col items-center justify-center">
                <ShieldCheck size={36} className="mb-3 opacity-30" />
                <p className="text-sm">Sélectionnez un dossier pour voir les détails</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}