import { useState, useEffect } from 'react'
import { FiSave, FiUpload, FiX, FiPlus, FiTrash2 } from 'react-icons/fi'
import api from '../services/api'
import { useSite } from '../context/SiteContext'
import toast from 'react-hot-toast'

const tabs = ['General', 'Hero', 'About', 'Reviews', 'Contact', 'Social', 'SEO']

export default function SiteSettingsAdmin() {
  const { settings: current, refetch } = useSite()
  const [activeTab, setActiveTab] = useState('General')
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({})
  const [previews, setPreviews] = useState({})
  const [files, setFiles] = useState({})
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    setForm({ ...current })
    setReviews(current.reviews || [])
  }, [current])

  const set = (key, val) => setForm((prev) => ({ ...prev, [key]: val }))

  const handleFile = (key, e) => {
    const file = e.target.files[0]
    if (!file) return
    setFiles((prev) => ({ ...prev, [key]: file }))
    setPreviews((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }))
  }

  const removeFile = (key) => {
    setFiles((prev) => { const n = { ...prev }; delete n[key]; return n })
    setPreviews((prev) => { const n = { ...prev }; delete n[key]; return n })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const data = new FormData()
      const fields = ['guestHouseName','tagline','description','phone','whatsapp','email','address','mapEmbedUrl','instagram','facebook','youtube','heroTitle','heroSubtitle','aboutTitle','aboutDescription','foundedYear','totalGuests','rating','experience','seoTitle','seoDescription','seoKeywords']
      fields.forEach((f) => { if (form[f] !== undefined) data.append(f, form[f]) })
      data.append('reviews', JSON.stringify(reviews))
      Object.entries(files).forEach(([key, file]) => data.append(key, file))
      await api.put('/site-settings', data)
      toast.success('Settings saved! Site updated.')
      refetch()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const addReview = () => setReviews([...reviews, { name: '', location: '', rating: 5, review: '', avatar: '', color: 'bg-green-500' }])
  const updateReview = (i, key, val) => { const r = [...reviews]; r[i] = { ...r[i], [key]: val }; setReviews(r) }
  const removeReview = (i) => setReviews(reviews.filter((_, idx) => idx !== i))

  const ImageUpload = ({ fieldKey, label, current: currentUrl }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">{label}</label>
      {(previews[fieldKey] || currentUrl) ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden mb-2">
          <img src={previews[fieldKey] || currentUrl} alt={label} className="w-full h-full object-cover" />
          <button type="button" onClick={() => removeFile(fieldKey)}
            className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full">
            <FiX size={14} />
          </button>
          <label className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-3 py-1 rounded-full cursor-pointer hover:bg-black/80">
            Change <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(fieldKey, e)} />
          </label>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary bg-gray-50">
          <FiUpload size={20} className="text-gray-400 mb-2" />
          <span className="text-sm text-gray-400">Click to upload</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(fieldKey, e)} />
        </label>
      )}
    </div>
  )

  const Input = ({ label, fieldKey, placeholder, type = 'text' }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      <input type={type} value={form[fieldKey] || ''} onChange={(e) => set(fieldKey, e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary" />
    </div>
  )

  const Textarea = ({ label, fieldKey, placeholder, rows = 3 }) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>
      <textarea rows={rows} value={form[fieldKey] || ''} onChange={(e) => set(fieldKey, e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
    </div>
  )

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Site Settings</h2>
          <p className="text-gray-500 text-sm mt-1">Edit everything — changes reflect on website immediately after save.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-60 transition-colors">
          <FiSave size={16} /> {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white rounded-2xl p-3 shadow-soft">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeTab === tab ? 'bg-primary text-white' : 'text-gray-500 hover:bg-green-50 hover:text-primary'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6">

        {/* GENERAL */}
        {activeTab === 'General' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-gray-700 border-b pb-3">General Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Guest House Name" fieldKey="guestHouseName" placeholder="Green Haven Guest House" />
              <Input label="Tagline" fieldKey="tagline" placeholder="Your Perfect Nature Retreat" />
            </div>
            <Textarea label="Short Description (shown in footer)" fieldKey="description" placeholder="Experience the perfect blend of nature and comfort." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Founded Year" fieldKey="foundedYear" placeholder="2018" />
              <Input label="Total Guests (e.g. 500+)" fieldKey="totalGuests" placeholder="500+" />
              <Input label="Rating (e.g. 4.9)" fieldKey="rating" placeholder="4.9" />
              <Input label="Years Experience (e.g. 5+)" fieldKey="experience" placeholder="5+" />
            </div>
            <ImageUpload fieldKey="logo" label="Logo Image" current={form.logo} />
          </div>
        )}

        {/* HERO */}
        {activeTab === 'Hero' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-gray-700 border-b pb-3">Hero Section (Home Page Banner)</h3>
            <Input label="Hero Title" fieldKey="heroTitle" placeholder="Your Perfect Nature Retreat" />
            <Textarea label="Hero Subtitle" fieldKey="heroSubtitle" placeholder="Escape the city noise..." rows={2} />
            <ImageUpload fieldKey="heroImage" label="Hero Background Image" current={form.heroImage} />
          </div>
        )}

        {/* ABOUT */}
        {activeTab === 'About' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-gray-700 border-b pb-3">About Page Content</h3>
            <Input label="About Title" fieldKey="aboutTitle" placeholder="Born from a Love of Nature" />
            <Textarea label="About Description" fieldKey="aboutDescription" placeholder="Tell your story..." rows={5} />
            <ImageUpload fieldKey="aboutImage" label="About Section Image" current={form.aboutImage} />
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === 'Reviews' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-semibold text-gray-700">Guest Reviews</h3>
              <button onClick={addReview} className="flex items-center gap-2 bg-primary text-white px-3 py-1.5 rounded-xl text-xs font-medium">
                <FiPlus size={14} /> Add Review
              </button>
            </div>
            <div className="space-y-4">
              {reviews.map((review, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 space-y-3 relative">
                  <button onClick={() => removeReview(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600"><FiTrash2 size={15} /></button>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                      <input value={review.name} onChange={(e) => updateReview(i, 'name', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
                      <input value={review.location} onChange={(e) => updateReview(i, 'location', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Initials (e.g. PS)</label>
                      <input value={review.avatar} onChange={(e) => updateReview(i, 'avatar', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Rating (1-5)</label>
                      <select value={review.rating} onChange={(e) => updateReview(i, 'rating', Number(e.target.value))}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary">
                        {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} Stars</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Review Text</label>
                    <textarea value={review.review} onChange={(e) => updateReview(i, 'review', e.target.value)} rows={2}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary resize-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Avatar Color</label>
                    <div className="flex gap-2">
                      {['bg-green-500','bg-blue-500','bg-purple-500','bg-orange-500','bg-red-500','bg-pink-500'].map((color) => (
                        <button key={color} type="button" onClick={() => updateReview(i, 'color', color)}
                          className={`w-7 h-7 rounded-full ${color} ${review.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACT */}
        {activeTab === 'Contact' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-gray-700 border-b pb-3">Contact Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Phone Number" fieldKey="phone" placeholder="+91 99999 99999" />
              <Input label="WhatsApp (with country code, no +)" fieldKey="whatsapp" placeholder="919999999999" />
              <Input label="Email Address" fieldKey="email" placeholder="info@greenhaven.com" type="email" />
            </div>
            <Textarea label="Full Address" fieldKey="address" placeholder="123 Nature Road, Forest Hills, Tamil Nadu" rows={2} />
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">Google Maps Embed URL</label>
              <p className="text-xs text-gray-400 mb-2">Google Maps → Share → Embed a map → Copy src URL only</p>
              <textarea rows={3} value={form.mapEmbedUrl || ''} onChange={(e) => set('mapEmbedUrl', e.target.value)}
                placeholder="https://www.google.com/maps/embed?pb=..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" />
            </div>
          </div>
        )}

        {/* SOCIAL */}
        {activeTab === 'Social' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-gray-700 border-b pb-3">Social Media Links</h3>
            <Input label="Instagram URL" fieldKey="instagram" placeholder="https://instagram.com/yourpage" />
            <Input label="Facebook URL" fieldKey="facebook" placeholder="https://facebook.com/yourpage" />
            <Input label="YouTube URL" fieldKey="youtube" placeholder="https://youtube.com/@yourchannel" />
          </div>
        )}

        {/* SEO */}
        {activeTab === 'SEO' && (
          <div className="space-y-5">
            <h3 className="font-semibold text-gray-700 border-b pb-3">SEO Settings</h3>
            <Input label="SEO Title (shown in Google)" fieldKey="seoTitle" placeholder="Green Haven Guest House — Nature Retreat" />
            <Textarea label="SEO Description (shown in Google)" fieldKey="seoDescription" placeholder="Experience luxury comfort surrounded by lush greenery..." rows={3} />
            <Input label="Keywords (comma separated)" fieldKey="seoKeywords" placeholder="guest house, nature retreat, eco stay, Tamil Nadu" />
            <ImageUpload fieldKey="ogImage" label="Social Share Image (OG Image)" current={form.ogImage} />
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-primary mb-2">SEO Preview</p>
              <div className="bg-white rounded-lg p-3 border">
                <p className="text-blue-600 text-sm font-medium">{form.seoTitle || 'Green Haven Guest House'}</p>
                <p className="text-green-600 text-xs">www.yoursite.netlify.app</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{form.seoDescription || 'Your description appears here in Google search results.'}</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Save button bottom */}
      <button onClick={handleSave} disabled={saving}
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 rounded-xl font-semibold text-sm disabled:opacity-60 transition-colors">
        <FiSave size={16} /> {saving ? 'Saving Changes...' : 'Save All Changes — Reflect on Website'}
      </button>
    </div>
  )
}
