import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Services  from './components/Services'
import Locations from './components/Locations'
import Photos    from './components/Photos'
import About     from './components/About'
import Contact   from './components/Contact'
import Footer    from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Locations />
        <Photos />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
