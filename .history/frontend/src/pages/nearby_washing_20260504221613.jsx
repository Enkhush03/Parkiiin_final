import "../../../styles/main.css"
import ServiceCard from "../components/ServiceCard"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"

export default function Washing(){
    return(
        <>
        <div>

  

  {/* ── MOBILE MENU ──────────────────────────────────── */}
  <div className="mobile-menu" id="mobileMenu" role="navigation">
    <a className="nav-link" href="../parkiiin.html" onClick={() => window.closeMenu && window.closeMenu()}> Нүүр</a>
    <a className="nav-link" href="findPark.html" onClick={() => window.closeMenu && window.closeMenu()}> Зогсоол</a>
    <a className="nav-link active" href="nearby_washing.html" onClick={() => window.closeMenu && window.closeMenu()}> Үйлчилгээ</a>
    <a className="nav-link" href="tips.html" onClick={() => window.closeMenu && window.closeMenu()}> Зөвлөмж</a>
    <a className="nav-link" href="profile.html" onClick={() => window.closeMenu && window.closeMenu()}> Профайл</a>
  </div>

  {/* NEARBY WASHING PAGE — Cards from parkiiin.html SERVICES #svcWash */}

  {/* Page header (from parkiiin.html service design) */}
  <div className="page-header" style={{paddingTop: '64px'}}>
    <div className="page-header-inner">
      <h1>Ойролцоох үйлчилгээ</h1>
      <p>Угаалга, засвар болон бусад</p>
    </div>
  </div>

  <main className="services-content" style={{paddingBottom: '100px'}}>

    <SearchBar onSearch={(value) => console.log(value)}/>

    {/* ── Service type tabs (from parkiiin.html) ──────── */}
    <div className="service-tabs" role="tablist" aria-label="Үйлчилгээний төрөл">
      <a className="service-tab active" href="nearby_washing.html" role="tab" aria-selected="true"> Угаалга</a>
      <a className="service-tab" href="nearby_repairing.html" role="tab" aria-selected="false"> Засвар</a>
    </div>

    {/* ── Filter row ─────────────────────────────────── */}
    <div className="wash-filters" role="group" aria-label="Шүүлтүүр">
      <button className="wash-filter-primary" id="washFilterBtn" onClick={(e) => window.toggleWashFilter && window.toggleWashFilter(e.currentTarget)} aria-pressed={false}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="11" y1="18" x2="13" y2="18" />
        </svg>
        Бүх шүүлтүүр
      </button>
      <button className="wash-filter-sort active" onClick={(e) => window.washSort && window.washSort(e.currentTarget,'distance')} aria-label="Зайгаар эрэмбэлэх"
        aria-pressed={true}>
        Зай
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <button className="wash-filter-sort" onClick={(e) => window.washSort && window.washSort(e.currentTarget,'rating')} aria-label="Үнэлгээгээр эрэмбэлэх"
        aria-pressed={false}>
        Үнэлгээ
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
    </div>

    {/* WASH CARDS  — from parkiiin.html #svcWash */}
    <div className="parking-grid" id="washList" role="list" aria-label="Угаалгын газрууд">

     <ServiceCard
  name="CleanMax Auto Wash"
  distance="1.2km"
  time="25-35 мин"
  price="25,000₮"
  rating="4.8"
  tag="Нээлттэй"
  gradient="linear-gradient(135deg,#1a2e2a,#2BBFA0)"
/>

<ServiceCard
  name="Eco Shine Detailing"
  distance="2.4km"
  time="40-50 мин"
  price="18,000₮"
  rating="4.5"
  tag="Нээлттэй"
  gradient="linear-gradient(135deg,#134040,#2BBFA0)"
/>

<ServiceCard
  name="Sparkle Express"
  distance="0.8km"
  time="—"
  price="15,000₮"
  rating="4.3"
  tag="-15%"
  gradient="linear-gradient(135deg,#0a2a20,#2BBFA0)"
/>

<ServiceCard
  name="AutoSPA Premium"
  distance="3.1km"
  time="60 мин"
  price="35,000₮"
  rating="4.7"
  tag="Нээлттэй"
  gradient="linear-gradient(135deg,#0d5e52,#2BBFA0)"
/>

  </main>

  {/* ── BOTTOM NAV ────────────────────────────────────── */}
  <nav className="bottom-nav" id="bottomNav" aria-label="Доод навигац">
    <a className="bottom-nav-item" href="../parkiiin.html" aria-label="Нүүр">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      Нүүр
    </a>
    <a className="bottom-nav-item" href="findPark.html" aria-label="Хайх">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      Хайх
    </a>
    <a className="bottom-nav-item active" href="nearby_washing.html" aria-label="Үйлчилгээ">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      Үйлчилгээ
    </a>
    <a className="bottom-nav-item" href="tips.html" aria-label="Зөвлөмж">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      Зөвлөмж
    </a>
    <a className="bottom-nav-item" href="profile.html" aria-label="Профайл">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      Профайл
    </a>
  </nav>

  {/* Note: external script removed — if you rely on functions in ../js/main.js, expose them to window or port logic into React hooks */}
        </div>
        </>
    )
}