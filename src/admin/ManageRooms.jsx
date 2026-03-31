import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'
import api from '../services/api'
import toast from 'react-hot-toast'

export default function ManageRooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [showImageModal, setShowImageModal] = useState(false)
  const [deletingImg, setDeletingImg] = useState(null)

  const fetchRooms = async () => {
    try {
      const res = await api.get('/rooms')
      setRooms(res.data)
    } catch {
      toast.error('Failed to load rooms')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRooms() }, [])

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('Delete this room? This cannot be undone.')) return
    try {
      await api.delete(`/rooms/${id}`)
      toast.success('Room deleted')
      fetchRooms()
    } catch {
      toast.error('Failed to delete room')
    }
  }

  const handleDeleteImage = async (roomId, imageUrl, imageIndex) => {
    if (!window.confirm('Delete this image?')) return
    setDeletingImg(imageIndex)
    try {
      const room = rooms.find((r) => r._id === roomId)
      const updatedImages = room.images.filter((_, i) => i !== imageIndex)
      const formData = new FormData()
      formData.append('name', room.name)
      formData.append('type', room.type)
      formData.append('price', room.price)
      formData.append('guests', room.guests)
      formData.append('description', room.description)
      formData.append('amenities', JSON.stringify(room.amenities))
      formData.append('existingImages', JSON.stringify(updatedImages))
      await api.put(`/rooms/${roomId}`, formData)
      toast.success('Image deleted')
      fetchRooms()
      setSelectedRoom((prev) => prev ? { ...prev, images: updatedImages } : null)
    } catch {
      toast.error('Failed to delete image')
    } finally {
      setDeletingImg(null)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Manage Rooms</h2>
        <Link to="/admin/rooms/add"
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <FiPlus size={16} /> Add Room
        </Link>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-20">Loading rooms...</p>
      ) : rooms.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
          <p className="text-gray-400 mb-4">No rooms added yet.</p>
          <Link to="/admin/rooms/add" className="text-primary font-medium hover:underline">Add your first room</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div key={room._id} className="bg-white rounded-2xl shadow-soft overflow-hidden">

              {/* Image with manage button */}
              <div className="relative h-40 group">
                {room.images?.[0] ? (
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-green-50 flex items-center justify-center text-4xl">🛏️</div>
                )}
                {room.images?.length > 0 && (
                  <button
                    onClick={() => { setSelectedRoom(room); setShowImageModal(true) }}
                    className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {room.images.length} image{room.images.length > 1 ? 's' : ''} — Manage
                  </button>
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-800 text-sm">{room.name}</h3>
                  <span className="bg-green-100 text-primary text-xs px-2 py-0.5 rounded-full">{room.type}</span>
                </div>
                <p className="text-primary font-bold text-lg mb-3">Rs. {room.price?.toLocaleString()}/night</p>
                <div className="flex gap-2">
                  <Link to={`/admin/rooms/edit/${room._id}`}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 rounded-xl text-xs font-medium transition-colors">
                    <FiEdit2 size={13} /> Edit
                  </Link>
                  <button
                    onClick={() => { setSelectedRoom(room); setShowImageModal(true) }}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-purple-50 hover:bg-purple-100 text-purple-600 py-2 rounded-xl text-xs font-medium transition-colors">
                    Images ({room.images?.length || 0})
                  </button>
                  <button onClick={() => handleDeleteRoom(room._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 py-2 rounded-xl text-xs font-medium transition-colors">
                    <FiTrash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Management Modal */}
      {showImageModal && selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-strong w-full max-w-lg max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="font-bold text-gray-800">Manage Images — {selectedRoom.name}</h3>
              <button onClick={() => { setShowImageModal(false); setSelectedRoom(null) }}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <FiX size={18} />
              </button>
            </div>
            <div className="p-5">
              {selectedRoom.images?.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No images for this room.</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {selectedRoom.images?.map((img, index) => (
                    <div key={index} className="relative group rounded-xl overflow-hidden aspect-video">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center">
                        <button
                          onClick={() => handleDeleteImage(selectedRoom._id, img, index)}
                          disabled={deletingImg === index}
                          className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1"
                        >
                          {deletingImg === index ? 'Deleting...' : (<><FiTrash2 size={12} /> Delete</>)}
                        </button>
                      </div>
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-primary text-white text-xs px-2 py-0.5 rounded-full">Cover</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-400 mt-4 text-center">
                New images add பண்ண Edit Room போங்க
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
