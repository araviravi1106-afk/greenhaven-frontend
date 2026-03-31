import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiUpload, FiX } from 'react-icons/fi'
import api from '../services/api'
import toast from 'react-hot-toast'

const amenityOptions = ['King Bed', 'Queen Bed', 'Double Bed', '2 Beds', 'AC', 'WiFi', 'Hot Water', 'TV', 'Balcony', 'Mini Bar', 'Jacuzzi', 'Garden View', 'Forest View', 'Mini Fridge', 'Room Service', 'Kitchenette']

export default function AddRoom() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [previews, setPreviews] = useState([])
  const [formData, setFormData] = useState({
    name: '', type: 'Deluxe', price: '', guests: '2',
    description: '', amenities: [], featured: false, images: [],
  })

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData({ ...formData, images: files })
    setPreviews(files.map((f) => URL.createObjectURL(f)))
  }

  const removePreview = (index) => {
    const newFiles = formData.images.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newFiles })
    setPreviews(newPreviews)
  }

  const toggleAmenity = (amenity) => {
    const current = formData.amenities
    setFormData({
      ...formData,
      amenities: current.includes(amenity)
        ? current.filter((a) => a !== amenity)
        : [...current, amenity],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('type', formData.type)
      data.append('price', formData.price)
      data.append('guests', formData.guests)
      data.append('description', formData.description)
      data.append('amenities', JSON.stringify(formData.amenities))
      data.append('featured', formData.featured)
      formData.images.forEach((img) => data.append('images', img))
      await api.post('/rooms', data)
      toast.success('Room added successfully!')
      navigate('/admin/rooms')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add room')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/rooms')} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <FiArrowLeft size={18} />
        </button>
        <h2 className="text-xl font-bold text-gray-800">Add New Room</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-soft p-6 space-y-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Room Name</label>
            <input
              required value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Deluxe Nature Room"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Room Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
            >
              {['Standard', 'Deluxe', 'Suite', 'Family', 'Cottage'].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Price per Night (Rs.)</label>
            <input
              required type="number" value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="2499"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1.5">Max Guests</label>
            <select
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1.5">Description</label>
          <textarea
            required rows={3} value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the room..."
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {amenityOptions.map((a) => (
              <button
                key={a} type="button" onClick={() => toggleAmenity(a)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                  formData.amenities.includes(a)
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Room Images</label>
          <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary transition-colors bg-gray-50">
            <FiUpload size={20} className="text-gray-400 mb-2" />
            <span className="text-sm text-gray-400">Click to upload images</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {previews.map((src, i) => (
                <div key={i} className="relative w-20 h-16 rounded-xl overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button" onClick={() => removePreview(i)}
                    className="absolute top-0.5 right-0.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <FiX size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox" id="featured" checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-4 h-4 accent-primary"
          />
          <label htmlFor="featured" className="text-sm text-gray-600">Mark as Featured Room</label>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button" onClick={() => navigate('/admin/rooms')}
            className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit" disabled={loading}
            className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold text-sm transition-colors disabled:opacity-60"
          >
            {loading ? 'Adding...' : 'Add Room'}
          </button>
        </div>
      </form>
    </div>
  )
}
