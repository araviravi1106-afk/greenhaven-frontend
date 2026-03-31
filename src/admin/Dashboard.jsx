import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiGrid, FiCalendar, FiImage, FiInbox, FiArrowRight } from 'react-icons/fi'
import api from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState({ rooms: 0, events: 0, gallery: 0, enquiries: 0 })
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [rooms, events, gallery, enq] = await Promise.all([
          api.get('/rooms'),
          api.get('/events'),
          api.get('/gallery'),
          api.get('/enquiries'),
        ])
        setStats({
          rooms: rooms.data.length,
          events: events.data.length,
          gallery: gallery.data.length,
          enquiries: enq.data.length,
        })
        setEnquiries(enq.data.slice(0, 5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Rooms', value: stats.rooms, icon: FiGrid, color: 'bg-green-100 text-green-600', link: '/admin/rooms' },
    { label: 'Total Events', value: stats.events, icon: FiCalendar, color: 'bg-blue-100 text-blue-600', link: '/admin/events' },
    { label: 'Gallery Images', value: stats.gallery, icon: FiImage, color: 'bg-purple-100 text-purple-600', link: '/admin/gallery' },
    { label: 'Enquiries', value: stats.enquiries, icon: FiInbox, color: 'bg-orange-100 text-orange-600', link: '/admin/enquiries' },
  ]

  const statusColors = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back!</h2>
        <p className="text-gray-500 text-sm mt-1">Here is what is happening at Green Haven today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.link}
            className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5"
          >
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
              <card.icon size={18} />
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {loading ? '...' : card.value}
            </p>
            <p className="text-gray-500 text-sm mt-0.5">{card.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-gray-800 text-lg">Recent Enquiries</h3>
          <Link to="/admin/enquiries" className="text-primary text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <FiArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-400 text-sm text-center py-8">Loading...</p>
        ) : enquiries.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">No enquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {enquiries.map((enq) => (
              <div key={enq._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{enq.name}</p>
                  <p className="text-gray-500 text-xs">{enq.phone} {enq.roomType ? `· ${enq.roomType}` : ''}</p>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[enq.status]}`}>
                  {enq.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Add Room', to: '/admin/rooms/add', color: 'bg-primary' },
          { label: 'Add Event', to: '/admin/events/add', color: 'bg-blue-500' },
          { label: 'Upload Image', to: '/admin/gallery', color: 'bg-purple-500' },
          { label: 'Settings', to: '/admin/settings', color: 'bg-earth' },
        ].map((action) => (
          <Link
            key={action.label}
            to={action.to}
            className={`${action.color} text-white text-center py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity`}
          >
            {action.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
