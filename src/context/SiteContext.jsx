import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const SiteContext = createContext()

const defaultSettings = {
  guestHouseName: 'Green Haven Guest House',
  tagline: 'Your Perfect Nature Retreat',
  description: 'Experience the perfect blend of nature and comfort.',
  logo: '',
  phone: '+91 99999 99999',
  whatsapp: '919999999999',
  email: 'info@greenhaven.com',
  address: '123 Nature Road, Forest Hills, Tamil Nadu',
  mapEmbedUrl: '',
  instagram: '', facebook: '', youtube: '',
  heroTitle: 'Your Perfect Nature Retreat',
  heroSubtitle: 'Escape the city noise and immerse yourself in tranquility.',
  heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80',
  aboutTitle: 'Born from a Love of Nature',
  aboutDescription: 'Green Haven was founded in 2018 by nature enthusiasts.',
  aboutImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  foundedYear: '2018', totalGuests: '500+', rating: '4.9', experience: '5+',
  reviews: [
    { name: 'Priya Sharma', location: 'Chennai', rating: 5, review: 'Absolutely breathtaking! Staff was incredibly warm. Will definitely come back!', avatar: 'PS', color: 'bg-green-500' },
    { name: 'Rahul Mehta', location: 'Bangalore', rating: 5, review: 'Perfect weekend getaway. Best guest house ever!', avatar: 'RM', color: 'bg-blue-500' },
    { name: 'Anjali Nair', location: 'Coimbatore', rating: 5, review: 'Family trip was amazing. Kids loved the nature walks!', avatar: 'AN', color: 'bg-purple-500' },
    { name: 'Karthik Rajan', location: 'Madurai', rating: 5, review: 'Campfire night was magical. Amazing place!', avatar: 'KR', color: 'bg-orange-500' },
  ],
  seoTitle: 'Green Haven Guest House — Nature Retreat',
  seoDescription: 'Experience luxury comfort surrounded by lush greenery.',
  seoKeywords: 'guest house, nature retreat, eco stay',
  ogImage: '',
}

export function SiteProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    api.get('/site-settings')
      .then((res) => { setSettings({ ...defaultSettings, ...res.data }); setLoaded(true) })
      .catch(() => setLoaded(true))
  }, [])

  const refetch = () => {
    api.get('/site-settings')
      .then((res) => setSettings({ ...defaultSettings, ...res.data }))
      .catch(() => {})
  }

  return (
    <SiteContext.Provider value={{ settings, loaded, refetch }}>
      {children}
    </SiteContext.Provider>
  )
}

export const useSite = () => useContext(SiteContext)
