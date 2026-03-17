'use client'

import { useEffect } from 'react'
import { MapPin } from 'lucide-react'

interface CampaignMapProps {
  lat: number
  lng: number
  titre: string
  ville: string
  surface: number
}

export default function CampaignMap({ lat, lng, titre, ville, surface }: CampaignMapProps) {
  useEffect(() => {
    // Import dynamique pour éviter SSR issues
    const initMap = async () => {
      const L = (await import('leaflet')).default
    // CSS chargé via useEffect DOM
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(link)
      // Éviter double initialisation
      const container = document.getElementById('campaign-map')
      if (!container) return
      if ((container as any)._leaflet_id) return

      const map = L.map('campaign-map').setView([lat, lng], 13)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map)

      // Icône personnalisée verte
      const icon = L.divIcon({
        html: `
          <div style="
            background: #16a34a;
            width: 36px;
            height: 36px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <div style="
              transform: rotate(45deg);
              color: white;
              font-size: 14px;
              margin-left: 2px;
              margin-top: 2px;
            ">🌱</div>
          </div>
        `,
        className: '',
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      })

      // Marqueur avec popup
      const marker = L.marker([lat, lng], { icon }).addTo(map)
      marker.bindPopup(`
        <div style="font-family: Georgia, serif; min-width: 180px;">
          <p style="font-weight: bold; color: #166534; margin: 0 0 4px;">${titre}</p>
          <p style="font-size: 12px; color: #6b7280; margin: 0 0 4px;">📍 ${ville}</p>
          <p style="font-size: 12px; color: #6b7280; margin: 0;">🌾 Surface : ${surface} ha</p>
        </div>
      `).openPopup()

      // Cercle pour délimiter la zone approximative
      L.circle([lat, lng], {
        color: '#16a34a',
        fillColor: '#22c55e',
        fillOpacity: 0.15,
        weight: 2,
        radius: Math.sqrt(surface * 10000 / Math.PI),
      }).addTo(map)
    }

    initMap()
  }, [lat, lng, titre, ville, surface])

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={18} className="text-green-600" />
        <h2 style={{ fontFamily: 'Georgia, serif' }} className="text-lg font-bold text-gray-900">
          Localisation de la parcelle
        </h2>
      </div>
      <div
        id="campaign-map"
        className="w-full rounded-2xl overflow-hidden border border-gray-100"
        style={{ height: '320px', zIndex: 0 }}
      />
      <p className="text-xs text-gray-400 mt-2 text-center">
        📍 Coordonnées GPS vérifiées par l&apos;agronome certifié A-FUND
      </p>
    </div>
  )
}