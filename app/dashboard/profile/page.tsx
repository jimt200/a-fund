'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Badge from '@/components/ui/Badge'
import { currentUser } from '@/lib/data'
import { DASHBOARD_NAV } from '@/lib/constants'
import { User, Mail, Phone, MapPin, Calendar, ShieldCheck, Edit3, Save, X } from 'lucide-react'

export default function ProfilePage() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    prenom: currentUser.prenom,
    nom: currentUser.nom,
    email: currentUser.email,
    telephone: currentUser.telephone,
    ville: currentUser.ville,
  })

  const kycVariant = {
    verifie: 'success',
    en_attente: 'warning',
    non_soumis: 'gray',
    rejete: 'error',
  } as const

  const kycLabel = {
    verifie: 'KYC Vérifié ✅',
    en_attente: 'KYC En attente',
    non_soumis: 'KYC Non soumis',
    rejete: 'KYC Rejeté',
  }

  return (
    <DashboardLayout navItems={DASHBOARD_NAV} title="Mon Profil">
      <div className="max-w-2xl space-y-6">

        {/* Avatar + infos principales */}
        <div className="card p-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {currentUser.prenom[0]}{currentUser.nom[0]}
          </div>
          <div className="flex-1">
            <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-bold text-gray-800">
              {currentUser.prenom} {currentUser.nom}
            </h2>
            <p className="text-gray-500 text-sm mt-0.5 capitalize">{currentUser.role}</p>
            <div className="mt-2">
              <Badge variant={kycVariant[currentUser.kycStatus]}>
                {kycLabel[currentUser.kycStatus]}
              </Badge>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className={editing ? 'btn-outline px-4 py-2 text-sm flex items-center gap-1.5' : 'btn-secondary px-4 py-2 text-sm flex items-center gap-1.5'}
          >
            {editing ? <><X size={14} /> Annuler</> : <><Edit3 size={14} /> Modifier</>}
          </button>
        </div>

        {/* Formulaire */}
        <div className="card p-6 space-y-5">
          <h3 style={{ fontFamily: 'Georgia, serif' }} className="font-semibold text-gray-800 text-lg">
            Informations personnelles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Prénom', key: 'prenom', icon: <User size={15} /> },
              { label: 'Nom', key: 'nom', icon: <User size={15} /> },
              { label: 'Email', key: 'email', icon: <Mail size={15} /> },
              { label: 'Téléphone', key: 'telephone', icon: <Phone size={15} /> },
              { label: 'Ville', key: 'ville', icon: <MapPin size={15} /> },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                  {field.icon} {field.label}
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                    className="input-field w-full text-sm py-2"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800 py-2 border-b border-gray-100">
                    {form[field.key as keyof typeof form]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Calendar size={15} /> Membre depuis
              </label>
              <p className="text-sm font-medium text-gray-800 py-2 border-b border-gray-100">
                {new Date(currentUser.dateInscription).toLocaleDateString('fr-CI', {
                  day: '2-digit', month: 'long', year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {editing && (
            <button
              onClick={() => setEditing(false)}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Save size={15} /> Enregistrer les modifications
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="card p-6">
          <h3 style={{ fontFamily: 'Georgia, serif' }} className="font-semibold text-gray-800 text-lg mb-4">
            Statistiques
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-700">
                {(currentUser.totalInvesti / 1000000).toFixed(1)}M
              </p>
              <p className="text-xs text-gray-500 mt-1">FCFA investis</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-amber-700">
                {(currentUser.totalROI / 1000000).toFixed(2)}M
              </p>
              <p className="text-xs text-gray-500 mt-1">FCFA de ROI</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-700">
                {((currentUser.totalROI / currentUser.totalInvesti) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">ROI moyen</p>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  )
}