'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, TrendingUp, Wallet, Bell, User,
  Sprout, FileText, Users, BarChart3, ShieldCheck
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, TrendingUp, Wallet, Bell, User,
  Sprout, FileText, Users, BarChart3, ShieldCheck,
}

interface NavItem {
  href: string
  label: string
  icon: string
  badge?: number
}

interface MobileNavProps {
  navItems: NavItem[]
}

export default function MobileNav({ navItems }: MobileNavProps) {
  const pathname = usePathname()

  // Prendre max 5 items pour la bottom nav
  const visibleItems = navItems.slice(0, 5)

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 safe-area-pb">
      <div className="flex items-stretch">
        {visibleItems.map(item => {
          const Icon = iconMap[item.icon] || LayoutDashboard
          const isActive =
            pathname === item.href ||
            (item.href.length > 10 && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center py-2.5 px-1 gap-1 transition-all relative',
                isActive ? 'text-green-600' : 'text-gray-400 hover:text-gray-600'
              )}
            >
              {/* Indicateur actif */}
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-green-500 rounded-full" />
              )}

              <div className="relative">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none font-bold">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>

              <span className={cn(
                'text-xs leading-none',
                isActive ? 'font-semibold text-green-600' : 'font-normal'
              )}>
                {item.label.split(' ')[0]}
              </span>
            </Link>
          )
        })}
      </div>

      {/* Safe area pour iPhone */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </nav>
  )
}