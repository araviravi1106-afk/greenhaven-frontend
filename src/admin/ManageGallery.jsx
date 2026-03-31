import { useState, useEffect } from 'react'
import { FiUpload, FiTrash2, FiX, FiEye } from 'react-icons/fi'
import api from '../services/api'
import toast from 'react-hot-toast'

const categories = ['Property', 'Rooms', 'Nature', 'Dining', 'Events', 'Activities']

export default function ManageGallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [category, setCategory] = useState('Property')
  const [alt, setAlt] = useState('')
  const [lightbox, setLightbox] = useState(null)
  const [filterCat, setFilterCat] = useState('All')

  const fetchImages = async () => {
    try {
      const res = await api.get('/gallery')
      setImages(res.data)
    } catch {
      toast.error('Failed to load gallery')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchImages() }, [])

  const handleFileChange = (e) => {
    const f = e.target.files[0]
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)) }
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    if (!file) return toast.error('Please select an image')
    setUploading(true)
    try {
      const data = new FormData()
      data.append('image', file)
      data.append('category', category)
      data.append('alt', alt || 'Green Haven')
      await api.post('/gallery', data)
      toast.success('Image uploaded!')
      setFile(null); setPreview(null); setAlt('')
      fetchImages()
    } catch {
      toast.error('Upload failed — Check Cloudinary keys in .env')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image permanently?')) return
    try {
      await api.delete(`/gallery/${id}`)
      toast.success('Image deleted')
      fetchImages()
    } catch {
      toast.error('Failed to delete')
    }
  }

  const filtered = filterCat === 'All' ? images : images.filter((img) => img.category === filterCat)

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">Manage Gallery</h2>

      {/* Upload Section */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="font-semibold text-gray-700 mb-4">Upload New Image</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary">
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Alt Text (description)</label>
              <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Green Haven Room View"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>
          {preview ? (
            <div className="relative w-48 h-36 rounded-xl overflow-hidden">
              <img src={preview} alt="" className="w-full h-full object-cover" />
              <button type="button" onClick={() => { setPreview(null); setFile(null) }}
                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                <FiX size={12} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary bg-gray-50 transition-colors">
              <FiUpload size={20} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-400">Click to select image</span>
              <span className="text-xs text-gray-300 mt-1">JPG, PNG, WEBP supported</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          )}
          <button type="submit" disabled={uploading || !file}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-60 transition-colors flex items-center gap-2">
            {uploading ? 'Uploading...' : (<><FiUpload size={15} /> Upload Image</>)}
          </button>
        </form>
      </div>

      {/* Gallery Images */}
      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="font-semibold text-gray-700">Uploaded Images ({images.length})</h3>
          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map((c) => (
              <button key={c} onClick={() => setFilterCat(c)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${filterCat === c ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 hover:bg-green-50 hover:text-primary'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p>No images uploaded yet.</p>
            <p className="text-sm mt-1">Cloudinary keys set பண்ணினா upload work ஆகும்</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.map((img) => (
              <div key={img._id} className="relative group rounded-xl overflow-hidden aspect-square bg-gray-100">
                <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <span className="text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded-full">{img.category}</span>
                  <div className="flex gap-2">
                    <button onClick={() => setLightbox(img.url)}
                      className="bg-white/20 hover:bg-white/30 text-white p-1.5 rounded-lg transition-colors">
                      <FiEye size={14} />
                    </button>
                    <button onClick={() => handleDelete(img._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-lg transition-colors">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-full"><FiX size={22} /></button>
          <img src={lightbox} alt="" className="max-h-screen max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
