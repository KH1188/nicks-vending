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

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
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
        <Route path="/machines" element={<Machines />} />
      </Routes>
    </BrowserRouter>
  )
}
