import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/',        label: 'Нүүр' },
  { to: '/parking', label: 'Зогсоол' },
  { to: '/washing', label: 'Үйлчилгээ' },
  { to: '/tips',    label: 'Зөвлөмж' },
  { to: '/profile', label: 'Профайл' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark'
  })

  useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

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

        {/* Dark mode toggle + Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="dark-toggle"
            onClick={() => setDark(d => !d)}
            aria-label={dark ? 'Цайвар горим' : 'Харанхуй горим'}
            title={dark ? 'Цайвар горим' : 'Харанхуй горим'}
          >
            {dark ? (
              /* Sun icon */
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              /* Moon icon */
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          <button
            className="hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Цэс нээх"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
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
