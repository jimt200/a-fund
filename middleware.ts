import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = [
  '/dashboard',
  '/cooperative',
  '/admin',
]

const authRoutes = ['/auth/login', '/auth/register']

const roleRoutes: Record<string, string[]> = {
  investisseur: ['/dashboard'],
  cooperative: ['/cooperative'],
  admin: ['/admin', '/dashboard', '/cooperative'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Récupérer le token simulé depuis les cookies
  const token = request.cookies.get('afund_token')?.value
  const role = request.cookies.get('afund_role')?.value

  const isProtected = protectedRoutes.some(r => pathname.startsWith(r))
  const isAuthRoute = authRoutes.some(r => pathname.startsWith(r))

  // Rediriger vers login si non connecté
  if (isProtected && !token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Rediriger vers dashboard si déjà connecté
  if (isAuthRoute && token) {
    if (role === 'admin') return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    if (role === 'cooperative') return NextResponse.redirect(new URL('/cooperative/dashboard', request.url))
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Contrôle d'accès par rôle
  if (token && role) {
    const allowed = roleRoutes[role] || []
    const hasAccess = allowed.some(r => pathname.startsWith(r))
    if (isProtected && !hasAccess) {
      if (role === 'cooperative') return NextResponse.redirect(new URL('/cooperative/dashboard', request.url))
      if (role === 'investisseur') return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/cooperative/:path*',
    '/admin/:path*',
    '/auth/:path*',
  ],
}