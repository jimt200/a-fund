import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Target, Eye, Heart, Users, TrendingUp, ShieldCheck } from 'lucide-react'
import Image from 'next/image'

const values = [
  { icon: <ShieldCheck size={22} className="text-green-600" />, titre: 'Transparence', desc: 'Chaque centime investi est traçable. Rapports agronomiques, contrats d\'achat et performances publiés en temps réel.' },
  { icon: <Heart size={22} className="text-green-600" />, titre: 'Impact local', desc: 'Nous finançons exclusivement des coopératives ivoiriennes, créant des emplois et de la richesse au niveau local.' },
  { icon: <TrendingUp size={22} className="text-green-600" />, titre: 'Rendements attractifs', desc: 'Des ROI de 15 à 28% sur des cycles courts de 90 à 180 jours, soutenus par des contrats d\'achat fermes.' },
  { icon: <Users size={22} className="text-green-600" />, titre: 'Communauté', desc: 'Rejoignez plus de 1 200 investisseurs engagés qui croient en une agriculture africaine plus forte.' },
]

const team = [
  { nom: 'Joël YEMIAN', role: 'CEO & Co-fondateur', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
  { nom: 'Aya KONAN', role: 'Directrice Opérations', image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400' },
  { nom: 'Dr. Kouassi EMMANUEL', role: 'Directeur Agronomique', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
  { nom: 'Fatou DIALLO', role: 'Directrice Financière', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-green-300 text-sm font-medium uppercase tracking-widest mb-3">À propos</p>
          <h1 style={{ fontFamily: 'Georgia, serif' }} className="text-4xl md:text-5xl font-bold mb-6">
            Financer l'agriculture africaine,<br />un investissement à la fois
          </h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto leading-relaxed">
            A-FUND est la première plateforme de crowdfunding agricole de Côte d'Ivoire, connectant les investisseurs aux coopératives agricoles pour un impact réel et des rendements mesurables.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Target size={24} className="text-green-600" />
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-bold text-gray-800">Notre mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Démocratiser l'accès au financement agricole en Côte d'Ivoire en connectant les coopératives rurales aux capitaux privés, tout en offrant aux investisseurs des opportunités de rendement attractives et sécurisées.
            </p>
          </div>
          <div className="bg-emerald-50 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <Eye size={24} className="text-emerald-600" />
              <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-xl font-bold text-gray-800">Notre vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Devenir le leader du financement participatif agricole en Afrique de l'Ouest d'ici 2027, avec 10 000 investisseurs actifs et 500 coopératives financées dans 8 pays.
            </p>
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-center text-gray-800 mb-10">
            A-FUND en chiffres
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '1 200+', label: 'Investisseurs actifs' },
              { val: '97.4%', label: 'Taux de succès' },
              { val: '21%', label: 'ROI moyen' },
              { val: '42', label: 'Coopératives financées' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <p style={{ fontFamily: 'Georgia, serif' }} className="text-3xl font-bold text-green-600">{stat.val}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-center text-gray-800 mb-10">
            Nos valeurs
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card p-6 flex gap-4">
                <div className="bg-green-50 p-3 rounded-xl flex-shrink-0 h-fit">{v.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{v.titre}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-2xl font-bold text-center text-gray-800 mb-10">
            L'équipe fondatrice
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="text-center">
                <img
                  src={member.image}
                  alt={member.nom}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-green-100"
                />
                <p className="font-semibold text-gray-800 text-sm">{member.nom}</p>
                <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}