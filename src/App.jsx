import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { SiteProvider } from './context/SiteContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Events from './pages/Events'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import SiteSettingsAdmin from './admin/SiteSettingsAdmin'
import ManageRooms from './admin/ManageRooms'
import AddRoom from './admin/AddRoom'
import EditRoom from './admin/EditRoom'
import ManageEvents from './admin/ManageEvents'
import AddEvent from './admin/AddEvent'
import EditEvent from './admin/EditEvent'
import ManageGallery from './admin/ManageGallery'
import ManageEnquiries from './admin/ManageEnquiries'

function ProtectedRoute({ children }) {
  const { isAdmin, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>
  return isAdmin ? children : <Navigate to="/admin" replace />
}

function PublicLayout() {
  return (
    <div className="font-poppins bg-cream-light min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

function App() {
  return (
    <SiteProvider>
      <AuthProvider>
        <Router>
          <Toaster position="top-right" toastOptions={{ style: { borderRadius: '12px', fontFamily: 'Poppins, sans-serif', fontSize: '14px' } }} />
          <Routes>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="site-settings" element={<SiteSettingsAdmin />} />
              <Route path="rooms" element={<ManageRooms />} />
              <Route path="rooms/add" element={<AddRoom />} />
              <Route path="rooms/edit/:id" element={<EditRoom />} />
              <Route path="events" element={<ManageEvents />} />
              <Route path="events/add" element={<AddEvent />} />
              <Route path="events/edit/:id" element={<EditEvent />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
            </Route>
            <Route path="/*" element={<PublicLayout />} />
          </Routes>
        </Router>
      </AuthProvider>
    </SiteProvider>
  )
}

export default App
