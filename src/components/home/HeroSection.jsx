import { Link } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { FiPhone, FiArrowRight } from 'react-icons/fi'
import { useSite } from '../../context/SiteContext'

export default function HeroSection() {
  const { settings } = useSite()
  const message = encodeURIComponent(`Hi! I am interested in booking a room at ${settings.guestHouseName}.`)
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('${settings.heroImage}')` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Welcome to {settings.guestHouseName}
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {settings.heroTitle?.split(' ').slice(0, 2).join(' ')}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500">
            {settings.heroTitle?.split(' ').slice(2).join(' ')}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">{settings.heroSubtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/rooms" className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:shadow-xl hover:scale-105 w-full sm:w-auto justify-center">
            Explore Rooms <FiArrowRight />
          </Link>
          <a href={`https://wa.me/${settings.whatsapp}?text=${message}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-2xl font-semibold text-base transition-all w-full sm:w-auto justify-center">
            <FaWhatsapp size={20} className="text-green-400" /> Book via WhatsApp
          </a>
          <a href={`tel:${settings.phone}`} className="flex items-center gap-2 bg-white text-primary hover:bg-green-50 px-8 py-4 rounded-2xl font-semibold text-base transition-all hover:shadow-xl w-full sm:w-auto justify-center">
            <FiPhone size={18} /> Call Now
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {[
            { number: settings.totalGuests, label: 'Happy Guests' },
            { number: '15+', label: 'Room Types' },
            { number: settings.rating, label: 'Star Rating' },
            { number: settings.experience, label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.number}</p>
              <p className="text-white/70 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
