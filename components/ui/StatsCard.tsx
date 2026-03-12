import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatsCardProps {
  label: string
  value: string
  change?: string
  changeType?: 'up' | 'down' | 'neutral'
  icon?: LucideIcon
  color?: 'primary' | 'secondary' | 'blue' | 'purple' | 'orange'
  className?: string
}

const colorSchemes = {
  primary: { icon: 'bg-primary-500 text-white' },
  secondary: { icon: 'bg-secondary-500 text-white' },
  blue: { icon: 'bg-blue-500 text-white' },
  purple: { icon: 'bg-purple-500 text-white' },
  orange: { icon: 'bg-orange-500 text-white' },
}

export default function StatsCard({ label, value, change, changeType = 'up', icon: Icon, color = 'primary', className }: StatsCardProps) {
  const scheme = colorSchemes[color]
  return (
    <div className={cn('card p-6', className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1" style={{ fontFamily: 'Georgia, serif' }}>{value}</p>
          {change && (
            <p className={cn(
              'text-xs font-medium mt-2',
              changeType === 'up' ? 'text-green-600' :
              changeType === 'down' ? 'text-red-600' : 'text-gray-500'
            )}>
              {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : '→'} {change}
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn('w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0', scheme.icon)}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}