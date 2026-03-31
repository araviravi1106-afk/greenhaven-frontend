import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUpload, FiX } from 'react-icons/fi'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function AddEvent() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [formData, setFormData] = useState({
    title: '', emoji: '🎉', category: 'Party', description: '',
    date: '', time: '', location: '', entryFee: '0',
    highlights: '', status: 'upcoming', image: null,
  })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([key, val]) => {
        if (key === 'image' && val) data.append('image', val)
        else if (key === 'highlights') data.append('highlights', JSON.stringify(val.split(',').map((h) => h.trim()).filter(Boolean)))
        else if (key !== 'image') data.append(key, val)
      })
      await api.post('/events', data)
      toast.success('Event added successfully!')
      navigate('/admin/events')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add event')
    } finally {
      setLoading(false)
    }
  }

  const set = (key, val) => setFormData({ ...formData, [key]: val })

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/events')} className="p-2 hover:bg-gray-100 rounded-xl">
          <FiArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Add New Event</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Event Title</label>
            <input required value={formData.title} onChange={(e) => set('title', e.target.value)}
              placeholder="Night DJ Party"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Emoji</label>
            <input value={formData.emoji} onChange={(e) => set('emoji', e.target.value)}
              placeholder="🎉"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Category</label>
            <select value={formData.category} onChange={(e) => set('category', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
              {['Party', 'Nature', 'Adventure', 'Wellness', 'Food', 'Cultural'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Status</label>
            <select value={formData.status} onChange={(e) => set('status', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Date</label>
            <input required type="date" value={formData.date} onChange={(e) => set('date', e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Time</label>
            <input required value={formData.time} onChange={(e) => set('time', e.target.value)}
              placeholder="7:00 PM - 10:00 PM"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Location</label>
            <input required value={formData.location} onChange={(e) => set('location', e.target.value)}
              placeholder="Poolside Arena"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Entry Fee (Rs.) — 0 for Free</label>
            <input type="number" value={formData.entryFee} onChange={(e) => set('entryFee', e.target.value)}
              placeholder="0"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Description</label>
          <textarea required rows={3} value={formData.description} onChange={(e) => set('description', e.target.value)}
            placeholder="Describe the event..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Highlights (comma separated)</label>
          <input value={formData.highlights} onChange={(e) => set('highlights', e.target.value)}
            placeholder="Live DJ, Poolside, Cocktails"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Event Image</label>
          {preview ? (
            <div className="relative w-full h-40 rounded-xl overflow-hidden">
              <img src={preview} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => { setPreview(null); set('image', null) }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                <FiX size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary bg-gray-50">
              <FiUpload size={20} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Click to upload image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => navigate('/admin/events')}
            className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium text-sm hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" disabled={loading}
            className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60">
            {loading ? 'Adding...' : 'Add Event'}
          </button>
        </div>
      </form>
    </div>
  )
}
