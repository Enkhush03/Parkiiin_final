import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />

      <div id="home" className="page-enter" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="hero">
          <div className="hero-badge">Улаанбаатар хот</div>
          <h1>Зогсоолоо <span>хялбар</span><br />олоорой</h1>
          <p>Улаанбаатарын хамгийн том зогсоолын платформ. Онлайн захиалга.</p>
          <div className="hero-btns">
            <Link className="btn-primary" to="/parking">Зогсоол хайх</Link>
            <Link className="btn-outline" to="/login" data-auth-visible="logged-out">Нэвтрэх</Link>
          </div>
        </div>

        <div className="search-float">
          <div className="search-bar">
            <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px', stroke: 'var(--primary)', fill: 'none', strokeWidth: '2', flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input type="text" placeholder="Газар, хаяг хайх..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', fontFamily: 'inherit', color: 'var(--text)', background: 'none' }} />
            <button onClick={() => navigate('/parking')}>Хайх</button>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-item">
            <div className="stat-num">200+</div>
            <div className="stat-label">Зогсоол</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">50K+</div>
            <div className="stat-label">Хэрэглэгч</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">4.9★</div>
            <div className="stat-label">Үнэлгээ</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">24/7</div>
            <div className="stat-label">Тантай хамт</div>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">Яагаад Parkiiin?</h2>
          <p className="section-sub">Хялбар, хурдан, найдвартай</p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon" style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🗺️</div>
              <div className="feature-title">Бодит цагийн газрын зураг</div>
              <div className="feature-desc">Ойролцоох зогсоолуудыг газрын зураг дээр харж, чөлөөт зай бодит цагаар шалгаарай.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⚡</div>
              <div className="feature-title">Хурдан захиалга</div>
              <div className="feature-desc">Хэдхэн секундэд зогсоолоо захиалж, QR кодоор орж гарна. Дараалал байхгүй.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>💳</div>
              <div className="feature-title">Олон төлбөрийн хэлбэр</div>
              <div className="feature-desc">QPay, Social Pay, Toki Pay болон банкны карт — хамгийн тохиромжтой аргаар төлнө.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🎁</div>
              <div className="feature-title">Loyalty оноо</div>
              <div className="feature-desc">Захиалга бүрээс оноо цуглуулж, хөнгөлөлт эдлэ. Байнгын хэрэглэгчдэд тусгай урамшуулал.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔧</div>
              <div className="feature-title">Ойролцоох үйлчилгээ</div>
              <div className="feature-desc">Зогсоолтой зэрэгцэн угаалга, засварын газруудыг нэг дороос хайж захиалаарай.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon" style={{ fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🛡️</div>
              <div className="feature-title">Найдвартай аюулгүй</div>
              <div className="feature-desc">Баталгаажсан зогсоолууд, камертай, 24/7 хамгаалалттай байршлуудад итгэлтэй зогс.</div>
            </div>
          </div>
        </div>

        <div className="section" style={{ paddingTop: 0 }}>
          <h2 className="section-title">Алдартай зогсоолууд</h2>
          <p className="section-sub">Хэрэглэгчдийн хамгийн их сонгодог байршлууд</p>
          <div className="parking-grid">
            <div className="parking-card" onClick={() => navigate('/booking', { state: { type: 'parking', id: 1, name: 'Central Tower Parking', price: 2000 } })}>
              <div className="parking-img c1"><span />
                <div className="p-badge">12 зогсоол</div>
              </div>
              <div className="parking-body">
                <div className="parking-name">Central Tower Parking</div>
                <div className="parking-loc">📍 Сүхбаатар дүүрэг, 9-р хороо</div>
                <div className="parking-foot">
                  <div className="p-price">2,000₮<span>/цаг</span></div>
                  <div className="p-rating">4.8</div>
                </div><button className="book-btn">Захиалах →</button>
              </div>
            </div>
            <div className="parking-card" onClick={() => navigate('/booking', { state: { type: 'parking', id: 2, name: 'Shangri-La Зогсоол', price: 5000 } })}>
              <div className="parking-img c2"><span />
                <div className="p-badge">Нээлттэй</div>
              </div>
              <div className="parking-body">
                <div className="parking-name">Shangri-La Зогсоол</div>
                <div className="parking-loc">📍 Сүхбаатар дүүрэг, 1-р хороо</div>
                <div className="parking-foot">
                  <div className="p-price">5,000₮<span>/цаг</span></div>
                  <div className="p-rating">4.9</div>
                </div><button className="book-btn">Захиалах →</button>
              </div>
            </div>
            <div className="parking-card" onClick={() => navigate('/booking', { state: { type: 'parking', id: 3, name: 'Blue Sky Граж', price: 4000 } })}>
              <div className="parking-img c3"><span /></div>
              <div className="parking-body">
                <div className="parking-name">Blue Sky Граж</div>
                <div className="parking-loc">📍 Сүхбаатар дүүрэг, Энхтайваны өргөн чөлөө</div>
                <div className="parking-foot">
                  <div className="p-price">4,000₮<span>/цаг</span></div>
                  <div className="p-rating">4.7</div>
                </div><button className="book-btn">Захиалах →</button>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-strip">
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, marginBottom: '10px' }}>Аппликейшнаа татаж авах</h2>
          <p style={{ opacity: 0.8, fontSize: '15px', marginBottom: '28px' }}>iOS болон Android дээр бүрэн боломжтой</p>
          <div className="cta-btns" style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="cta-btn" style={{ padding: '12px 24px', borderRadius: '100px', fontSize: '15px', fontWeight: 600, border: 'none', background: 'white', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>App Store</button>
            <button className="cta-btn" style={{ padding: '12px 24px', borderRadius: '100px', fontSize: '15px', fontWeight: 600, border: 'none', background: 'white', color: 'var(--text)', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}>Google Play</button>
          </div>
        </div>
      </div>
    </>
  )
}
