import NightlifeNavbar from '../nightlife/components/NightlifeNavbar'
import NightlifeFooter from '../nightlife/components/NightlifeFooter'
import Photos from '../components/Photos'

export default function PhotosPage() {
  return (
    <>
      <NightlifeNavbar />
      <main className="pt-[72px] bg-ink">
        <Photos />
      </main>
      <NightlifeFooter />
    </>
  )
}
