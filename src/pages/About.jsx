import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck } from 'react-icons/fi'
import { GiLeafSwirl, GiTreehouse, GiMountainRoad } from 'react-icons/gi'
import { useSite } from '../context/SiteContext'
import SEO from '../components/SEO'

export default function About() {
  const { settings } = useSite()
  return (
    <div className="pt-16 min-h-screen bg-cream-light">
      <SEO title="About Us" description={settings.aboutDescription} />
      <div className="relative py-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">About {settings.guestHouseName}</h1>
          <p className="text-white/70 text-lg">Our story, our values, our people</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <span className="section-badge">Our Story</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-5">{settings.aboutTitle}</h2>
            <p className="text-gray-500 leading-relaxed mb-6 whitespace-pre-line">{settings.aboutDescription}</p>
            <div className="space-y-3 mb-8">
              {['Over '+settings.totalGuests+' happy guests served','Award-winning eco-friendly practices','Locally sourced organic food','24/7 warm and attentive service'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center shrink-0"><FiCheck size={11} className="text-white" /></div>
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
              Get In Touch <FiArrowRight />
            </Link>
          </div>
          <div className="relative">
            <img src={settings.aboutImage} alt={settings.guestHouseName} className="rounded-2xl shadow-soft w-full object-cover h-96" />
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl p-4 shadow-card">
              <p className="text-3xl font-bold text-primary">{settings.totalGuests}</p>
              <p className="text-gray-500 text-sm">Happy Guests</p>
            </div>
            <div className="absolute -top-5 -right-5 bg-primary rounded-2xl p-4 shadow-card">
              <p className="text-3xl font-bold text-white">{settings.rating}</p>
              <p className="text-white/70 text-sm">Star Rating</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: GiLeafSwirl, title: 'Nature First', desc: 'We preserve and celebrate the natural environment.' },
            { icon: GiTreehouse, title: 'Warm Hospitality', desc: 'Every guest is treated like family with genuine care.' },
            { icon: GiMountainRoad, title: 'Authentic Experiences', desc: 'Real connections between guests and nature.' },
          ].map((value) => (
            <div key={value.title} className="bg-white rounded-2xl p-6 shadow-soft text-center hover:shadow-card transition-all">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4"><value.icon size={26} className="text-primary" /></div>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{value.title}</h3>
              <p className="text-gray-500 text-sm">{value.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-primary rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Experience {settings.guestHouseName}?</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <Link to="/rooms" className="inline-flex items-center gap-2 bg-white text-primary hover:bg-green-50 px-6 py-3 rounded-xl font-semibold text-sm">View Our Rooms <FiArrowRight /></Link>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-xl font-semibold text-sm">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
