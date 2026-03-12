import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Users, Clock, Shield } from 'lucide-react'
import type { Campaign } from '@/lib/types'
import { formatCurrency, calculateProgress, calculateDaysLeft, getRiskLabel } from '@/lib/utils'
import Badge from '@/components/ui/Badge'
import ProgressBar from '@/components/ui/ProgressBar'

interface CampaignCardProps {
  campaign: Campaign
}

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'info' | 'gray' }> = {
  levee: { label: 'En levée', variant: 'success' },
  production: { label: 'En production', variant: 'info' },
  terminee: { label: 'Terminée', variant: 'gray' },
  validation: { label: 'En validation', variant: 'warning' },
  draft: { label: 'Brouillon', variant: 'gray' },
}

const riskConfig: Record<string, { variant: 'success' | 'warning' | 'error' }> = {
  faible: { variant: 'success' },
  modere: { variant: 'warning' },
  eleve: { variant: 'error' },
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = calculateProgress(campaign.montantLeve, campaign.montantCible)
  const daysLeft = calculateDaysLeft(campaign.dateFin)
  const statusInfo = statusConfig[campaign.status] || { label: campaign.status, variant: 'gray' as const }
  const riskInfo = riskConfig[campaign.risque] || { variant: 'gray' as const }

  return (
    <Link
      href={'/campagnes/' + campaign.slug}
      className="card group hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={campaign.image}
          alt={campaign.titre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          {campaign.assurance && (
            <span className="bg-white/90 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <Shield className="w-3 h-3 text-primary-600" /> Assuré
            </span>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="bg-white/90 text-gray-800 text-sm font-bold px-2.5 py-1 rounded-full">
            {campaign.roiMin}-{campaign.roiMax}% ROI
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />{campaign.region}
          </span>
          <span className="font-semibold text-secondary-600 bg-secondary-50 px-2 py-0.5 rounded-full">
            {campaign.produit}
          </span>
          <Badge variant={riskInfo.variant} size="sm">
            {getRiskLabel(campaign.risque)}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 text-base mb-1 group-hover:text-primary-700 transition-colors line-clamp-2" style={{ fontFamily: 'Georgia, serif' }}>
          {campaign.titre}
        </h3>
        <p className="text-xs text-gray-500 mb-4 line-clamp-2">{campaign.descriptionCourte}</p>

        {/* Progress */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="font-semibold text-primary-600">{formatCurrency(campaign.montantLeve)}</span>
            <span className="text-gray-400">sur {formatCurrency(campaign.montantCible)}</span>
          </div>
          <ProgressBar
            value={progress}
            size="sm"
            color={progress >= 100 ? 'success' : 'primary'}
          />
          <div className="flex items-center justify-between text-xs text-gray-500 mt-3 pt-3 border-t border-gray-50">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />{campaign.nombreInvestisseurs} investisseurs
            </span>
            <span className="font-semibold text-primary-600">{progress.toFixed(0)}%</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {daysLeft > 0 ? daysLeft + ' j. restants' : 'Terminé'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}