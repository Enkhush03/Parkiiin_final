import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

export default function Success() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const name = state?.name || 'Central Tower Parking'
  const loc = state?.loc || 'Сүхбаатар дүүрэг, УБ'
  const hour = state?.hour || 2

  return (
    <>
      <Navbar />

      <main className="book-main">
        <div className="book-content success-page-content page-enter" style={{ paddingBottom: '100px' }}>
          
          <div className="success-hero" role="status" aria-live="polite" aria-label="Захиалга амжилттай баталгаажлаа">
            <div className="success-ring success-ring--3" aria-hidden="true"></div>
            <div className="success-ring success-ring--2" aria-hidden="true"></div>
            <div className="success-ring success-ring--1" aria-hidden="true"></div>
            <div className="success-check-circle" aria-hidden="true">
              <svg viewBox="0 0 52 52" aria-hidden="true" className="success-check-svg">
                <circle className="success-check-bg" cx="26" cy="26" r="25"/>
                <polyline className="success-check-mark" points="14,27 22,35 38,17"/>
              </svg>
            </div>
          </div>

          <h1 className="success-title">Амжилттай!</h1>
          <p className="success-subtitle">Таны зогсоолын захиалга<br/>амжилттай баталгаажлаа</p>

          <div className="section-card success-detail-card">
            <div className="success-card-top">
              <div>
                <span className="success-eyebrow">Зогсоол</span>
                <h2 className="success-service-name">{name}</h2>
              </div>
              <span className="success-id-pill" aria-label="Захиалгын дугаар 88219">ID: #88219</span>
            </div>

            <div className="success-info-row">
              <div className="success-info-col">
                <span className="success-info-label">Байршил</span>
                <div className="success-info-value">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{loc}</span>
                </div>
              </div>
              <div className="success-info-col">
                <span className="success-info-label">Хугацаа</span>
                <div className="success-info-value">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <span>{hour} цаг | 12/24</span>
                </div>
              </div>
            </div>

            <div className="success-qr-section">
              <p className="success-qr-instruction">
                Зогсоолд очихдоо энэхүү QR кодыг уншуулна уу
              </p>

              <div className="success-qr-frame" aria-label="QR код">
                <span className="qr-corner qr-corner--tl" aria-hidden="true"></span>
                <span className="qr-corner qr-corner--tr" aria-hidden="true"></span>
                <span className="qr-corner qr-corner--bl" aria-hidden="true"></span>
                <span className="qr-corner qr-corner--br" aria-hidden="true"></span>

                <svg className="success-qr-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="4" y="4" width="28" height="28" rx="2" fill="#1a2e2a"/>
                  <rect x="9" y="9" width="18" height="18" rx="1" fill="white"/>
                  <rect x="14" y="14" width="8" height="8" fill="#1a2e2a"/>
                  <rect x="68" y="4" width="28" height="28" rx="2" fill="#1a2e2a"/>
                  <rect x="73" y="9" width="18" height="18" rx="1" fill="white"/>
                  <rect x="78" y="14" width="8" height="8" fill="#1a2e2a"/>
                  <rect x="4" y="68" width="28" height="28" rx="2" fill="#1a2e2a"/>
                  <rect x="9" y="73" width="18" height="18" rx="1" fill="white"/>
                  <rect x="14" y="78" width="8" height="8" fill="#1a2e2a"/>
                  <rect x="36" y="4" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="44" y="4" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="52" y="4" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="60" y="4" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="36" y="12" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="44" y="12" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="36" y="20" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="60" y="12" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="52" y="20" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="4" y="36" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="12" y="36" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="24" y="36" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="36" y="36" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="44" y="36" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="60" y="36" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="68" y="36" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="80" y="36" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="88" y="36" width="8" height="4" fill="#2BBFA0"/>
                  <rect x="4" y="44" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="20" y="44" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="36" y="44" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="52" y="44" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="60" y="44" width="8" height="4" fill="#2BBFA0"/>
                  <rect x="76" y="44" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="88" y="44" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="4" y="52" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="16" y="52" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="32" y="52" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="44" y="52" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="56" y="52" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="68" y="52" width="8" height="4" fill="#2BBFA0"/>
                  <rect x="84" y="52" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="4" y="60" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="20" y="60" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="36" y="60" width="8" height="4" fill="#2BBFA0"/>
                  <rect x="52" y="60" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="64" y="60" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="76" y="60" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="88" y="60" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="36" y="76" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="44" y="76" width="8" height="4" fill="#2BBFA0"/>
                  <rect x="60" y="76" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="68" y="76" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="80" y="76" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="36" y="84" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="52" y="84" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="60" y="84" width="8" height="4" fill="#1a2e2a"/>
                  <rect x="76" y="84" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="84" y="84" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="36" y="92" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="48" y="92" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="60" y="92" width="4" height="4" fill="#1a2e2a"/>
                  <rect x="72" y="92" width="4" height="4" fill="#2BBFA0"/>
                  <rect x="84" y="92" width="8" height="4" fill="#1a2e2a"/>
                </svg>
              </div>

              <div className="success-checkin-chip" role="status" aria-label="Check-in идэвхтэй">
                <span className="success-checkin-dot" aria-hidden="true"></span>
                CHECK-IN ИДЭВХТЭЙ
              </div>

              <div className="success-qr-actions">
                <button className="success-qr-action-btn" aria-label="Захиалгаа хуваалцах">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  Хуваалцах
                </button>
                <button className="success-qr-action-btn" aria-label="Зурган дотор хадгалах">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Хадгалах
                </button>
              </div>
            </div>
          </div>

          <div className="success-actions">
            <button onClick={() => navigate('/profile', { state: { subpage: 'history' } })} className="btn-full success-history-btn" aria-label="Захиалгын түүх харах">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 .49-4.5"/>
              </svg>
              Түүх харах
            </button>

            <button onClick={() => navigate('/')} className="btn-secondary success-home-btn" aria-label="Нүүр хуудас руу буцах">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Нүүр хуудас руу
            </button>

            <p className="success-bottom-note">
              Хэрэв та QR кодыг хугацаанаас нь өмнө ашиглахгүй бол
              дахин мэдээллээ шалгана уу.
            </p>
          </div>

        </div>
      </main>
    </>
  )
}