import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

type Machine = {
  name: string
  tagline: string
  description: string
  image?: string
}

const MACHINES: Machine[] = [
  {
    name: 'Slim Wall',
    tagline: 'Sleek. Space-saving. Always stocked.',
    description:
      'The Slim Wall is designed for venues where space is at a premium. Mounts flush to the wall with a minimal footprint while holding a solid selection of top-selling products. Cashless, touchscreen, and always connected.',
  },
  {
    name: 'Mega Wall',
    tagline: 'Maximum capacity. Maximum revenue.',
    description:
      'The Mega Wall is our highest-capacity unit — built for high-traffic venues like casinos and large nightclubs. More SKUs, more sales, and the same smart technology keeping it running around the clock.',
  },
  {
    name: 'Mini Wall',
    tagline: 'Compact footprint. Big results.',
    description:
      'The Mini Wall fits where other machines can\'t. Perfect for smaller bars, lounges, or tight spaces that still see consistent foot traffic. Don\'t let the size fool you — it moves product.',
  },
  {
    name: 'Slim Tower',
    tagline: 'Freestanding. Flexible. Smart.',
    description:
      'The Slim Tower is a freestanding unit that can be placed anywhere in your venue without wall installation. Ideal for venues that want flexibility in placement without sacrificing product capacity.',
  },
  {
    name: 'Slim Wall – Tin Lift',
    tagline: 'Purpose-built for nicotine pouches.',
    description:
      'A dedicated nicotine pouch machine. The Slim Wall Tin Lift is specifically designed to carry and dispense tin products like Zyn, Alp, and On! — giving pouch users exactly what they\'re looking for, right at the bar.',
  },
]

function MachineCard({ machine }: { machine: Machine }) {
  return (
    <article className="card overflow-hidden rounded-2xl flex flex-col">
      {/* Image */}
      <div className="bg-slate-100 aspect-[4/3] flex items-center justify-center">
        {machine.image ? (
          <img
            src={machine.image}
            alt={machine.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.775 48.775 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            <span className="text-xs font-medium">Photo coming soon</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-700">
          VapeTM
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
                Every machine we place is a VapeTM unit — cashless, touchscreen, and
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
