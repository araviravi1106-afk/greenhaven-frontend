import { useState, useEffect } from 'react'
import { FiTrash2, FiPhone } from 'react-icons/fi'
import api from '../services/api'
import toast from 'react-hot-toast'

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function ManageEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  const fetchEnquiries = async () => {
    try {
      const res = await api.get('/enquiries')
      setEnquiries(res.data)
    } catch {
      toast.error('Failed to load enquiries')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEnquiries() }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/enquiries/${id}`, { status })
      toast.success('Status updated')
      fetchEnquiries()
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return
    try {
      await api.delete(`/enquiries/${id}`)
      toast.success('Enquiry deleted')
      fetchEnquiries()
    } catch {
      toast.error('Failed to delete')
    }
  }

  const filtered = filter === 'all' ? enquiries : enquiries.filter((e) => e.status === filter)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-800">Booking Enquiries ({enquiries.length})</h2>
        <div className="flex flex-wrap gap-2">
          {['all', 'new', 'contacted', 'confirmed', 'cancelled'].map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition-all ${
                filter === s ? 'bg-primary text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-primary'
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-20">Loading enquiries...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
          <p className="text-gray-400">No enquiries found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((enq) => (
            <div key={enq._id} className="bg-white rounded-2xl shadow-soft p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-800">{enq.name}</h3>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${statusColors[enq.status]}`}>
                      {enq.status}
                    </span>
                  </div>
                  <a href={`tel:${enq.phone}`} className="flex items-center gap-1.5 text-primary text-sm font-medium hover:underline">
                    <FiPhone size={13} /> {enq.phone}
                  </a>
                  {enq.email && <p className="text-gray-400 text-xs">{enq.email}</p>}
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500 pt-1">
                    {enq.roomType && <span>Room: {enq.roomType}</span>}
                    {enq.checkIn && <span>Check-in: {new Date(enq.checkIn).toLocaleDateString('en-IN')}</span>}
                    {enq.guests && <span>Guests: {enq.guests}</span>}
                  </div>
                  {enq.message && <p className="text-gray-500 text-xs mt-1 max-w-md">{enq.message}</p>}
                  <p className="text-gray-300 text-xs">{new Date(enq.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>

                <div className="flex flex-wrap gap-2 items-center">
                  <select
                    value={enq.status}
                    onChange={(e) => updateStatus(enq._id, e.target.value)}
                    className="border border-gray-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-primary"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <a href={`https://wa.me/${enq.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-xl text-xs font-medium transition-colors">
                    WhatsApp
                  </a>
                  <button onClick={() => handleDelete(enq._id)}
                    className="bg-red-50 hover:bg-red-100 text-red-500 p-1.5 rounded-xl transition-colors">
                    <FiTrash2 size={14} />
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
