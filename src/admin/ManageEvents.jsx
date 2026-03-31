import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function ManageEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events')
      setEvents(res.data)
    } catch {
      toast.error('Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEvents() }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return
    try {
      await api.delete(`/events/${id}`)
      toast.success('Event deleted')
      fetchEvents()
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Manage Events</h2>
        <Link
          to="/admin/events/add"
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
        >
          <FiPlus size={16} /> Add Event
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-20">Loading events...</p>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
          <p className="text-gray-400 mb-4">No events added yet.</p>
          <Link to="/admin/events/add" className="text-primary font-medium hover:underline">Add your first event</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div key={event._id} className="bg-white rounded-2xl shadow-soft overflow-hidden">
              {event.image ? (
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-blue-50 flex items-center justify-center text-4xl">
                  {event.emoji || '🎉'}
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-gray-800 text-sm mb-1">{event.emoji} {event.title}</h3>
                <p className="text-gray-400 text-xs mb-1">{new Date(event.date).toLocaleDateString('en-IN')}</p>
                <p className="text-primary text-sm font-semibold mb-3">
                  {event.entryFee === 0 ? 'Free Entry' : `Rs. ${event.entryFee}`}
                </p>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${event.status === 'upcoming' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {event.status}
                </span>
                <div className="flex gap-2 mt-3">
                  <Link
                    to={`/admin/events/edit/${event._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-xl text-xs font-medium transition-colors"
                  >
                    <FiEdit2 size={13} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 py-2 rounded-xl text-xs font-medium transition-colors"
                  >
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
