import { BrowserRouter, Routes, Route } from 'react-router-dom'

// ── Existing pages (байгаа) ───────────────────────
import Washing from './pages/Washing'
import Repair  from './pages/Repair'

// ── New pages (CSS Module + ES6 data import) ──────
import Home from './pages/Home'
import FindPark from './pages/FindPark/FindPark'
import Tips     from './pages/Tips/Tips'
import Profile  from './pages/Profile/Profile'
import Login    from './pages/Login/Login'

// ── Booking (шинэчилсэн) ──────────────────────────
import Booking  from './pages/Booking'
import Success  from './pages/Success'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Нүүр хуудас */}
        <Route path="/"        element={<Home />} />

        {/* Зогсоол */}
        <Route path="/parking" element={<FindPark />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<Success />} />

        {/* Үйлчилгээ */}
        <Route path="/washing" element={<Washing />} />
        <Route path="/repair"  element={<Repair />} />

        {/* Зөвлөмж */}
        <Route path="/tips"    element={<Tips />} />

        {/* Профайл */}
        <Route path="/profile" element={<Profile />} />

        {/* Auth */}
        <Route path="/login"   element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}