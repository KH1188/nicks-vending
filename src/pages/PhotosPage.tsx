import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Photos from '../components/Photos'

export default function PhotosPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <Photos />
      </main>
      <Footer />
    </>
  )
}
