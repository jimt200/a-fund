'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Badge from '@/components/ui/Badge'
import { COOPERATIVE_NAV } from '@/lib/constants'
import { Edit3, Save, X, MapPin, Users, Phone, Mail, Globe, Upload, CheckCircle } from 'lucide-react'

const coopProfile = {
  nom: 'Coopérative Agri-Bouaké',
  sigle: 'CAB',
  description: 'La Coopérative Agri-Bouaké regroupe 45 producteurs maraîchers du centre de la Côte d\'Ivoire. Spécialisée dans la production de tomates, poivrons et légumes feuilles, elle pratique une agriculture raisonnée certifiée depuis 2019.',
  region: 'Bouaké',
  ville: 'Bouaké',
  adresse: 'Quartier Sokoura, Bouaké, Côte d\'Ivoire',
  telephone: '+225 27 31 00 00 00',
  email: 'contact@agri-bouake.ci',
  siteWeb: 'www.agri-bouake.ci',
  nombreMembres: 45,
  dateCreation: '2017-03-15',
  numeroRccm: 'CI-BKE-2017-C-00123',
  responsable: 'M. Kouadio Alphonse',
  telephoneResponsable: '+225 07 11 22 33 44',
  certifications: ['Agriculture raisonnée', 'GlobalGAP en cours'],
  produitsPhares: ['Tomates', 'Poivrons', 'Laitue', 'Concombres'],
  superficieTotale: 85,
  campagnesRealisees: 4,
  roiMoyenServi: 21,
  kycStatus: 'verifie' as const,
}

export default function CoopProfilePage() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    description: coopProfile.description,
    telephone: coopProfile.telephone,
    email: coopProfile.email,
    siteWeb: coopProfile.siteWeb,
    adresse: coopProfile.adresse,
    responsable: coopProfile.responsable,
    telephoneResponsable: coopProfile.telephoneResponsable,
  })

  return (
    <DashboardLayout navItems={COOPERATIVE_NAV} title="Profil de la coopérative">
      <div className="max-w-3xl space-y-6">

        {/* Header */}
        <div className="card p-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            {coopProfile.sigle}
          </div>
          <div className="flex-1">
            <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-bold text-gray-800">
              {coopProfile.nom}
            </h2>
            <p className="text-gray-500 text-sm mt-0.5 flex items-center gap-1">
              <MapPin size={13} /> {coopProfile.ville}, {coopProfile.region}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="success" size="sm">KYC Vérifié ✅</Badge>
              <Badge variant="info" size="sm">{coopProfile.nombreMembres} membres</Badge>
            </div>
          </div>
          <button
            onClick={() => setEditing(!editing)}
            className={editing ? 'btn-outline px-4 py-2 text-sm flex items-center gap-1.5' : 'btn-secondary px-4 py-2 text-sm flex items-center gap-1.5'}
          >
            {editing ? <><X size={14} /> Annuler</> : <><Edit3 size={14} /> Modifier</>}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Campagnes réalisées', value: coopProfile.campagnesRealisees, color: 'green' },
            { label: 'ROI moyen servi', value: `${coopProfile.roiMoyenServi}%`, color: 'amber' },
            { label: 'Surface totale', value: `${coopProfile.superficieTotale} ha`, color: 'blue' },
          ].map((s, i) => (
            <div key={i} className="card p-4 text-center">
              <p className={`text-2xl font-bold text-${s.color}-600`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Informations générales */}
        <div className="card p-6 space-y-5">
          <h3 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800 text-lg">
            Informations générales
          </h3>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Description</label>
            {editing ? (
              <textarea
                rows={4}
                value={form.description}
                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                className="input-field w-full text-sm py-2 resize-none"
              />
            ) : (
              <p className="text-sm text-gray-700 leading-relaxed">{form.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Téléphone', key: 'telephone', icon: <Phone size={13} /> },
              { label: 'Email', key: 'email', icon: <Mail size={13} /> },
              { label: 'Site web', key: 'siteWeb', icon: <Globe size={13} /> },
              { label: 'Adresse', key: 'adresse', icon: <MapPin size={13} /> },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  {field.icon} {field.label}
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
                    className="input-field w-full text-sm py-2"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800 py-2 border-b border-gray-100">
                    {form[field.key as keyof typeof form]}
                  </p>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <button onClick={() => setEditing(false)} className="btn-primary flex items-center gap-2 text-sm">
              <Save size={14} /> Enregistrer
            </button>
          )}
        </div>

        {/* Responsable */}
        <div className="card p-6 space-y-4">
          <h3 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800 text-lg">
            Responsable légal
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Nom du responsable', key: 'responsable', icon: <Users size={13} /> },
              { label: 'Téléphone direct', key: 'telephoneResponsable', icon: <Phone size={13} /> },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  {field.icon} {field.label}
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form]}
                    onChange={e => setForm(p => ({ ...p, [field.key]: e.target.value }))}
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
              <label className="text-xs text-gray-500 mb-1 block">N° RCCM</label>
              <p className="text-sm font-medium text-gray-800 py-2 border-b border-gray-100 font-mono">
                {coopProfile.numeroRccm}
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Date de création</label>
              <p className="text-sm font-medium text-gray-800 py-2 border-b border-gray-100">
                {new Date(coopProfile.dateCreation).toLocaleDateString('fr-CI', { day: '2-digit', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        {/* Certifications & Produits */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Certifications</h3>
            <div className="space-y-2">
              {coopProfile.certifications.map((c, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </div>
          <div className="card p-5">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Produits phares</h3>
            <div className="flex flex-wrap gap-2">
              {coopProfile.produitsPhares.map((p, i) => (
                <span key={i} className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="card p-6">
          <h3 style={{ fontFamily: 'Georgia, serif' }} className="font-bold text-gray-800 text-lg mb-4">
            Documents officiels
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {['Statuts de la coopérative', 'Procès-verbal AG constitutive', 'Attestation RCCM', 'Certificat foncier'].map((doc, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <p className="text-sm text-gray-700">{doc}</p>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <button className="text-xs text-blue-500 hover:underline">Voir</button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-outline w-full mt-4 flex items-center justify-center gap-2 text-sm">
            <Upload size={14} /> Ajouter un document
          </button>
        </div>

      </div>
    </DashboardLayout>
  )
}