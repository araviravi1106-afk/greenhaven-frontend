import SEO from '../components/SEO'
import HeroSection from '../components/home/HeroSection'
import WhyChooseUs from '../components/home/WhyChooseUs'
import FeaturedRooms from '../components/home/FeaturedRooms'
import ReviewsSection from '../components/home/ReviewsSection'
import CtaBanner from '../components/home/CtaBanner'
export default function Home() {
  return (
    <div className="pt-16">
      <SEO />
      <HeroSection />
      <WhyChooseUs />
      <FeaturedRooms />
      <ReviewsSection />
      <CtaBanner />
    </div>
  )
}
