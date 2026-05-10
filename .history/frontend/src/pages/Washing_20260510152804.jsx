import "../../../styles/main.css"
import { useState } from "react"
import ServiceCard from "../components/ServiceCard"
import Navbar from "../components/Navbar/Navbar"
import SearchBar from "../components/SearchBar"
import { Link } from "react-router-dom"

export default function Washing() {

  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("wash")
  const [sortType, setSortType] = useState("distance")

  const services = [
    {
      name: "CleanMax Auto Wash",
      distance: "1.2km",
      time: "25-35 мин",
      price: "25,000₮",
      rating: 4.8,
      tag: "Нээлттэй",
      type: "wash",
      gradient: "linear-gradient(135deg,#1a2e2a,#2BBFA0)"
    },
    {
      name: "Eco Shine Detailing",
      distance: "2.4km",
      time: "40-50 мин",
      price: "18,000₮",
      rating: 4.5,
      tag: "Нээлттэй",
      type: "wash",
      gradient: "linear-gradient(135deg,#134040,#2BBFA0)"
    },
    {
      name: "Sparkle Express",
      distance: "0.8km",
      time: "—",
      price: "15,000₮",
      rating: 4.3,
      tag: "-15%",
      type: "wash",
      gradient: "linear-gradient(135deg,#0a2a20,#2BBFA0)"
    },
    {
      name: "AutoSPA Premium",
      distance: "3.1km",
      time: "60 мин",
      price: "35,000₮",
      rating: 4.7,
      tag: "Нээлттэй",
      type: "wash",
      gradient: "linear-gradient(135deg,#0d5e52,#2BBFA0)"
    }
  ]
  useEffect(() => {
    fetch('/api/parking.json')
    .then(res => res.json())
    .then(data =>{
      const washingServices = data.services.filter(s => s.type === 'washing');
      setWashingSpots(washingServices);
    });
  }, []);

  //  filter
  const filteredServices = services
    .filter((s) =>
      s.name.toLowerCase().includes(query.toLowerCase())
    )
    .filter((s) => s.type === activeTab)

  //  sort
  const parseDistance = (d) => parseFloat(d)

  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortType === "distance") {
      return parseDistance(a.distance) - parseDistance(b.distance)
    }
    if (sortType === "rating") {
      return b.rating - a.rating
    }
    return 0
  })

  return (
    <>
      <Navbar />

      <div className="page-header" style={{ paddingTop: '64px' }}>
        <div className="page-header-inner">
          <h1>Ойролцоох үйлчилгээ</h1>
          <p>Угаалга, засвар болон бусад</p>
        </div>
      </div>

      <main className="services-content" style={{ paddingBottom: '100px' }}>

        {/* ── Search ─────────────────────────────────────── */}
        <div className="search-bar" style={{ marginBottom: '18px' }} role="search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Үйлчилгээний газар хайх..." value={query} onChange={(e) => setQuery(e.target.value)}
            autoComplete="off" aria-label="Угаалгын газар хайх" />
        </div>

        {/* ── Service type tabs ──────── */}
        <div className="service-tabs" role="tablist" aria-label="Үйлчилгээний төрөл">
          <Link to="/washing" className="service-tab active" role="tab" aria-selected="true">Угаалга</Link>
          <Link to="/repair" className="service-tab" role="tab" aria-selected="false">Засвар</Link>
        </div>

        {/* ── Filter row ─────────────────────────────────── */}
        <div className="wash-filters" role="group" aria-label="Шүүлтүүр">
          <button className="wash-filter-primary" aria-pressed="false">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Бүх шүүлтүүр
          </button>
          <button className={`wash-filter-sort ${sortType === 'distance' ? 'active' : ''}`} onClick={() => setSortType('distance')} aria-label="Зайгаар эрэмбэлэх">
            Зай
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
          <button className={`wash-filter-sort ${sortType === 'rating' ? 'active' : ''}`} onClick={() => setSortType('rating')} aria-label="Үнэлгээгээр эрэмбэлэх">
            Үнэлгээ
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>

        {/* Cards */}
        <div className="parking-grid">
          {sortedServices.map((s) => (
            <ServiceCard key={s.name} {...s} />
          ))}
        </div>

      </main>
    </>
  )
}