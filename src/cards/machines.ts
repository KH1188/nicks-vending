// Machine lineup for the Collectibles side. Same hardware and specs as the
// nightlife machines, photographed with TCG wraps. Tin Lift and WeatherWall
// intentionally excluded — they don't apply to card vending.
import miniTcg1 from '../assets/Pokemon Machines/Mini TCG/pokemon-tcg-wrap-mini-tcg-vending-machine-front-view.webp'
import miniTcg2 from '../assets/Pokemon Machines/Mini TCG/pokemon-tcg-wrap-mini-tcg-vending-machine-on-pedestal-stand.webp'
import miniTcg3 from '../assets/Pokemon Machines/Mini TCG/pokemon-tcg-wrap-mini-tcg-vending-machine-side-view.webp'
import miniTcg4 from '../assets/Pokemon Machines/Mini TCG/pokemon-tcg-wrap-mini-tcg-vending-machine-22mm-coils-loaded-booster-packs.webp'
import miniTcg5 from '../assets/Pokemon Machines/Mini TCG/tcg-pokemon-mini-wall-vending-machine-size-dimensions.webp'
import slimWall1 from '../assets/Pokemon Machines/Slim Wall/pokemon-tcg-wrap-slim-wall-tcg-vending-machine-left-side-view.webp'
import slimWall2 from '../assets/Pokemon Machines/Slim Wall/pokemon-tcg-wrap-slim-wall-tcg-vending-machine-right-side-view.webp'
import slimWall3 from '../assets/Pokemon Machines/Slim Wall/pokemon-tcg-wrap-slim-wall-tcg-vending-machine-open-22-mm-coil-with-booster-packs.webp'
import slimWall4 from '../assets/Pokemon Machines/Slim Wall/tcg-wrap-slim-wall-pokemon-vending-machine-pedestal-stand-loaded-booster-packs-22mm-coils.webp'
import megaWall1 from '../assets/Pokemon Machines/Mega Wall/pokemon-tcg-wrap-mega-wall-2-0-tcg-vending-machine-front-view.webp'
import megaWall2 from '../assets/Pokemon Machines/Mega Wall/pokemon-tcg-wrap-mega-wall-2-0-tcg-vending-machine-right-angled-view.webp'
import megaWall3 from '../assets/Pokemon Machines/Mega Wall/pokemon-tcg-wrap-mega-wall-2-0-tcg-vending-machine-open-loaded-booster-packs.webp'
import megaWall4 from '../assets/Pokemon Machines/Mega Wall/tcg-wrap-mega-wall-2-0-pokemon-vending-machine-pedestal-stand-loaded-booster-packs-22mm-coils.webp'
import megaWall5 from '../assets/Pokemon Machines/Mega Wall/tcg-pokemon-mega-wall-2-0-vending-machine-size-dimensions.webp'
import slimTower1 from '../assets/Pokemon Machines/Slim Tower/slim-tower-pokemon-vending-machine.webp'
import slimTower2 from '../assets/Pokemon Machines/Slim Tower/pokemon-card-pack-vending-machine-24-selection-touchscreen.webp'
import slimTower3 from '../assets/Pokemon Machines/Slim Tower/pokemon-tcg-wrap-slim-pack-tower-2-0-tcg-vending-machine-open-with-booster-packs.webp'
import slimTower4 from '../assets/Pokemon Machines/Slim Tower/tcg-pokemon-slim-tower-2-0-vending-machine-nayax-card-reader-size-dimensions.webp'

export type CardsMachine = {
  slug: string
  name: string
  tagline: string
  description: string
  images: string[]
  specs: { label: string; value: string }[]
}

export const CARDS_MACHINES: CardsMachine[] = [
  {
    slug: 'mini-tcg',
    name: 'Mini TCG',
    tagline: 'Compact footprint. Big results.',
    description:
      'The Mini TCG fits where other machines can\'t. Perfect for card shop counters, mall kiosks, or tight spaces that still see consistent foot traffic. Don\'t let the size fool you — it moves packs.',
    images: [miniTcg1, miniTcg2, miniTcg3, miniTcg4, miniTcg5],
    specs: [
      { label: 'Height',    value: '33.3"' },
      { label: 'Width',     value: '21.6"' },
      { label: 'Depth',     value: '8.7"' },
      { label: 'Display',   value: '21.5" Touchscreen' },
      { label: 'Aisles',    value: '8 (4 trays × 2 aisles per tray)' },
      { label: 'Mounting',  value: 'Wall or pedestal stand' },
      { label: 'Payment',   value: 'Cashless via Nayax VPOS Touch Card Reader' },
    ],
  },
  {
    slug: 'slim-wall',
    name: 'Slim Wall',
    tagline: 'Sleek. Space-saving. Always stocked.',
    description:
      'The Slim Wall mounts flush to the wall with a minimal footprint while carrying an impressive selection of sealed booster packs. Sleek, modern, and at home in any retail or entertainment space.',
    images: [slimWall1, slimWall2, slimWall4, slimWall3],
    specs: [
      { label: 'Height',    value: '40.5"' },
      { label: 'Width',     value: '23.6"' },
      { label: 'Depth',     value: '10.2"' },
      { label: 'Display',   value: '32" Touchscreen' },
      { label: 'Aisles',    value: '10 (5 trays × 2 aisles per tray)' },
      { label: 'Payment',   value: 'Cashless via Nayax VPOS Touch Card Reader' },
    ],
  },
  {
    slug: 'mega-wall',
    name: 'Mega Wall',
    tagline: 'Largest wall unit. Same minimal footprint.',
    description:
      'Our largest wall-mounted machine. Built for high-traffic locations like malls and family entertainment centers where floor space is limited but demand is high. LED accent lighting, 32" touchscreen, and cashless payment.',
    images: [megaWall1, megaWall2, megaWall4, megaWall3, megaWall5],
    specs: [
      { label: 'Height',    value: '40.1"' },
      { label: 'Width',     value: '23.6"' },
      { label: 'Depth',     value: '14.0"' },
      { label: 'Display',   value: '32" Touchscreen' },
      { label: 'Lighting',  value: 'LED Accent Lighting' },
      { label: 'Aisles',    value: '15 (5 trays × 3 aisles per tray)' },
      { label: 'Payment',   value: 'Cashless via Nayax VPOS Touch Card Reader' },
    ],
  },
  {
    slug: 'slim-tower',
    name: 'Slim Tower',
    tagline: 'Maximum product. Minimal footprint.',
    description:
      'Our highest-capacity machine. The Slim Tower holds more sealed product than any other unit in our lineup — freestanding, flexible, and built for venues that want maximum selection on rotation.',
    images: [slimTower1, slimTower2, slimTower3, slimTower4],
    specs: [
      { label: 'Height',    value: '71.1"' },
      { label: 'Width',     value: '27.5"' },
      { label: 'Depth',     value: '13.7"' },
      { label: 'Display',   value: '43" Touchscreen' },
      { label: 'Aisles',    value: '24 (8 trays × 3 aisles per tray)' },
      { label: 'Payment',   value: 'Cashless via Nayax VPOS Touch Card Reader' },
    ],
  },
]
