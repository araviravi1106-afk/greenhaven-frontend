import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiUsers, FiArrowLeft, FiCheck, FiPhone } from 'react-icons/fi'
import { FaWhatsapp, FaStar } from 'react-icons/fa'
import { MdOutlineKingBed, MdOutlineWifi } from 'react-icons/md'
import { FaSnowflake } from 'react-icons/fa'
import api from '../services/api'

export default function RoomDetail() {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', guests: '1' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.get(`/rooms/${id}`)
      .then((res) => setRoom(res.data))
      .catch(() => setRoom(null))
      .finally(() => setLoading(false))
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/enquiries', {
        name: formData.name,
        phone: formData.phone,
        checkIn: formData.date,
        guests: formData.guests,
        roomType: room?.type,
        message: `Interested in ${room?.name}`,
      })
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setFormData({ name: '', phone: '', date: '', guests: '1' })
    } catch {
      alert('Failed to submit. Please try WhatsApp or Call.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!room) return (
    <div className="pt-16 min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold text-gray-700">Room not found</h2>
      <Link to="/rooms" className="text-primary hover:underline flex items-center gap-2"><FiArrowLeft /> Back to Rooms</Link>
    </div>
  )

  const images = room.images?.length > 0 ? room.images : ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80']
  const whatsappMsg = `Hi! I am interested in booking the *${room.name}* for Rs.${room.price}/night.`

  return (
    <div className="pt-16 min-h-screen bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link to="/rooms" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary text-sm font-medium mb-6 block">
          <FiArrowLeft /> Back to Rooms
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative rounded-2xl overflow-hidden h-80 md:h-96 shadow-soft">
              <img src={images[activeImage]} alt={room.name} className="w-full h-full object-cover transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <span className="absolute top-4 left-4 bg-primary text-white text-sm font-medium px-4 py-1.5 rounded-full">{room.type}</span>
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, index) => (
                  <button key={index} onClick={() => setActiveImage(index)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === index ? 'border-primary scale-105' : 'border-transparent opacity-70'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{room.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map((s) => <FaStar key={s} size={13} className={s <= Math.floor(room.rating || 4.5) ? 'text-yellow-400' : 'text-gray-200'} />)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{room.rating || '4.5'}</span>
                    <span className="text-gray-400 text-sm">({room.reviews || 0} reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">Rs. {room.price?.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">per night</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 py-4 border-y border-gray-100 mb-4">
                <span className="flex items-center gap-1.5 text-gray-600 text-sm"><FiUsers size={15} className="text-primary" /> {room.guests} Guests</span>
                <span className="flex items-center gap-1.5 text-gray-600 text-sm"><MdOutlineKingBed size={16} className="text-primary" /> {room.amenities?.[0]}</span>
                <span className="flex items-center gap-1.5 text-gray-600 text-sm"><FaSnowflake size={13} className="text-primary" /> Air Conditioned</span>
                <span className="flex items-center gap-1.5 text-gray-600 text-sm"><MdOutlineWifi size={16} className="text-primary" /> Free WiFi</span>
              </div>
              <p className="text-gray-600 leading-relaxed">{room.description}</p>
            </div>
            {room.amenities?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Room Amenities</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {room.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-gray-600 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                        <FiCheck size={11} className="text-primary" />
                      </div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <div className="text-center mb-6">
                  <p className="text-3xl font-bold text-primary">Rs. {room.price?.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">per night</p>
                </div>
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck size={28} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">Enquiry Sent!</h3>
                    <p className="text-gray-500 text-sm mt-2">We will contact you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">Your Name</label>
                      <input type="text" required placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">Phone Number</label>
                      <input type="tel" required placeholder="+91 99999 99999" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">Check-in Date</label>
                      <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">Guests</label>
                      <select value={formData.guests} onChange={(e) => setFormData({...formData, guests: e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
                        {[1,2,3,4].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                      </select>
                    </div>
                    <button type="submit" disabled={submitting} className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60">
                      {submitting ? 'Sending...' : 'Send Booking Enquiry'}
                    </button>
                  </form>
                )}
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-soft space-y-3">
                <p className="text-sm font-semibold text-gray-700 text-center">Or contact us directly</p>
                <a href={`https://wa.me/919999999999?text=${encodeURIComponent(whatsappMsg)}`} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-sm font-medium transition-colors w-full">
                  <FaWhatsapp size={18} /> Book via WhatsApp
                </a>
                <a href="tel:+919999999999" className="flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-xl text-sm font-medium transition-colors w-full">
                  <FiPhone size={16} /> Call to Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
