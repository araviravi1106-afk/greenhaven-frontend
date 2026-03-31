import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiCheck } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa'
import { useSite } from '../context/SiteContext'
import SEO from '../components/SEO'
import api from '../services/api'

export default function Contact() {
  const { settings } = useSite()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/enquiries', { name: formData.name, phone: formData.phone, email: formData.email, message: formData.message })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch { setSubmitted(true); setTimeout(() => setSubmitted(false), 4000) }
    finally { setSubmitting(false) }
  }

  return (
    <div className="pt-16 min-h-screen bg-cream-light">
      <SEO title="Contact Us" />
      <div className="relative py-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1423397527890-8c3c0a08f8b9?w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <p className="text-white/70 text-lg">We would love to hear from you</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            {[
              { icon: FiPhone, label: 'Phone', value: settings.phone, href: `tel:${settings.phone}` },
              { icon: FaWhatsapp, label: 'WhatsApp', value: '+'+settings.whatsapp, href: `https://wa.me/${settings.whatsapp}` },
              { icon: FiMail, label: 'Email', value: settings.email, href: `mailto:${settings.email}` },
            ].map((item) => (
              <a key={item.label} href={item.href} target={item.label === 'WhatsApp' ? '_blank' : '_self'} rel="noreferrer"
                className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-soft hover:shadow-card transition-all group">
                <div className="w-12 h-12 bg-green-100 group-hover:bg-primary rounded-xl flex items-center justify-center transition-colors">
                  <item.icon size={20} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase">{item.label}</p>
                  <p className="text-gray-800 font-semibold">{item.value}</p>
                </div>
              </a>
            ))}
            <div className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-soft">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0"><FiMapPin size={20} className="text-primary" /></div>
              <div><p className="text-xs text-gray-400 font-medium uppercase">Address</p><p className="text-gray-800 font-semibold">{settings.address}</p></div>
            </div>
            {settings.mapEmbedUrl && (
              <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
                <iframe title="Location" src={settings.mapEmbedUrl} width="100%" height="200" style={{border:0}} allowFullScreen="" loading="lazy" />
              </div>
            )}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-soft">
            <h3 className="text-xl font-bold text-gray-800 mb-5">Send Us a Message</h3>
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"><FiCheck size={28} className="text-primary" /></div>
                <h4 className="font-bold text-gray-800 text-lg">Message Sent!</h4>
                <p className="text-gray-500 text-sm mt-2">We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Your Name</label>
                    <input required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData,name:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone</label>
                    <input required placeholder="+91 99999 99999" value={formData.phone} onChange={(e) => setFormData({...formData,phone:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Email</label>
                  <input type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData,email:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Message</label>
                  <textarea required rows={4} placeholder="How can we help?" value={formData.message} onChange={(e) => setFormData({...formData,message:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
                </div>
                <button type="submit" disabled={submitting} className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
