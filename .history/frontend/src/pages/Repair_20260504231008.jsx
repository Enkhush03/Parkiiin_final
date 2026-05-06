import "../../../styles/main.css"
import { useState } from "react"
import ServiceCard from "../components/ServiceCard"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"

export default function Repair() {

  const [query, setQuery] = useState("")
  const [activeTab, setActiveTab] = useState("wash")
  const [sortType, setSortType] = useState("distance")

  const services = [
  {
    name: "Auto Fix Garage",
    distance: "1.5km",
    time: "30-60 мин",
    price: "50,000₮",
    rating: 4.7,
    tag: "Нээлттэй",
    type: "repair",
    gradient: "linear-gradient(135deg,#2b1a1a,#ff6b6b)"
  },
  {
    name: "Quick Repair Center",
    distance: "2.8km",
    time: "20-40 мин",
    price: "30,000₮",
    rating: 4.4,
    tag: "Нээлттэй",
    type: "repair",
    gradient: "linear-gradient(135deg,#1a1a2e,#ff6b6b)"
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