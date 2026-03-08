import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  images: string[]
  initialIndex: number
  name: string
  onClose: () => void
}

function LightboxInner({ images, initialIndex, name, onClose }: Props) {
  const [index, setIndex] = useState(initialIndex)
  const [fading, setFading] = useState(false)
  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)

  const goTo = (newIndex: number) => {
    setFading(true)
    setTimeout(() => {
      setIndex(newIndex)
      setFading(false)
    }, 180)
  }

  const prev = () => goTo((index - 1 + images.length) % images.length)
  const next = () => goTo((index + 1) % images.length)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [index])

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onTouchStart={e => {
        e.stopPropagation()
        touchX.current = e.touches[0].clientX
        touchY.current = e.touches[0].clientY
      }}
      onTouchEnd={e => {
        e.stopPropagation()
        if (touchX.current === null || touchY.current === null) return
        const deltaX = touchX.current - e.changedTouches[0].clientX
        const deltaY = touchY.current - e.changedTouches[0].clientY
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
          deltaX > 0 ? next() : prev()
        }
        touchX.current = null
        touchY.current = null
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30
          flex items-center justify-center text-white transition-colors"
        style={{ zIndex: 10000 }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image with fade transition */}
      <div className="w-full h-full flex items-center justify-center px-14 sm:px-20">
        <img
          src={images[index]}
          alt={`${name} ${index + 1}`}
          draggable={false}
          className="max-w-full max-h-full object-contain select-none transition-opacity duration-[180ms]"
          style={{ opacity: fading ? 0 : 1 }}
        />
      </div>

      {/* Prev */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
          bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
        style={{ zIndex: 10000 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
          bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
        style={{ zIndex: 10000 }}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 10000 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
              i === index ? 'bg-white scale-125' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Lightbox(props: Props) {
  return createPortal(<LightboxInner {...props} />, document.body)
}
