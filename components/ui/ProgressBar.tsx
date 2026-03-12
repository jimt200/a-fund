import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  color?: 'primary' | 'secondary' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  className?: string
}

const colors = {
  primary: 'bg-primary-500',
  secondary: 'bg-secondary-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
}

const sizes = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }

export default function ProgressBar({ value, max = 100, color = 'primary', size = 'md', className }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  return (
    <div className={cn('w-full', className)}>
      <div className={cn('w-full bg-gray-100 rounded-full overflow-hidden', sizes[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-700', colors[color])}
          style={{ width: percentage + '%' }}
        />
      </div>
    </div>
  )
}