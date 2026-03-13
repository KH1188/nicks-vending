import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute      from './dashboard/components/ProtectedRoute'
import DashboardLayout     from './dashboard/components/DashboardLayout'
import LoginPage           from './dashboard/pages/LoginPage'
import VenueDashboard      from './dashboard/pages/venue/VenueDashboard'
import VenueStatements     from './dashboard/pages/venue/VenueStatements'
import VenueMachines       from './dashboard/pages/venue/VenueMachines'
import VenueCompliance    from './dashboard/pages/venue/VenueCompliance'
import VenuePerformance   from './dashboard/pages/venue/VenuePerformance'
import AdminDashboard      from './dashboard/pages/admin/AdminDashboard'
import AdminVenues         from './dashboard/pages/admin/AdminVenues'
import AdminVenueDetail    from './dashboard/pages/admin/AdminVenueDetail'
import AdminUsers          from './dashboard/pages/admin/AdminUsers'
import AdminMachines       from './dashboard/pages/admin/AdminMachines'
import AdminUploadStatement from './dashboard/pages/admin/AdminUploadStatement'
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

        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/venue" replace />} />

        <Route path="/dashboard/venue" element={
          <ProtectedRoute requiredRole="venue_owner"><DashboardLayout /></ProtectedRoute>
        }>
          <Route index element={<VenueDashboard />} />
          <Route path="statements" element={<VenueStatements />} />
          <Route path="machines" element={<VenueMachines />} />
          <Route path="compliance" element={<VenueCompliance />} />
          <Route path="performance" element={<VenuePerformance />} />
        </Route>

        <Route path="/dashboard/admin" element={
          <ProtectedRoute requiredRole="admin"><DashboardLayout /></ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="venues" element={<AdminVenues />} />
          <Route path="venues/:venueId" element={<AdminVenueDetail />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="machines" element={<AdminMachines />} />
          <Route path="statements/new" element={<AdminUploadStatement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
