import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'

export default function Profile() {
  const [activeSubpage, setActiveSubpage] = useState(null)

  return (
    <>
      <Navbar />

      <main id="profilePage" className="page-enter" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        {/* HERO BANNER */}
        <div className="profile-hero">
          <div className="profile-top">
            <div className="avatar" aria-label="Хэрэглэгчийн дүрс тэмдэг">E</div>
            <div className="profile-info">
              <h1>Enkhush</h1>
              <p>enkhush.c@gmail.com</p>
            </div>
            <button className="profile-settings-btn" aria-label="Тохиргоо" onClick={() => setActiveSubpage('settings')}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="profile-stats-wrap">
          <div className="profile-stats-grid">
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div className="profile-stat-num">24</div>
              <div className="profile-stat-lbl">Зогсоол</div>
            </div>
            <div className="profile-stat-card profile-stat-card--accent" onClick={() => setActiveSubpage('loyalty')}>
              <div className="profile-stat-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
              </div>
              <div className="profile-stat-num">1240</div>
              <div className="profile-stat-lbl">Оноо</div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <div className="profile-stat-num">4.6</div>
              <div className="profile-stat-lbl">Үнэлгээ</div>
            </div>
          </div>
        </div>

        {/* LOYALTY POINTS CARD */}
        <div className="points-wrap">
          <div className="points-inner">
            <div>
              <div className="points-lbl">Зогсоолын оноо</div>
              <div className="points-num">1,240</div>
            </div>
            <button className="points-badge" onClick={() => setActiveSubpage('loyalty')} aria-label="Оноо дэлгэрэнгүй">
              Дэлгэрэнгүй
            </button>
          </div>
          <div className="points-progress">
            <div className="points-bar" style={{ width: '65%' }}></div>
          </div>
          <div className="points-hint">Дараагийн түвшинд 260 оноо</div>
        </div>

        {/* PROFILE MENU */}
        <div className="profile-menu-list" role="navigation" aria-label="Профайл цэс">
          <button className="p-menu-item" onClick={() => setActiveSubpage('vehicles')}>
            <div className="p-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/><path d="M5 11l2-6h10l2 6"/></svg>
            </div>
            <div className="p-menu-text">Миний машинууд</div>
            <div className="p-menu-arr">›</div>
          </button>

          <button className="p-menu-item" onClick={() => setActiveSubpage('history')}>
            <div className="p-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>
            </div>
            <div className="p-menu-text">Захиалгын түүх</div>
            <div className="p-menu-arr">›</div>
          </button>

          <button className="p-menu-item" onClick={() => setActiveSubpage('payments')}>
            <div className="p-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <div className="p-menu-text">Төлбөрийн хэрэгсэл</div>
            <div className="p-menu-arr">›</div>
          </button>

          <button className="p-menu-item" onClick={() => setActiveSubpage('help')}>
            <div className="p-menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div className="p-menu-text">Тусламж</div>
            <div className="p-menu-arr">›</div>
          </button>
        </div>

        <button className="logout-btn" onClick={() => alert('Гарах')}>Гарах</button>
      </main>

      {/* Subpages would be rendered here when activeSubpage is set, e.g. <HistorySubpage /> */}
      {activeSubpage && (
        <div className="subpage active">
          <div className="subpage-header">
            <button className="subpage-back" onClick={() => setActiveSubpage(null)}>←</button>
            <h2 className="subpage-title">{
              activeSubpage === 'history' ? 'Захиалгын түүх' :
              activeSubpage === 'loyalty' ? 'Loyalty оноо' :
              activeSubpage === 'vehicles' ? 'Миний машинууд' :
              activeSubpage === 'payments' ? 'Төлбөрийн хэрэгсэл' : 'Тохиргоо'
            }</h2>
          </div>
          <div className="subpage-content" style={{ padding: '20px' }}>
            {/* Simple placeholder for subpages */}
            <p style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)' }}>
              Энэ хэсэг хөгжүүлэлтийн шатанд байна.
            </p>
          </div>
        </div>
      )}
    </>
  )
}
