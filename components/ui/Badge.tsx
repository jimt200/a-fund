import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'error' | 'info' | 'gray' | 'primary'
  size?: 'sm' | 'md'
  className?: string
}

const variants = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
  gray: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-100 text-primary-800',
}

export default function Badge({ children, variant = 'gray', size = 'md', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center font-semibold rounded-full',
      size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}