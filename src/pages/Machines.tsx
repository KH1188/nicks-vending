import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import slimWall1 from '../assets/Slim Wall/slim-wall-sleek-slim-wall-mounted-vtm-vapetm-486251.webp'
import slimWall2 from '../assets/Slim Wall/slim-wall-sleek-slim-wall-mounted-vtm-vapetm-769781.webp'
import slimWall3 from '../assets/Slim Wall/slim-wall-vape-vending-machine-ad-banner-id-scanner.webp'
import slimWall4 from '../assets/Slim Wall/slim-wall-vape-vending-machine-on-pedestal-stand.webp'
import slimWall5 from '../assets/Slim Wall/slim-wall-vape-vending-machine-open-10-aisles-touchscreen.webp'
import megaWall1 from '../assets/Mega Wall/mega-wall-2-0-open-interior-15-sku-capacity.webp'
import megaWall2 from '../assets/Mega Wall/mega-wall-2-0-vape-vending-machine-alp-nicotine-pouch-ad.webp'
import megaWall3 from '../assets/Mega Wall/mega-wall-2-0-vape-vending-machine-side-view-depth-alp-ad.webp'
import megaWall4 from '../assets/Mega Wall/mega-wall-20-vape-machine-with-led-lights-electronic-lock-vtm-vapetm-260076.webp'
import miniWall1 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vape-vending-machine-vtm-vapetm-256986.webp'
import miniWall2 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-306534.webp'
import miniWall3 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-456147.webp'
import miniWall4 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-655851.webp'
import miniWall5 from '../assets/Mini Wall/mini-wall-most-compact-wall-mounted-vending-machine-vtm-vapetm-850501.webp'
import slimTower1 from '../assets/Slim Tower/slim-tower-2-0-smart-vape-vending-machine-specs.webp'
import slimTower2 from '../assets/Slim Tower/touchscreen-vape-vending-machine-slim-tower-2-0.webp'
import slimTower3 from '../assets/Slim Tower/vapetm-slim-tower-2-0-smart-vending-kiosk-touchscreen.webp'
import slimTower4 from '../assets/Slim Tower/vapetm-slim-tower-20-front-view-smart-vape-vending-machine-touchscreen.webp'
import tinLift1 from '../assets/Slim Wall - Tin Lift/alp-vapetm-vape-vending-machine-a-better-time-nicotine-pouches.webp'
import tinLift2 from '../assets/Slim Wall - Tin Lift/nicotine-pouch-vending-machine-zyn.webp'
import tinLift3 from '../assets/Slim Wall - Tin Lift/slim-wall-tin-lift-nicotine-pouch-only-vending-machine-angled-touchscreen.webp'
import tinLift4 from '../assets/Slim Wall - Tin Lift/slim-wall-tin-lift-nicotine-pouch-vending-machine-dimensions.webp'
import tinLift5 from '../assets/Slim Wall - Tin Lift/the-pouch-stacker-mega-americas-first-pouch-only-vending-machine-pre-order-now-pouch-vending-vapetm-109417.webp'
import tinLift6 from '../assets/Slim Wall - Tin Lift/vapetm-slim-wall-tin-lift-nicotine-pouch-vending-machine.webp'

type Machine = {
  name: string
  tagline: string
  description: string
  images?: string[]
}

const MACHINES: Machine[] = [
  {
    name: 'Slim Wall',
    tagline: 'Sleek. Space-saving. Always stocked.',
    images: [slimWall1, slimWall2, slimWall3, slimWall4, slimWall5],
    description:
      'The Slim Wall is designed for venues where space is at a premium. Mounts flush to the wall with a minimal footprint while holding a solid selection of top-selling products. Cashless, touchscreen, and always connected.',
  },
  {
    name: 'Mega Wall',
    tagline: 'Maximum capacity. Maximum revenue.',
    images: [megaWall3, megaWall2, megaWall4, megaWall1],
    description:
      'The Mega Wall is our highest-capacity unit — built for high-traffic venues like casinos and large nightclubs. More SKUs, more sales, and the same smart technology keeping it running around the clock.',
  },
  {
    name: 'Mini Wall',
    tagline: 'Compact footprint. Big results.',
    images: [miniWall1, miniWall2, miniWall5, miniWall3, miniWall4],
    description:
      'The Mini Wall fits where other machines can\'t. Perfect for smaller bars, lounges, or tight spaces that still see consistent foot traffic. Don\'t let the size fool you — it moves product.',
  },
  {
    name: 'Slim Tower',
    tagline: 'Freestanding. Flexible. Smart.',
    images: [slimTower1, slimTower4, slimTower3, slimTower2],
    description:
      'The Slim Tower is a freestanding unit that can be placed anywhere in your venue without wall installation. Ideal for venues that want flexibility in placement without sacrificing product capacity.',
  },
  {
    name: 'Slim Wall – Tin Lift',
    tagline: 'Purpose-built for nicotine pouches.',
    images: [tinLift3, tinLift6, tinLift4, tinLift2, tinLift1, tinLift5],
    description:
      'A dedicated nicotine pouch machine. The Slim Wall Tin Lift is specifically designed to carry and dispense tin products like Zyn, Alp, and On! — giving pouch users exactly what they\'re looking for, right at the bar.',
  },
]

function Carousel({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = useState(0)

  const prev = () => setIndex(i => (i - 1 + images.length) % images.length)
  const next = () => setIndex(i => (i + 1) % images.length)

  return (
    <div className="relative bg-slate-100 aspect-[4/3] overflow-hidden group">
      <img
        src={images[index]}
        alt={`${name} ${index + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
          bg-white/80 hover:bg-white shadow flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full
          bg-white/80 hover:bg-white shadow flex items-center justify-center
          opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              i === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function Placeholder() {
  return (
    <div className="bg-slate-100 aspect-[4/3] flex flex-col items-center justify-center gap-2 text-slate-400">
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.775 48.775 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
      </svg>
      <span className="text-xs font-medium">Photo coming soon</span>
    </div>
  )
}

function MachineCard({ machine }: { machine: Machine }) {
  return (
    <article className="card overflow-hidden rounded-2xl flex flex-col">
      {machine.images?.length ? (
        <Carousel images={machine.images} name={machine.name} />
      ) : (
        <Placeholder />
      )}

      {/* Content */}
      <div className="p-7 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
          Smart Machine
        </p>
        <h3 className="text-xl font-bold text-slate-900">{machine.name}</h3>
        <p className="text-sm font-medium text-slate-500 italic">{machine.tagline}</p>
        <p className="text-sm text-slate-500 leading-relaxed mt-1">{machine.description}</p>
      </div>
    </article>
  )
}

export default function Machines() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="mb-16">
              <p className="section-label mb-3">Our machines</p>
              <h1 className="section-title">Built for venues.<br />Built to perform.</h1>
              <p className="section-subtitle mt-4 max-w-xl">
                Every machine we place is a smart unit — cashless, touchscreen, and
                always connected. Here's the lineup.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MACHINES.map((machine) => (
                <MachineCard key={machine.name} machine={machine} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-sm text-slate-400 mb-4">
                Not sure which machine is right for your venue?
              </p>
              <a href="/#contact" className="btn-primary text-sm py-3 px-8">
                Get in Touch
              </a>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
