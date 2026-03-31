import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { useSite } from '../context/SiteContext'
export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true)
  const { settings } = useSite()
  const message = encodeURIComponent(`Hi! I am interested in booking a room at ${settings.guestHouseName}. Please help me.`)
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showTooltip && (
        <div className="flex items-center gap-2 bg-white shadow-card rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 animate-bounce">
          Chat with us!
          <button onClick={() => setShowTooltip(false)} className="text-gray-400 hover:text-gray-600 ml-1"><FiX size={14} /></button>
        </div>
      )}
      <a href={`https://wa.me/${settings.whatsapp}?text=${message}`} target="_blank" rel="noreferrer"
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110">
        <FaWhatsapp size={28} />
      </a>
    </div>
  )
}
