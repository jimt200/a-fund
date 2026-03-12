'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { DASHBOARD_NAV, QUICK_AMOUNTS, PAYMENT_METHODS } from '@/lib/constants'
import { formatCurrencyFull } from '@/lib/utils'

export default function DepositPage() {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('orange_money')
  const [phone, setPhone] = useState('')
  const [step, setStep] = useState<'form' | 'confirm' | 'success'>('form')

  const num = parseInt(amount) || 0
  const selectedMethod = PAYMENT_METHODS.find(m => m.id === method)

  if (step === 'success') {
    return (
      <DashboardLayout navItems={DASHBOARD_NAV} title="Recharger mon wallet">
        <div className="max-w-lg mx-auto">
          <div className="card p-10 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Dépôt confirmé !
            </h2>
            <p className="text-gray-500 mb-2">
              Votre dépôt de{' '}
              <strong className="text-gray-800">{formatCurrencyFull(num)}</strong>{' '}
              a été initié avec succès.
            </p>
            <p className="text-sm text-gray-400 mb-8">
              Vous allez recevoir une demande de confirmation sur votre téléphone.
              Le montant sera crédité sous quelques minutes.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Montant</span>
                <span className="font-semibold">{formatCurrencyFull(num)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Méthode</span>
                <span className="font-semibold">{selectedMethod?.icon} {selectedMethod?.label}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Téléphone</span>
                <span className="font-semibold">{phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Référence</span>
                <span className="font-mono text-xs text-gray-600">
                  DEP-{Date.now().toString().slice(-8)}
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/wallet" className="btn-outline flex-1 text-sm">
                Mon wallet
              </Link>
              <Link href="/campagnes" className="btn-primary flex-1 text-sm">
                Investir maintenant
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (step === 'confirm') {
    return (
      <DashboardLayout navItems={DASHBOARD_NAV} title="Recharger mon wallet">
        <div className="max-w-lg mx-auto">
          <div className="card p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              Confirmer le dépôt
            </h2>
            <div className="bg-primary-50 rounded-2xl p-6 mb-6 text-center">
              <p className="text-sm text-primary-700 font-medium mb-1">Montant à créditer</p>
              <p className="text-4xl font-bold text-primary-900" style={{ fontFamily: 'Georgia, serif' }}>
                {formatCurrencyFull(num)}
              </p>
            </div>
            <div className="space-y-3 mb-8">
              {[
                { label: 'Méthode de paiement', value: selectedMethod?.icon + ' ' + selectedMethod?.label },
                { label: 'Numéro de téléphone', value: phone },
                { label: 'Frais de transaction', value: 'Gratuit' },
                { label: 'Montant crédité', value: formatCurrencyFull(num) },
              ].map(item => (
                <div key={item.label} className="flex justify-between py-2 border-b border-gray-50 text-sm">
                  <span className="text-gray-500">{item.label}</span>
                  <span className={'font-semibold ' + (item.label === 'Frais de transaction' ? 'text-green-600' : 'text-gray-800')}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep('form')}
                className="btn-outline flex-1"
              >
                Modifier
              </button>
              <button
                onClick={() => setStep('success')}
                className="btn-primary flex-1"
              >
                Confirmer le dépôt
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout navItems={DASHBOARD_NAV} title="Recharger mon wallet">
      <div className="max-w-lg mx-auto">
        <Link
          href="/dashboard/wallet"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Retour au wallet
        </Link>

        <div className="card p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Recharger mon wallet
          </h1>

          <div className="space-y-6">
            {/* Quick Amounts */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Montant rapide
              </label>
              <div className="grid grid-cols-3 gap-2">
                {QUICK_AMOUNTS.map(a => (
                  <button
                    key={a}
                    onClick={() => setAmount(String(a))}
                    className={
                      'py-2 px-3 rounded-xl text-sm font-semibold border-2 transition-all ' +
                      (num === a
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 text-gray-600 hover:border-primary-300')
                    }
                  >
                    {formatCurrencyFull(a)}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Ou saisissez un montant
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="input-field pr-16"
                  placeholder="Ex: 75000"
                  min={5000}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">
                  FCFA
                </span>
              </div>
              {num > 0 && num < 5000 && (
                <p className="text-xs text-red-500 mt-1">Minimum 5 000 FCFA</p>
              )}
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Méthode de paiement
              </label>
              <div className="space-y-2">
                {PAYMENT_METHODS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={
                      'w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ' +
                      (method === m.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300')
                    }
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <span className={'font-semibold text-sm ' + (method === m.id ? 'text-primary-700' : 'text-gray-700')}>
                      {m.label}
                    </span>
                    {method === m.id && (
                      <CheckCircle className="w-5 h-5 text-primary-500 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="input-field"
                placeholder="+225 07 XX XX XX XX"
              />
            </div>

            {/* Summary */}
            {num >= 5000 && (
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Montant saisi</span>
                  <span className="font-semibold">{formatCurrencyFull(num)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Frais</span>
                  <span className="font-semibold text-green-600">Gratuit</span>
                </div>
                <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-200">
                  <span>Total crédité</span>
                  <span className="text-primary-600">{formatCurrencyFull(num)}</span>
                </div>
              </div>
            )}

            <button
              onClick={() => setStep('confirm')}
              disabled={num < 5000 || !phone}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continuer
            </button>
            <p className="text-xs text-gray-400 text-center">
              Paiement sécurisé · Traitement immédiat · Sans frais cachés
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}