import { GiLeafSwirl, GiMountainRoad } from 'react-icons/gi'
import { FiWifi, FiStar, FiShield } from 'react-icons/fi'
import { MdOutlineRestaurant } from 'react-icons/md'
const features = [
  { icon: GiLeafSwirl, title: 'Nature Surroundings', description: 'Surrounded by lush greenery and fresh mountain air.', color: 'bg-green-100 text-green-600' },
  { icon: FiStar, title: 'Premium Comfort', description: 'Luxury amenities and thoughtfully designed rooms.', color: 'bg-yellow-100 text-yellow-600' },
  { icon: FiWifi, title: 'Free High-Speed WiFi', description: 'Complimentary high-speed internet throughout the property.', color: 'bg-blue-100 text-blue-600' },
  { icon: MdOutlineRestaurant, title: 'Organic Dining', description: 'Fresh, locally sourced meals by our experienced chefs.', color: 'bg-orange-100 text-orange-600' },
  { icon: GiMountainRoad, title: 'Adventure Activities', description: 'Guided treks, nature walks, and outdoor experiences.', color: 'bg-purple-100 text-purple-600' },
  { icon: FiShield, title: '24/7 Safety', description: 'Round-the-clock security and staff for your comfort.', color: 'bg-red-100 text-red-600' },
]
export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-badge">Why Choose Us</span>
          <h2 className="section-title">Experience the Difference</h2>
          <p className="section-subtitle">We offer more than just a place to sleep — a complete nature experience.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="group p-6 bg-cream-light rounded-2xl hover:shadow-card transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-green-100">
              <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}><f.icon size={22} /></div>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
