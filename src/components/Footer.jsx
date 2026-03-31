import { Link } from 'react-router-dom'
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'
import { GiLeafSwirl } from 'react-icons/gi'
import { useSite } from '../context/SiteContext'

const quickLinks = [
  { name: 'Home', path: '/' }, { name: 'Our Rooms', path: '/rooms' },
  { name: 'Events', path: '/events' }, { name: 'Gallery', path: '/gallery' },
  { name: 'About Us', path: '/about' }, { name: 'Contact', path: '/contact' },
]

export default function Footer() {
  const { settings } = useSite()
  const currentYear = new Date().getFullYear()
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {settings.logo ? <img src={settings.logo} alt={settings.guestHouseName} className="h-10 w-auto object-contain" /> : <div className="bg-white/20 p-2 rounded-xl"><GiLeafSwirl className="text-white text-xl" /></div>}
              <div>
                <h2 className="font-bold text-lg leading-none">{settings.guestHouseName}</h2>
                <p className="text-green-200 text-xs">{settings.tagline}</p>
              </div>
            </div>
            <p className="text-green-100 text-sm leading-relaxed mb-4">{settings.description}</p>
            <div className="flex gap-3">
              {settings.whatsapp && <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors"><FaWhatsapp size={18} /></a>}
              {settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors"><FaInstagram size={18} /></a>}
              {settings.facebook && <a href={settings.facebook} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors"><FaFacebook size={18} /></a>}
              {settings.youtube && <a href={settings.youtube} target="_blank" rel="noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-colors"><FaYoutube size={18} /></a>}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-4 text-green-100">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => <li key={link.name}><Link to={link.path} className="text-green-200 hover:text-white text-sm transition-colors">{link.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-4 text-green-100">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><FiMapPin className="text-green-300 mt-0.5 shrink-0" /><span className="text-green-200 text-sm">{settings.address}</span></li>
              <li><a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-green-200 hover:text-white text-sm"><FiPhone className="text-green-300 shrink-0" />{settings.phone}</a></li>
              <li><a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-green-200 hover:text-white text-sm"><FiMail className="text-green-300 shrink-0" />{settings.email}</a></li>
              {settings.whatsapp && <li><a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-xl text-sm font-medium w-fit"><FaWhatsapp size={16} /> WhatsApp Us</a></li>}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-4 text-green-100">Visit Us</h3>
            {settings.mapEmbedUrl ? (
              <iframe src={settings.mapEmbedUrl} width="100%" height="150" style={{border:0}} allowFullScreen="" loading="lazy" className="rounded-xl" />
            ) : (
              <div className="bg-white/10 rounded-xl h-36 flex items-center justify-center text-white/40 text-sm">Map Coming Soon</div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-green-200 text-sm">{currentYear} {settings.guestHouseName}. All rights reserved.</p>
          <Link to="/admin" className="text-white/10 hover:text-white/40 text-xs transition-colors" title="Admin Panel">⚙</Link>
        </div>
      </div>
    </footer>
  )
}
