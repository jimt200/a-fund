export const PRODUITS = [
  'Tomates', 'Maïs', 'Sésame', 'Cacao', 'Café', 'Anacarde',
  'Manioc', 'Igname', 'Riz', 'Soja', 'Coton', 'Banane plantain',
  'Ananas', 'Piment', 'Oignon'
]

export const REGIONS_CI = [
  'Abidjan', 'Bouaké', 'Daloa', 'San-Pédro', 'Yamoussoukro',
  'Korhogo', 'Man', 'Abengourou', 'Gagnoa', 'Divo',
  'Bondoukou', 'Odienné', 'Séguéla', 'Touba', 'Ferkessédougou'
]

export const PAYMENT_METHODS = [
  { id: 'orange_money', label: 'Orange Money', icon: '🟠' },
  { id: 'mtn_money', label: 'MTN Money', icon: '🟡' },
  { id: 'wave', label: 'Wave', icon: '🔵' },
  { id: 'carte_bancaire', label: 'Carte bancaire', icon: '💳' },
]

export const QUICK_AMOUNTS = [5000, 10000, 25000, 50000, 100000, 250000]

export const STATS_GLOBALES = {
  totalInvesti: 847_000_000,
  nombreInvestisseurs: 1923,
  roiMoyen: 21.3,
  tauxSucces: 97.4,
  campagnesActives: 34,
  cooperativesPartenaires: 89,
  paysCouverts: 3,
}

export const NAV_LINKS = [
  { href: '/campagnes', label: 'Campagnes' },
  { href: '/how-it-works', label: 'Comment ça marche' },
  { href: '/about', label: 'À propos' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
]

export const DASHBOARD_NAV = [
  { href: '/dashboard', label: 'Tableau de bord', icon: 'LayoutDashboard' },
  { href: '/dashboard/investments', label: 'Mes investissements', icon: 'TrendingUp' },
  { href: '/dashboard/wallet', label: 'Mon wallet', icon: 'Wallet' },
  { href: '/dashboard/transactions', label: 'Transactions', icon: 'Receipt' },
  { href: '/dashboard/messages', label: 'Messages', icon: 'MessageSquare' },
  { href: '/dashboard/notifications', label: 'Notifications', icon: 'Bell' },
  { href: '/dashboard/profile', label: 'Mon profil', icon: 'User' },
  { href: '/dashboard/settings', label: 'Paramètres', icon: 'Settings' },
  { href: '/dashboard/kyc', label: 'Vérification KYC', icon: 'ShieldCheck' },
]

export const COOPERATIVE_NAV = [
  { href: '/cooperative/dashboard', label: 'Tableau de bord', icon: 'LayoutDashboard' },
  { href: '/cooperative/campaigns', label: 'Mes campagnes', icon: 'Sprout' },
  { href: '/cooperative/treasury', label: 'Trésorerie', icon: 'PiggyBank' },
  { href: '/cooperative/reports', label: 'Rapports', icon: 'FileText' },
  { href: '/cooperative/members', label: 'Membres', icon: 'Users' },
]

export const ADMIN_NAV = [
  { href: '/admin/dashboard', label: 'Tableau de bord', icon: 'LayoutDashboard' },
  { href: '/admin/users', label: 'Utilisateurs', icon: 'Users' },
  { href: '/admin/campaigns', label: 'Campagnes', icon: 'Sprout' },
  { href: '/admin/validation', label: 'Validation', icon: 'ClipboardCheck' },
  { href: '/admin/transactions', label: 'Transactions', icon: 'Receipt' },
  { href: '/admin/analytics', label: 'Analytics', icon: 'BarChart3' },
  { href: '/admin/support', label: 'Support', icon: 'HeadphonesIcon' },
]