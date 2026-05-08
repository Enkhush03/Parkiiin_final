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

        </div>

        {/* MAIN MENU */}
        <div className="menu-list" role="navigation" aria-label="Профайл цэс">
          <div className="menu-item" onClick={() => setActiveSubpage('vehicles')} role="button" tabIndex="0">
            <div className="menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5" /><circle cx="15.5" cy="17.5" r="2.5" /><circle cx="5.5" cy="17.5" r="2.5" /><polyline points="3 13 3 9 9 9" /><polyline points="13 3 13 9 3 9" /></svg>
            </div>
            <div className="menu-text">
              <div className="menu-title">Машины төрөл</div>
              <div className="menu-sub">2 машин бүртгэлтэй</div>
            </div>
            <span className="menu-arrow" aria-hidden="true">›</span>
          </div>

          <div className="menu-item" onClick={() => setActiveSubpage('history')} role="button" tabIndex="0">
            <div className="menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <div className="menu-text">
              <div className="menu-title">Захиалгын түүх</div>
              <div className="menu-sub">Өнгөрсөн захиалгууд</div>
            </div>
            <span className="menu-arrow" aria-hidden="true">›</span>
          </div>

          <div className="menu-item" onClick={() => setActiveSubpage('reviews')} role="button" tabIndex="0">
            <div className="menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
            </div>
            <div className="menu-text">
              <div className="menu-title">Миний үнэлгээ</div>
              <div className="menu-sub">24 үнэлгээ • Дундаж 4.9</div>
            </div>
            <span className="menu-arrow" aria-hidden="true">›</span>
          </div>

          <div className="menu-item menu-item--danger" onClick={() => alert('Гарах')} role="button" tabIndex="0">
            <div className="menu-icon menu-icon--danger" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </div>
            <div className="menu-text">
              <div className="menu-title menu-title--danger">Sign Out</div>
            </div>
            <span className="menu-arrow menu-arrow--danger" aria-hidden="true">›</span>
          </div>
        </div>
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
