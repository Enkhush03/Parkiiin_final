import "../../../styles/main.css"
import { useState } from "react"
import ServiceCard from "../components/ServiceCard"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"

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

      <main className="services-content">

        <SearchBar onSearch={setQuery} />

        {/* Tabs */}
        <div className="service-tabs">
          <button
  className={`service-tab ${activeTab === "wash" ? "active" : ""}`}
  onClick={() => setActiveTab("wash")}
>
  Угаалга
</button>

<button
  className={`service-tab ${activeTab === "repair" ? "active" : ""}`}
  onClick={() => setActiveTab("repair")}
>
  Засвар
</button>
        </div>

        {/* Sort */}
        <div className="wash-filters">
          <button
  className={`wash-filter-sort ${sortType === "distance" ? "active" : ""}`}
  onClick={() => setSortType("distance")}
>
  Зай
</button>

<button
  className={`wash-filter-sort ${sortType === "rating" ? "active" : ""}`}
  onClick={() => setSortType("rating")}
>
  Үнэлгээ
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