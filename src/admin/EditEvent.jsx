import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiUpload, FiX } from 'react-icons/fi'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function EditEvent() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [preview, setPreview] = useState(null)
  const [formData, setFormData] = useState({
    title: '', emoji: '🎉', category: 'Party', description: '',
    date: '', time: '', location: '', entryFee: '0',
    highlights: '', status: 'upcoming', image: null,
  })

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => {
      const e = res.data
      setFormData({ title: e.title, emoji: e.emoji || '🎉', category: e.category, description: e.description, date: e.date?.split('T')[0] || '', time: e.time, location: e.location, entryFee: e.entryFee, highlights: (e.highlights || []).join(', '), status: e.status, image: null })
      if (e.image) setPreview(e.image)
    }).catch(() => toast.error('Failed to load event')).finally(() => setFetching(false))
  }, [id])

  const set = (key, val) => setFormData({ ...formData, [key]: val })

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) { setFormData({ ...formData, image: file }); setPreview(URL.createObjectURL(file)) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([k, v]) => {
        if (k === 'image' && v) data.append('image', v)
        else if (k === 'highlights') data.append('highlights', JSON.stringify(v.split(',').map((h) => h.trim()).filter(Boolean)))
        else if (k !== 'image') data.append(k, v)
      })
      await api.put(`/events/${id}`, data)
      toast.success('Event updated!')
      navigate('/admin/events')
    } catch { toast.error('Failed to update') } finally { setLoading(false) }
  }

  if (fetching) return <p className="text-center text-gray-400 py-20">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/events')} className="p-2 hover:bg-gray-100 rounded-xl"><FiArrowLeft size={18} /></button>
        <h2 className="text-xl font-bold text-gray-800">Edit Event</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Title</label><input required value={formData.title} onChange={(e) => set('title',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" /></div>
          <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Emoji</label><input value={formData.emoji} onChange={(e) => set('emoji',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" /></div>
          <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Category</label><select value={formData.category} onChange={(e) => set('category',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary">{['Party','Nature','Adventure','Wellness','Food','Cultural'].map((c)=><option key={c}>{c}</option>)}</select></div>
          <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Status</label><select value={formData.status} onChange={(e) => set('status',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"><option value="upcoming">Upcoming</option><option value="past">Past</option></select></div>
          <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Date</label><input type="date" required value={formData.date} onChange={(e) => set('date',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" /></div>
          <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Time</label><input required value={formData.time} onChange={(e) => set('time',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" /></div>
          <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Location</label><input required value={formData.location} onChange={(e) => set('location',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" /></div>
          <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Entry Fee (Rs.)</label><input type="number" value={formData.entryFee} onChange={(e) => set('entryFee',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" /></div>
        </div>
        <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Description</label><textarea required rows={3} value={formData.description} onChange={(e) => set('description',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" /></div>
        <div><label className="block text-sm font-medium text-gray-600 mb-1.5">Highlights (comma separated)</label><input value={formData.highlights} onChange={(e) => set('highlights',e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" /></div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Event Image</label>
          {preview ? (
            <div className="relative w-full h-40 rounded-xl overflow-hidden">
              <img src={preview} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => { setPreview(null); set('image',null) }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><FiX size={14} /></button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary bg-gray-50">
              <FiUpload size={20} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Click to upload new image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          )}
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/admin/events')} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60">{loading ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </form>
    </div>
  )
}
