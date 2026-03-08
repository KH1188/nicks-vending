import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Services  from './components/Services'
import Locations from './components/Locations'
import AboutPage  from './pages/AboutPage'
import PhotosPage from './pages/PhotosPage'
import Contact    from './components/Contact'
import Footer    from './components/Footer'
import Machines  from './pages/Machines'
import SlimWall  from './pages/SlimWall'
import MegaWall       from './pages/MegaWall'
import SlimTower      from './pages/SlimTower'
import MiniWall       from './pages/MiniWall'
import SlimWallTinLift from './pages/SlimWallTinLift'
import WeatherWall     from './pages/WeatherWall'
function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Machines />
        <Services />
        <Locations />
        <Contact />
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
        <Route path="/machines/weather-wall" element={<WeatherWall />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/photos" element={<PhotosPage />} />
      </Routes>
    </BrowserRouter>
  )
}
