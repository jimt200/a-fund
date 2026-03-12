import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1) + 'M FCFA'
  }
  if (amount >= 1_000) {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
  }
  return amount + ' FCFA'
}

export function formatCurrencyFull(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA'
}

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'
  if (num >= 1_000) return (num / 1_000).toFixed(0) + 'K'
  return num.toString()
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatDateShort(date: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatPercentage(value: number): string {
  return value.toFixed(1) + '%'
}

export function calculateProgress(raised: number, target: number): number {
  return Math.min((raised / target) * 100, 100)
}

export function calculateDaysLeft(endDate: string): number {
  const end = new Date(endDate)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    draft: 'Brouillon',
    validation: 'En validation',
    levee: 'En levée de fonds',
    production: 'En production',
    terminee: 'Terminée',
    en_attente: 'En attente',
    valide: 'Validé',
    rejete: 'Rejeté',
    actif: 'Actif',
    termine: 'Terminé',
    verifie: 'Vérifié',
    non_soumis: 'Non soumis',
  }
  return labels[status] || status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    levee: 'bg-green-100 text-green-800',
    production: 'bg-blue-100 text-blue-800',
    terminee: 'bg-gray-100 text-gray-700',
    validation: 'bg-amber-100 text-amber-800',
    draft: 'bg-gray-100 text-gray-700',
    valide: 'bg-green-100 text-green-800',
    en_attente: 'bg-amber-100 text-amber-800',
    rejete: 'bg-red-100 text-red-800',
    verifie: 'bg-green-100 text-green-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-700'
}

export function getRiskColor(risk: string): string {
  const colors: Record<string, string> = {
    faible: 'text-green-600 bg-green-50',
    modere: 'text-amber-600 bg-amber-50',
    eleve: 'text-red-600 bg-red-50',
  }
  return colors[risk] || 'text-gray-600 bg-gray-50'
}

export function getRiskLabel(risk: string): string {
  const labels: Record<string, string> = {
    faible: 'Risque faible',
    modere: 'Risque modéré',
    eleve: 'Risque élevé',
  }
  return labels[risk] || risk
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

export function getInitials(nom: string, prenom?: string): string {
  if (prenom) return (prenom[0] + nom[0]).toUpperCase()
  const parts = nom.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return nom.slice(0, 2).toUpperCase()
}