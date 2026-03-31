import { useEffect } from 'react'
import { useSite } from '../context/SiteContext'

export default function SEO({ title, description, image, url }) {
  const { settings } = useSite()
  const pageTitle = title ? `${title} | ${settings.guestHouseName}` : settings.seoTitle
  const pageDesc = description || settings.seoDescription
  const pageImage = image || settings.ogImage || settings.heroImage
  const pageUrl = url || window.location.href

  useEffect(() => {
    document.title = pageTitle
    const setMeta = (name, content, prop = false) => {
      const attr = prop ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    setMeta('description', pageDesc)
    setMeta('keywords', settings.seoKeywords)
    setMeta('og:title', pageTitle, true)
    setMeta('og:description', pageDesc, true)
    setMeta('og:image', pageImage, true)
    setMeta('og:url', pageUrl, true)
    setMeta('og:type', 'website', true)
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', pageTitle)
    setMeta('twitter:description', pageDesc)
    setMeta('twitter:image', pageImage)
  }, [pageTitle, pageDesc, pageImage, pageUrl, settings])

  return null
}
