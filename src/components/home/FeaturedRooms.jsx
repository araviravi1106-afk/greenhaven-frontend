import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiUsers } from 'react-icons/fi'
import { MdOutlineKingBed, MdOutlineWifi } from 'react-icons/md'
import { FaSnowflake } from 'react-icons/fa'
import api from '../../services/api'
export default function FeaturedRooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.get('/rooms').then((res) => setRooms(res.data.slice(0,3))).catch(() => setRooms([])).finally(() => setLoading(false))
  }, [])
  if (loading) return <section className="py-20 bg-cream-light"><div className="max-w-7xl mx-auto px-4 text-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div></section>
  if (rooms.length === 0) return null
  return (
    <section className="py-20 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div><span className="section-badge">Our Rooms</span><h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Accommodations</h2></div>
          <Link to="/rooms" className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">View All Rooms <FiArrowRight /></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
              <div className="relative h-52 overflow-hidden">
                <img src={room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">{room.type}</span>
                <span className="absolute bottom-3 right-3 bg-white/90 text-primary font-bold text-sm px-3 py-1 rounded-full">Rs. {room.price?.toLocaleString()}/night</span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-lg mb-1">{room.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{room.description}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1 text-gray-500 text-xs"><FiUsers size={13} /> {room.guests} Guests</span>
                  <span className="flex items-center gap-1 text-gray-500 text-xs"><MdOutlineKingBed size={14} /> {room.amenities?.[0]}</span>
                  <span className="flex items-center gap-1 text-gray-500 text-xs"><FaSnowflake size={12} /> AC</span>
                  <span className="flex items-center gap-1 text-gray-500 text-xs"><MdOutlineWifi size={14} /> WiFi</span>
                </div>
                <Link to={`/rooms/${room._id}`} className="block text-center bg-primary hover:bg-primary-dark text-white py-2.5 rounded-xl text-sm font-medium transition-colors">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
