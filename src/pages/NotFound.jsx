import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { GiLeafSwirl } from 'react-icons/gi'

export default function NotFound() {
  return (
    <div className="pt-16 min-h-screen bg-cream-light flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <GiLeafSwirl size={40} className="text-primary" />
      </div>
      <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-8">
        Oops! The page you are looking for seems to have wandered off into the forest.
        Let us help you find your way back.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
      >
        <FiArrowLeft />
        Back to Home
      </Link>
    </div>
  )
}
