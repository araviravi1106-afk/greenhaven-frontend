import { FiStar } from 'react-icons/fi'
import { useSite } from '../../context/SiteContext'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => <FiStar key={s} size={14} className={s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />)}
    </div>
  )
}

export default function ReviewsSection() {
  const { settings } = useSite()
  const reviews = settings.reviews || []
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-badge">Guest Reviews</span>
          <h2 className="section-title">What Our Guests Say</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex gap-0.5">{[1,2,3,4,5].map((s) => <FiStar key={s} size={18} className="text-yellow-400 fill-yellow-400" />)}</div>
            <span className="font-bold text-gray-800 text-lg">{settings.rating}</span>
            <span className="text-gray-400 text-sm">/ 5 based on {settings.totalGuests} reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="p-6 bg-cream-light rounded-2xl border border-green-50 hover:shadow-card transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${review.color || 'bg-green-500'} rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {review.avatar || review.name?.slice(0,2)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.name}</h4>
                      <p className="text-gray-400 text-xs">{review.location}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mt-3">"{review.review}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
