import { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import { GiLeafSwirl } from 'react-icons/gi'
import { FiHome, FiGrid, FiCalendar, FiImage, FiInbox, FiSettings, FiLogOut, FiMenu, FiX, FiSliders } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useSite } from '../context/SiteContext'
import toast from 'react-hot-toast'

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FiHome },
  { name: 'Site Settings', path: '/admin/site-settings', icon: FiSliders },
  { name: 'Rooms', path: '/admin/rooms', icon: FiGrid },
  { name: 'Events', path: '/admin/events', icon: FiCalendar },
  { name: 'Gallery', path: '/admin/gallery', icon: FiImage },
  { name: 'Enquiries', path: '/admin/enquiries', icon: FiInbox },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { settings } = useSite()

  const handleLogout = () => { logout(); toast.success('Logged out'); navigate('/admin') }

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        {settings.logo ? <img src={settings.logo} alt="logo" className="h-8 w-auto object-contain" /> : <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center"><GiLeafSwirl size={20} className="text-white" /></div>}
        <div>
          <p className="text-white font-bold text-sm leading-none">{settings.guestHouseName?.split(' ').slice(0,2).join(' ')}</p>
          <p className="text-white/60 text-xs">Admin Panel</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path} onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === item.path ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
            <item.icon size={17} /> {item.name}
          </Link>
        ))}
      </nav>
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        <a href="/" target="_blank" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all">View Website</a>
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/70 hover:bg-white/10 hover:text-white transition-all w-full">
          <FiLogOut size={17} /> Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50 font-poppins">
      <aside className="hidden md:flex w-60 bg-primary-dark flex-col shrink-0"><Sidebar /></aside>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-60 bg-primary-dark flex flex-col"><Sidebar /></aside>
        </div>
      )}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100"><FiMenu size={20} /></button>
          <h1 className="font-bold text-gray-800 text-lg">{navItems.find((n) => n.path === location.pathname)?.name || 'Admin'}</h1>
          <span className="text-xs text-gray-400 hidden sm:block">{settings.guestHouseName}</span>
        </header>
        <main className="flex-1 overflow-y-auto p-6"><Outlet /></main>
      </div>
    </div>
  )
}
