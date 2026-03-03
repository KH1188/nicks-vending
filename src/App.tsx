import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Services  from './components/Services'
import About     from './components/About'
import Locations from './components/Locations'
import Photos    from './components/Photos'
import Contact   from './components/Contact'
import Footer    from './components/Footer'
import Machines  from './pages/Machines'
import SlimWall  from './pages/SlimWall'
import MegaWall       from './pages/MegaWall'
import SlimTower      from './pages/SlimTower'
import MiniWall       from './pages/MiniWall'
import SlimWallTinLift from './pages/SlimWallTinLift'

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Machines />
        <About />
        <Locations />
        <Contact />
        <Photos />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/machines/slim-wall" element={<SlimWall />} />
        <Route path="/machines/mega-wall" element={<MegaWall />} />
        <Route path="/machines/slim-tower" element={<SlimTower />} />
        <Route path="/machines/mini-wall" element={<MiniWall />} />
        <Route path="/machines/slim-wall-tin-lift" element={<SlimWallTinLift />} />
      </Routes>
    </BrowserRouter>
  )
}
