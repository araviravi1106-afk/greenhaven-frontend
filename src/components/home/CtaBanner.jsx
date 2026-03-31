import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPhone, FiArrowRight } from 'react-icons/fi'
import { useSite } from '../../context/SiteContext'
export default function CtaBanner() {
  const { settings } = useSite()
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-primary-dark/85" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">Ready for Your <span className="block text-green-300">Nature Escape?</span></h2>
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">Book your stay today and wake up to the soothing sounds of nature.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/rooms" className="flex items-center gap-2 bg-white text-primary hover:bg-green-50 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:shadow-xl hover:scale-105 w-full sm:w-auto justify-center">
            Book a Room <FiArrowRight />
          </Link>
          <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-2xl font-semibold w-full sm:w-auto justify-center">
            <FaWhatsapp size={20} /> WhatsApp Us
          </a>
          <a href={`tel:${settings.phone}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold w-full sm:w-auto justify-center">
            <FiPhone size={18} /> {settings.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
