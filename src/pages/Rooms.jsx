import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiFilter } from 'react-icons/fi'
import { MdOutlineKingBed, MdOutlineWifi } from 'react-icons/md'
import { FaSnowflake } from 'react-icons/fa'
import { FiStar } from 'react-icons/fi'
import api from '../services/api'

const types = ['All', 'Standard', 'Deluxe', 'Suite', 'Family', 'Cottage']

export default function Rooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedType, setSelectedType] = useState('All')
  const [maxPrice, setMaxPrice] = useState(10000)
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    api.get('/rooms')
      .then((res) => setRooms(res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = rooms
    .filter((r) => selectedType === 'All' || r.type === selectedType)
    .filter((r) => r.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  return (
    <div className="pt-16 min-h-screen bg-cream-light">
      <div className="relative py-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Rooms</h1>
          <p className="text-white/70 text-lg">Find your perfect nature retreat</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-5 shadow-soft mb-8 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-48">
            <label className="block text-sm font-medium text-gray-600 mb-2">Room Type</label>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button key={type} onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${selectedType === type ? 'bg-primary text-white' : 'bg-green-50 text-gray-600 hover:bg-green-100'}`}>
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="min-w-48">
            <label className="block text-sm font-medium text-gray-600 mb-2">Max Price: Rs. {maxPrice.toLocaleString()}</label>
            <input type="range" min={1000} max={10000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div className="min-w-40">
            <label className="block text-sm font-medium text-gray-600 mb-2">Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary">
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiFilter size={14} /> {filtered.length} rooms found
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((n) => (
              <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-soft">
                <div className="skeleton h-52 w-full" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-1/2" />
                  <div className="skeleton h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-2">No rooms found</p>
            <p className="text-sm">Admin panel-ல rooms add பண்ணுங்க</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((room) => (
              <div key={room._id} className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group">
                <div className="relative h-52 overflow-hidden">
                  <img src={room.images?.[0] || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'} alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">{room.type}</span>
                  <span className="absolute bottom-3 right-3 bg-white/90 text-primary font-bold text-sm px-3 py-1 rounded-full">Rs. {room.price?.toLocaleString()}/night</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1 mb-1">
                    <FiStar size={13} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{room.rating || '4.5'}</span>
                    <span className="text-gray-400 text-xs">({room.reviews || 0} reviews)</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{room.name}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{room.description}</p>
                  <div className="flex flex-wrap gap-3 mb-4">
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
        )}
      </div>
    </div>
  )
}
