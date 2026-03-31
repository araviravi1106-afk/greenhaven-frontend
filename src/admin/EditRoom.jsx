import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../services/api'
import toast from 'react-hot-toast'

const amenityOptions = ['King Bed', 'Queen Bed', 'Double Bed', '2 Beds', 'AC', 'WiFi', 'Hot Water', 'TV', 'Balcony', 'Mini Bar', 'Jacuzzi', 'Garden View', 'Forest View', 'Mini Fridge', 'Room Service', 'Kitchenette']

export default function EditRoom() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [formData, setFormData] = useState({
    name: '', type: 'Deluxe', price: '', guests: '2', description: '', amenities: [], featured: false,
  })

  useEffect(() => {
    api.get(`/rooms/${id}`).then((res) => {
      const r = res.data
      setFormData({ name: r.name, type: r.type, price: r.price, guests: r.guests, description: r.description, amenities: r.amenities || [], featured: r.featured || false })
    }).catch(() => toast.error('Failed to load room')).finally(() => setFetching(false))
  }, [id])

  const toggleAmenity = (a) => {
    setFormData({ ...formData, amenities: formData.amenities.includes(a) ? formData.amenities.filter((x) => x !== a) : [...formData.amenities, a] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      Object.entries(formData).forEach(([k, v]) => {
        if (k === 'amenities') data.append(k, JSON.stringify(v))
        else data.append(k, v)
      })
      await api.put(`/rooms/${id}`, data)
      toast.success('Room updated!')
      navigate('/admin/rooms')
    } catch { toast.error('Failed to update') } finally { setLoading(false) }
  }

  if (fetching) return <p className="text-center text-gray-400 py-20">Loading...</p>

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/rooms')} className="p-2 hover:bg-gray-100 rounded-xl"><FiArrowLeft size={18} /></button>
        <h2 className="text-xl font-bold text-gray-800">Edit Room</h2>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[['name','Room Name','text','Deluxe Nature Room'],['price','Price (Rs.)','number','2499']].map(([key,label,type,ph]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
              <input required type={type} value={formData[key]} onChange={(e) => setFormData({...formData,[key]:e.target.value})} placeholder={ph} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Type</label>
            <select value={formData.type} onChange={(e) => setFormData({...formData,type:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
              {['Standard','Deluxe','Suite','Family','Cottage'].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Guests</label>
            <select value={formData.guests} onChange={(e) => setFormData({...formData,guests:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
              {[1,2,3,4,5,6].map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Description</label>
          <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData,description:e.target.value})} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {amenityOptions.map((a) => (
              <button key={a} type="button" onClick={() => toggleAmenity(a)} className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${formData.amenities.includes(a) ? 'bg-primary text-white border-primary' : 'bg-white text-gray-600 border-gray-200 hover:border-primary'}`}>{a}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" id="featured" checked={formData.featured} onChange={(e) => setFormData({...formData,featured:e.target.checked})} className="w-4 h-4 accent-primary" />
          <label htmlFor="featured" className="text-sm text-gray-600">Featured Room</label>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => navigate('/admin/rooms')} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60">{loading ? 'Saving...' : 'Save Changes'}</button>
        </div>
      </form>
    </div>
  )
}
