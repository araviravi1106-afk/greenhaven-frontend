import { useState, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiCalendar, FiClock, FiMapPin, FiTag } from 'react-icons/fi'
import api from '../services/api'

const categories = ['All', 'Party', 'Nature', 'Adventure', 'Wellness', 'Food', 'Cultural']

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showPast, setShowPast] = useState(false)

  useEffect(() => {
    api.get('/events')
      .then((res) => setEvents(res.data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = events.filter((e) => {
    const categoryMatch = selectedCategory === 'All' || e.category === selectedCategory
    const statusMatch = showPast ? true : e.status === 'upcoming'
    return categoryMatch && statusMatch
  })

  return (
    <div className="pt-16 min-h-screen bg-cream-light">
      <div className="relative py-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Events at Green Haven</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">Something exciting happening every week</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl p-5 shadow-soft mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-green-50 text-gray-600 hover:bg-green-100'}`}>
                {cat}
              </button>
            ))}
          </div>
          <button onClick={() => setShowPast(!showPast)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium border transition-all ${showPast ? 'bg-earth text-white border-earth' : 'bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary'}`}>
            {showPast ? 'Showing All' : 'Show Past Events'}
          </button>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map((n) => (
              <div key={n} className="bg-white rounded-2xl overflow-hidden shadow-soft">
                <div className="skeleton h-52 w-full" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-2">No events found</p>
            <p className="text-sm">Admin panel-ல events add பண்ணுங்க</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event) => (
              <div key={event._id} className={`bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1 group ${event.status === 'past' ? 'opacity-80' : ''}`}>
                <div className="relative h-52 overflow-hidden">
                  <img src={event.image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full ${event.status === 'upcoming' ? 'bg-primary' : 'bg-gray-500'}`}>
                    {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                  </span>
                  <span className="absolute top-3 right-3 bg-white/90 text-primary font-bold text-xs px-3 py-1 rounded-full">
                    {event.entryFee === 0 ? 'FREE' : `Rs. ${event.entryFee}`}
                  </span>
                  <div className="absolute bottom-3 left-3">
                    <h3 className="text-white font-bold text-lg">{event.emoji} {event.title}</h3>
                    <span className="text-white/70 text-xs">{event.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><FiCalendar size={14} className="text-primary shrink-0" />{formatDate(event.date)}</div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><FiClock size={14} className="text-primary shrink-0" />{event.time}</div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><FiMapPin size={14} className="text-primary shrink-0" />{event.location}</div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm"><FiTag size={14} className="text-primary shrink-0" />{event.entryFee === 0 ? 'Free Entry' : `Rs. ${event.entryFee}`}</div>
                  </div>
                  {event.highlights?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {event.highlights.map((h) => (
                        <span key={h} className="bg-green-50 text-primary text-xs px-2.5 py-1 rounded-full font-medium">{h}</span>
                      ))}
                    </div>
                  )}
                  {event.status === 'upcoming' ? (
                    <a href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi! I want to join *${event.title}* on ${formatDate(event.date)}.`)}`} target="_blank" rel="noreferrer"
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors w-full">
                      <FaWhatsapp size={16} /> Contact to Join
                    </a>
                  ) : (
                    <div className="text-center py-2.5 rounded-xl text-sm font-medium bg-gray-100 text-gray-400">Event Completed</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-12 bg-primary rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Want to Host a Private Event?</h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto text-sm">Birthdays, anniversaries, corporate retreats and more.</p>
          <a href="https://wa.me/919999999999?text=Hi! I want to enquire about hosting a private event." target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary hover:bg-green-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors">
            <FaWhatsapp size={18} className="text-green-500" /> Enquire Now
          </a>
        </div>
      </div>
    </div>
  )
}
