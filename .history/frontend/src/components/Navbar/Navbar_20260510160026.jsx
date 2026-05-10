import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',        label: 'Нүүр' },
  { to: '/parking', label: 'Зогсоол' },
  { to: '/services/washing', label: 'Үйлчилгээ' },
  { to: '/tips',    label: 'Зөвлөмж' },
  { to: '/profile', label: 'Профайл' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="top-nav" aria-label="Үндсэн навигац">
        <Link to="/" className="nav-logo">Parkiiin</Link>

        {/* Desktop links */}
        <div className="nav-links">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link ${pathname === to ? 'active' : ''}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label="Цэс нээх"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu (if you implement hamburger toggle via classes) */}
      <div className={`mobile-menu ${open ? 'open' : ''}`} role="navigation">
        {NAV_LINKS.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`nav-link ${pathname === to ? 'active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  )
}
