import { useState, useEffect } from 'react'
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../services/api'

const staticImages = [
  { _id: 's1', url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', category: 'Rooms', alt: 'Luxury Room' },
  { _id: 's2', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', category: 'Property', alt: 'Property View' },
  { _id: 's3', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', category: 'Nature', alt: 'Campfire' },
  { _id: 's4', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', category: 'Nature', alt: 'Mountain View' },
  { _id: 's5', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', category: 'Dining', alt: 'Food' },
  { _id: 's6', url: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80', category: 'Nature', alt: 'Forest' },
]

const categories = ['All', 'Rooms', 'Property', 'Nature', 'Dining', 'Events', 'Activities']

export default function Gallery() {
  const [dbImages, setDbImages] = useState([])
  const [selected, setSelected] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/gallery')
      .then((res) => setDbImages(res.data))
      .catch(() => setDbImages([]))
      .finally(() => setLoading(false))
  }, [])

  const allImages = [...dbImages, ...staticImages]
  const filtered = selected === 'All' ? allImages : allImages.filter((img) => img.category === selected)

  return (
    <div className="pt-16 min-h-screen bg-cream-light">
      <div className="relative py-20 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')` }}>
        <div className="absolute inset-0 bg-primary-dark/80" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Our Gallery</h1>
          <p className="text-white/70 text-lg">A glimpse into the Green Haven experience</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelected(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${selected === cat ? 'bg-primary text-white shadow-card' : 'bg-white text-gray-600 hover:bg-green-50 hover:text-primary shadow-soft'}`}>
              {cat}
            </button>
          ))}
        </div>
        {loading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[1,2,3,4,5,6].map((n) => <div key={n} className="skeleton break-inside-avoid h-48 w-full rounded-2xl mb-4" />)}
          </div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((img, index) => (
              <div key={img._id} onClick={() => setLightbox(index)}
                className="break-inside-avoid cursor-pointer rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 hover:scale-105 group mb-4">
                <div className="relative">
                  <img src={img.url} alt={img.alt} className="w-full object-cover" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-3 py-1 rounded-full">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 p-2 rounded-full"><FiX size={24} /></button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox === 0 ? filtered.length - 1 : lightbox - 1) }} className="absolute left-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"><FiChevronLeft size={24} /></button>
          <img src={filtered[lightbox]?.url} alt="" className="max-h-screen max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
          <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox === filtered.length - 1 ? 0 : lightbox + 1) }} className="absolute right-4 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full"><FiChevronRight size={24} /></button>
          <div className="absolute bottom-4 text-white/60 text-sm">{lightbox + 1} / {filtered.length}</div>
        </div>
      )}
    </div>
  )
}
