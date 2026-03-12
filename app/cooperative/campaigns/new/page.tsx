'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { COOPERATIVE_NAV } from '@/lib/constants'
import {
  Sprout, MapPin, TrendingUp, ShieldCheck, CheckCircle,
  ChevronRight, ChevronLeft, Upload, Plus, Trash2
} from 'lucide-react'

const STEPS = [
  { id: 1, label: 'Informations générales', icon: <Sprout size={16} /> },
  { id: 2, label: 'Localisation & Surface', icon: <MapPin size={16} /> },
  { id: 3, label: 'Financement & ROI', icon: <TrendingUp size={16} /> },
  { id: 4, label: 'Acheteur & Assurance', icon: <ShieldCheck size={16} /> },
  { id: 5, label: 'Récapitulatif', icon: <CheckCircle size={16} /> },
]

type FormData = {
  titre: string
  produit: string
  variete: string
  description: string
  region: string
  ville: string
  surface: string
  rendementAttendu: string
  montantCible: string
  roiMin: string
  roiMax: string
  dureeJours: string
  dateDebut: string
  dateRecolte: string
  acheteur: string
  prixGarantiKg: string
  quantiteContrat: string
  agronome: string
  assurance: boolean
  tags: string[]
}

const initialForm: FormData = {
  titre: '', produit: '', variete: '', description: '',
  region: '', ville: '', surface: '', rendementAttendu: '',
  montantCible: '', roiMin: '', roiMax: '', dureeJours: '',
  dateDebut: '', dateRecolte: '',
  acheteur: '', prixGarantiKg: '', quantiteContrat: '',
  agronome: '', assurance: false, tags: [],
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  )
}

export default function NewCampaignPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>(initialForm)
  const [tagInput, setTagInput] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const set = (key: keyof FormData, value: string | boolean | string[]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) {
      set('tags', [...form.tags, t])
    }
    setTagInput('')
  }

  const removeTag = (tag: string) => set('tags', form.tags.filter(t => t !== tag))

  const produits = ['Tomates', 'Maïs', 'Sésame', 'Anacarde', 'Cacao', 'Riz', 'Soja', 'Manioc', 'Igname', 'Autre']
  const regions = ['Abidjan', 'Bouaké', 'Daloa', 'Korhogo', 'San-Pédro', 'Yamoussoukro', 'Divo', 'Abengourou', 'Autre']

  if (submitted) {
    return (
      <DashboardLayout navItems={COOPERATIVE_NAV} title="Nouvelle Campagne">
        <div className="max-w-lg mx-auto card p-12 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-gray-800 mb-3">
            Campagne soumise !
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            Votre campagne <strong>"{form.titre}"</strong> a été soumise pour validation agronomique. Notre équipe vous contactera sous 48h ouvrables.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm(initialForm) }}
              className="btn-primary w-full"
            >
              Créer une autre campagne
            </button>
            <a href="/cooperative/campaigns" className="btn-outline w-full block text-center">
              Voir mes campagnes
            </a>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout navItems={COOPERATIVE_NAV} title="Nouvelle Campagne">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Stepper */}
        <div className="card p-4">
          <div className="flex items-center justify-between">
            {STEPS.map((s, i) => (
              <div key={s.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step > s.id ? 'bg-green-500 text-white' :
                    step === s.id ? 'bg-green-600 text-white ring-4 ring-green-100' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {step > s.id ? <CheckCircle size={14} /> : s.id}
                  </div>
                  <p className={`text-xs mt-1 hidden md:block text-center max-w-16 leading-tight ${
                    step === s.id ? 'text-green-700 font-medium' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-4 transition-all ${step > s.id ? 'bg-green-400' : 'bg-gray-100'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contenu étape */}
        <div className="card p-6">
          <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            {STEPS[step - 1].icon}
            {STEPS[step - 1].label}
          </h2>

          {/* Étape 1 : Informations générales */}
          {step === 1 && (
            <div className="space-y-4">
              <Field label="Titre de la campagne" required>
                <input
                  type="text"
                  value={form.titre}
                  onChange={e => set('titre', e.target.value)}
                  className="input-field w-full text-sm py-2"
                  placeholder="Ex: Tomates cerises bio - Campagne 2025"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Produit" required>
                  <select
                    value={form.produit}
                    onChange={e => set('produit', e.target.value)}
                    className="input-field w-full text-sm py-2"
                  >
                    <option value="">Choisir...</option>
                    {produits.map(p => <option key={p}>{p}</option>)}
                  </select>
                </Field>
                <Field label="Variété">
                  <input
                    type="text"
                    value={form.variete}
                    onChange={e => set('variete', e.target.value)}
                    className="input-field w-full text-sm py-2"
                    placeholder="Ex: Cerises bio HF"
                  />
                </Field>
              </div>
              <Field label="Description détaillée" required>
                <textarea
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  rows={4}
                  className="input-field w-full text-sm py-2 resize-none"
                  placeholder="Décrivez votre projet, vos méthodes de culture, vos atouts..."
                />
              </Field>
              <Field label="Tags (mots-clés)">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTag()}
                    className="input-field flex-1 text-sm py-2"
                    placeholder="Ex: bio, irrigué..."
                  />
                  <button onClick={addTag} className="btn-outline px-3 py-2 text-sm flex items-center gap-1">
                    <Plus size={13} /> Ajouter
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.tags.map(tag => (
                    <span key={tag} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      {tag}
                      <button onClick={() => removeTag(tag)}>
                        <Trash2 size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {/* Étape 2 : Localisation */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Région" required>
                  <select
                    value={form.region}
                    onChange={e => set('region', e.target.value)}
                    className="input-field w-full text-sm py-2"
                  >
                    <option value="">Choisir...</option>
                    {regions.map(r => <option key={r}>{r}</option>)}
                  </select>
                </Field>
                <Field label="Ville / Localité" required>
                  <input
                    type="text"
                    value={form.ville}
                    onChange={e => set('ville', e.target.value)}
                    className="input-field w-full text-sm py-2"
                    placeholder="Ex: Bouaké"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Surface (hectares)" required>
                  <input
                    type="number"
                    value={form.surface}
                    onChange={e => set('surface', e.target.value)}
                    className="input-field w-full text-sm py-2"
                    placeholder="Ex: 12"
                    min="0"
                  />
                </Field>
                <Field label="Rendement attendu (tonnes)" required>
                  <input
                    type="number"
                    value={form.rendementAttendu}
                    onChange={e => set('rendementAttendu', e.target.value)}
                    className="input-field w-full text-sm py-2"
                    placeholder="Ex: 180"
                    min="0"
                  />
                </Field>
              </div>
              <Field label="Photo de la parcelle">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-green-300 transition-colors cursor-pointer">
                  <Upload size={24} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Cliquez ou glissez une image</p>
                  <p className="text-xs text-gray-300 mt-1">JPG, PNG — Max 5 Mo</p>
                </div>
              </Field>
            </div>
          )}

          {/* Étape 3 : Financement */}
          {step === 3 && (
            <div className="space-y-4">
              <Field label="Montant à lever (FCFA)" required>
                <input
                  type="number"
                  value={form.montantCible}
                  onChange={e => set('montantCible', e.target.value)}
                  className="input-field w-full text-sm py-2"
                  placeholder="Ex: 8500000"
                  min="0"
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="ROI minimum (%)" required>
                  <input
                    type="number"
                    value={form.roiMin}
                    onChange={e => set('roiMin', e.target.value)}
                    className="input-field w-full text-sm py-2"
                    placeholder="Ex: 18"
                    min="0" max="100"
                  />
                </Field>
                <Field label="ROI maximum (%)" required>
                  <input
                    type="number"
                    value={form.roiMax}
                    onChange={e => set('roiMax', e.target.value)}
                    className="input-field w-full text-sm py-2"
                    placeholder="Ex: 22"
                    min="0" max="100"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Durée (jours)" required>
                  <input
                    type="number"
                    value={form.dureeJours}
                    onChange={e => set('dureeJours', e.target.value)}
                    className="input-field w-full text-sm py-2"
                    placeholder="Ex: 90"
                    min="1"
                  />
                </Field>
                <Field label="Date de début" required>
                  <input
                    type="date"
                    value={form.dateDebut}
                    onChange={e => set('dateDebut', e.target.value)}
                    className="input-field w-full text-sm py-2"
                  />
                </Field>
              </div>
              <Field label="Date de récolte prévue" required>
                <input
                  type="date"
                  value={form.dateRecolte}
                  onChange={e => set('dateRecolte', e.target.value)}
                  className="input-field w-full text-sm py-2"
                />
              </Field>
              {form.roiMin && form.roiMax && form.montantCible && (
                <div className="bg-green-50 rounded-xl p-4 text-sm text-green-700">
                  <p className="font-semibold mb-1">Estimation du retour investisseur</p>
                  <p>Pour 100 000 FCFA investis : retour entre{' '}
                    <strong>{(100000 * (1 + Number(form.roiMin) / 100)).toLocaleString('fr-CI')} FCFA</strong> et{' '}
                    <strong>{(100000 * (1 + Number(form.roiMax) / 100)).toLocaleString('fr-CI')} FCFA</strong>
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Étape 4 : Acheteur & Assurance */}
          {step === 4 && (
            <div className="space-y-4">
              <Field label="Nom de l'acheteur" required>
                <input
                  type="text"
                  value={form.acheteur}
                  onChange={e => set('acheteur', e.target.value)}
                  className="input-field w-full text-sm py-2"
                  placeholder="Ex: SOCOCÉ, Nestlé CI, OLAM..."
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Prix garanti (FCFA/kg)" required>
                  <input
                    type="number"
                    value={form.prixGarantiKg}
                    onChange={e => set('prixGarantiKg', e.target.value)}
                    className="input-field w-full text-sm py-2"
                    placeholder="Ex: 950"
                    min="0"
                  />
                </Field>
                <Field label="Quantité contrat (tonnes)" required>
                  <input
                    type="number"
                    value={form.quantiteContrat}
                    onChange={e => set('quantiteContrat', e.target.value)}
                    className="input-field w-full text-sm py-2"
                    placeholder="Ex: 160"
                    min="0"
                  />
                </Field>
              </div>
              <Field label="Agronome responsable" required>
                <input
                  type="text"
                  value={form.agronome}
                  onChange={e => set('agronome', e.target.value)}
                  className="input-field w-full text-sm py-2"
                  placeholder="Ex: Dr. Kouassi Emmanuel"
                />
              </Field>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-medium text-gray-800">Assurance récolte</p>
                  <p className="text-xs text-gray-500 mt-0.5">Couvre les pertes liées aux aléas climatiques</p>
                </div>
                <button
                  onClick={() => set('assurance', !form.assurance)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${form.assurance ? 'bg-green-500' : 'bg-gray-200'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.assurance ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
              <Field label="Contrat d'achat signé">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-green-300 transition-colors cursor-pointer">
                  <Upload size={20} className="text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Déposer le contrat PDF</p>
                  <p className="text-xs text-gray-300 mt-1">PDF — Max 10 Mo</p>
                </div>
              </Field>
            </div>
          )}

          {/* Étape 5 : Récapitulatif */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="bg-green-50 rounded-xl p-5 space-y-3">
                {[
                  { label: 'Titre', value: form.titre || '—' },
                  { label: 'Produit', value: form.produit ? `${form.produit} ${form.variete}` : '—' },
                  { label: 'Localisation', value: form.ville ? `${form.ville}, ${form.region}` : '—' },
                  { label: 'Surface', value: form.surface ? `${form.surface} ha` : '—' },
                  { label: 'Montant cible', value: form.montantCible ? `${Number(form.montantCible).toLocaleString('fr-CI')} FCFA` : '—' },
                  { label: 'ROI estimé', value: form.roiMin && form.roiMax ? `${form.roiMin}% – ${form.roiMax}%` : '—' },
                  { label: 'Durée', value: form.dureeJours ? `${form.dureeJours} jours` : '—' },
                  { label: 'Acheteur', value: form.acheteur || '—' },
                  { label: 'Agronome', value: form.agronome || '—' },
                  { label: 'Assurance récolte', value: form.assurance ? '✅ Oui' : '❌ Non' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm border-b border-green-100 pb-2 last:border-0 last:pb-0">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-semibold text-gray-800 text-right max-w-48 truncate">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
                En soumettant, vous confirmez que toutes les informations fournies sont exactes. Votre campagne sera examinée par notre équipe agronomique sous 48h.
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="btn-outline flex items-center gap-2 text-sm disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={15} /> Précédent
          </button>

          <span className="text-xs text-gray-400">Étape {step} / {STEPS.length}</span>

          {step < STEPS.length ? (
            <button
              onClick={() => setStep(s => Math.min(STEPS.length, s + 1))}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              Suivant <ChevronRight size={15} />
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              className="btn-primary flex items-center gap-2 text-sm bg-green-600"
            >
              <CheckCircle size={15} /> Soumettre la campagne
            </button>
          )}
        </div>

      </div>
    </DashboardLayout>
  )
}