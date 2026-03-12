'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { DASHBOARD_NAV } from '@/lib/constants'
import { Bell, Shield, Smartphone, Globe, Moon, LogOut, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type ToggleItemProps = {
  label: string
  description: string
  value: boolean
  onChange: (v: boolean) => void
}

function ToggleItem({ label, description, value, onChange }: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
          value ? 'bg-green-500' : 'bg-gray-200'
        }`}
      >
        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          value ? 'translate-x-5' : 'translate-x-0.5'
        }`} />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [notifs, setNotifs] = useState({
    roi: true,
    campagnes: true,
    rapports: true,
    marketing: false,
    sms: true,
  })
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
  })

  return (
    <DashboardLayout navItems={DASHBOARD_NAV} title="Paramètres">
      <div className="max-w-2xl space-y-6">

        {/* Notifications */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={18} className="text-green-600" />
            <h3 style={{ fontFamily: 'Georgia, serif' }} className="font-semibold text-gray-800 text-lg">
              Notifications
            </h3>
          </div>
          <ToggleItem
            label="Notifications ROI"
            description="Recevoir une alerte lors du versement de vos rendements"
            value={notifs.roi}
            onChange={v => setNotifs(p => ({ ...p, roi: v }))}
          />
          <ToggleItem
            label="Mises à jour campagnes"
            description="Suivre l'avancement de vos campagnes en cours"
            value={notifs.campagnes}
            onChange={v => setNotifs(p => ({ ...p, campagnes: v }))}
          />
          <ToggleItem
            label="Rapports agronomiques"
            description="Être notifié lors de la publication de nouveaux rapports"
            value={notifs.rapports}
            onChange={v => setNotifs(p => ({ ...p, rapports: v }))}
          />
          <ToggleItem
            label="SMS"
            description="Recevoir les alertes importantes par SMS"
            value={notifs.sms}
            onChange={v => setNotifs(p => ({ ...p, sms: v }))}
          />
          <ToggleItem
            label="Emails marketing"
            description="Recevoir les actualités et offres d'A-FUND"
            value={notifs.marketing}
            onChange={v => setNotifs(p => ({ ...p, marketing: v }))}
          />
        </div>

        {/* Sécurité */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={18} className="text-green-600" />
            <h3 style={{ fontFamily: 'Georgia, serif' }} className="font-semibold text-gray-800 text-lg">
              Sécurité
            </h3>
          </div>
          <ToggleItem
            label="Double authentification (2FA)"
            description="Sécuriser votre compte avec un code à chaque connexion"
            value={security.twoFactor}
            onChange={v => setSecurity(p => ({ ...p, twoFactor: v }))}
          />
          <ToggleItem
            label="Alertes de connexion"
            description="Être notifié de chaque nouvelle connexion à votre compte"
            value={security.loginAlerts}
            onChange={v => setSecurity(p => ({ ...p, loginAlerts: v }))}
          />
          <div className="mt-4 space-y-2">
            <button className="w-full text-left flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
              Changer le mot de passe <ChevronRight size={15} className="text-gray-400" />
            </button>
            <Link
              href="/dashboard/kyc"
              className="w-full text-left flex items-center justify-between py-3 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
            >
              Vérification KYC <ChevronRight size={15} className="text-gray-400" />
            </Link>
          </div>
        </div>

        {/* Préférences */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={18} className="text-green-600" />
            <h3 style={{ fontFamily: 'Georgia, serif' }} className="font-semibold text-gray-800 text-lg">
              Préférences
            </h3>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Langue', value: 'Français' },
              { label: 'Devise', value: 'FCFA (XOF)' },
              { label: 'Fuseau horaire', value: 'Africa/Abidjan (GMT+0)' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                <p className="text-sm font-medium text-gray-800">{item.label}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  {item.value} <ChevronRight size={14} className="text-gray-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Déconnexion */}
        <button className="w-full card p-4 flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 transition-colors font-medium text-sm">
          <LogOut size={16} /> Se déconnecter
        </button>

      </div>
    </DashboardLayout>
  )
}