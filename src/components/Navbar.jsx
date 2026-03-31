import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiPhone } from 'react-icons/fi'
import { GiLeafSwirl } from 'react-icons/gi'
import { useSite } from '../context/SiteContext'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Rooms', path: '/rooms' },
  { name: 'Events', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { settings } = useSite()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.guestHouseName} className="h-10 w-auto object-contain" />
            ) : (
              <div className="bg-primary p-2 rounded-xl group-hover:bg-primary-dark transition-colors">
                <GiLeafSwirl className="text-white text-xl" />
              </div>
            )}
            <div>
              <h1 className="text-primary font-bold text-lg leading-none">{settings.guestHouseName?.split(' ').slice(0, 2).join(' ')}</h1>
              <p className="text-earth text-xs">Guest House</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${location.pathname === link.path ? 'bg-primary text-white' : 'text-gray-600 hover:bg-green-50 hover:text-primary'}`}>
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${settings.phone}`}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
              <FiPhone className="text-base" /> Call Now
            </a>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-green-50">
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-green-100 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === link.path ? 'bg-primary text-white' : 'text-gray-600 hover:bg-green-50 hover:text-primary'}`}>
              {link.name}
            </Link>
          ))}
          <a href={`tel:${settings.phone}`} className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-medium mt-2">
            <FiPhone /> {settings.phone}
          </a>
        </div>
      </div>
    </nav>
  )
}
