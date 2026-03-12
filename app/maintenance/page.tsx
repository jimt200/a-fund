import Link from 'next/link'
import { Wrench, Clock, Mail, Sprout } from 'lucide-react'

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-emerald-900 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="bg-white/20 p-2 rounded-xl">
            <Sprout size={24} className="text-white" />
          </div>
          <span style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-white">
            A-FUND
          </span>
        </div>

        {/* Icône */}
        <div className="bg-white/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <Wrench size={40} className="text-white" />
        </div>

        <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-3xl md:text-4xl font-bold text-white mb-4">
          Maintenance en cours
        </h1>
        <p className="text-green-200 text-lg leading-relaxed mb-8">
          Nous améliorons la plateforme pour vous offrir une meilleure expérience. Nous serons de retour très bientôt.
        </p>

        {/* Délai estimé */}
        <div className="bg-white/10 rounded-2xl p-6 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4">
            <Clock size={18} className="text-green-300" />
            <p className="text-white font-semibold">Délai estimé</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { val: '02', label: 'Heures' },
              { val: '30', label: 'Minutes' },
              { val: '00', label: 'Secondes' },
            ].map((t, i) => (
              <div key={i} className="bg-white/10 rounded-xl p-3">
                <p style={{ fontFamily: 'Georgia, serif' }} className="text-3xl font-bold text-white">{t.val}</p>
                <p className="text-xs text-green-300 mt-1">{t.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-center justify-center gap-2 text-green-200 text-sm">
          <Mail size={15} />
          <span>Questions ? </span>
          <a href="mailto:support@afund.ci" className="text-white hover:underline font-medium">
            support@afund.ci
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-green-300">
          <a href="https://twitter.com" className="hover:text-white transition-colors">Twitter</a>
          <a href="https://linkedin.com" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://wa.me/2250700000000" className="hover:text-white transition-colors">WhatsApp</a>
        </div>

      </div>
    </div>
  )
}