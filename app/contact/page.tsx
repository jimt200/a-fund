'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' })

  const handleSubmit = () => {
    if (!form.nom || !form.email || !form.message) return
    setSent(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-16 px-4 text-center">
        <p className="text-green-300 text-sm font-medium uppercase tracking-widest mb-3">Contact</p>
        <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-4xl md:text-5xl font-bold mb-4">
          Parlons-nous
        </h1>
        <p className="text-green-100 text-lg max-w-xl mx-auto">
          Notre équipe est disponible pour répondre à toutes vos questions.
        </p>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

          {/* Infos contact */}
          <div className="space-y-8">
            <div>
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-gray-800 mb-6">
                Nous contacter
              </h2>
              <div className="space-y-5">
                {[
                  { icon: <Mail size={20} className="text-green-600" />, label: 'Email', value: 'contact@afund.ci', sub: 'Réponse sous 24h' },
                  { icon: <Phone size={20} className="text-green-600" />, label: 'Téléphone', value: '+225 27 20 00 00 00', sub: 'Lun–Ven, 8h–18h' },
                  { icon: <MessageCircle size={20} className="text-green-600" />, label: 'WhatsApp', value: '+225 07 00 00 00 00', sub: 'Réponse rapide' },
                  { icon: <MapPin size={20} className="text-green-600" />, label: 'Adresse', value: 'Cocody, Abidjan, Côte d\'Ivoire', sub: 'Riviera Palmeraie' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="bg-green-50 p-2.5 rounded-xl flex-shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-xs text-gray-400">{item.label}</p>
                      <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Clock size={10} /> {item.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6">
              <p className="font-semibold text-green-800 mb-2 text-sm">Horaires du support</p>
              <div className="space-y-1.5 text-sm text-green-700">
                <div className="flex justify-between"><span>Lundi – Vendredi</span><span className="font-medium">08h00 – 18h00</span></div>
                <div className="flex justify-between"><span>Samedi</span><span className="font-medium">09h00 – 13h00</span></div>
                <div className="flex justify-between"><span>Dimanche</span><span className="text-green-400">Fermé</span></div>
              </div>
            </div>
          </div>

          {/* Formulaire */}
          <div className="card p-8">
            {sent ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-bold text-gray-800 mb-2">
                  Message envoyé !
                </h3>
                <p className="text-gray-500 text-sm">
                  Merci {form.nom}. Notre équipe vous répondra dans les 24 heures.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ nom: '', email: '', sujet: '', message: '' }) }}
                  className="btn-outline mt-6 text-sm"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-bold text-gray-800 mb-2">
                  Envoyer un message
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      value={form.nom}
                      onChange={e => setForm(p => ({ ...p, nom: e.target.value }))}
                      className="input-field w-full text-sm py-2"
                      placeholder="Jean Kouamé"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      className="input-field w-full text-sm py-2"
                      placeholder="jean@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Sujet</label>
                  <select
                    value={form.sujet}
                    onChange={e => setForm(p => ({ ...p, sujet: e.target.value }))}
                    className="input-field w-full text-sm py-2"
                  >
                    <option value="">Choisir un sujet</option>
                    <option>Question sur un investissement</option>
                    <option>Problème avec mon compte</option>
                    <option>Dépôt / Retrait</option>
                    <option>Partenariat coopérative</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    rows={5}
                    className="input-field w-full text-sm py-2 resize-none"
                    placeholder="Décrivez votre demande..."
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={15} /> Envoyer le message
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}