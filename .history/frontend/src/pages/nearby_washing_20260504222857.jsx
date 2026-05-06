import "../../../styles/main.css"
import { useState } from "react"
import ServiceCard from "../components/ServiceCard"
import Navbar from "../components/Navbar"
import SearchBar from "../components/SearchBar"

export default function Washing() {

  //  state (дараагийн шатанд хэрэгтэй)
  const [query, setQuery] = useState("")
  const services = [
  {
    name: "CleanMax Auto Wash",
    distance: "1.2km",
    time: "25-35 мин",
    price: "25,000₮",
    rating: "4.8",
    tag: "Нээлттэй",
    gradient: "linear-gradient(135deg,#1a2e2a,#2BBFA0)"
  },
  {
    name: "Eco Shine Detailing",
    distance: "2.4km",
    time: "40-50 мин",
    price: "18,000₮",
    rating: "4.5",
    tag: "Нээлттэй",
    gradient: "linear-gradient(135deg,#134040,#2BBFA0)"
  },
  {
    name: "Sparkle Express",
    distance: "0.8km",
    time: "—",
    price: "15,000₮",
    rating: "4.3",
    tag: "-15%",
    gradient: "linear-gradient(135deg,#0a2a20,#2BBFA0)"
  },
  {
    name: "AutoSPA Premium",
    distance: "3.1km",
    time: "60 мин",
    price: "35,000₮",
    rating: "4.7",
    tag: "Нээлттэй",
    gradient: "linear-gradient(135deg,#0d5e52,#2BBFA0)"
  }
]
const filteredServices = services.filter((s) =>
s.name.toLocaleLowerCase().includes(query.toLocaleLowerCase))


  return (
    <>
      <Navbar /> {/*  navbar ашиглана */}

      <main className="services-content" style={{ paddingBottom: "100px" }}>

        {/*  Search component */}
        <SearchBar onSearch={setQuery} />

        {/*  Tabs (дараа component болгоно) */}
        <div className="service-tabs">
          <button className="service-tab active">Угаалга</button>
          <button className="service-tab">Засвар</button>
        </div>

        {/*  Filter (түр орхиж болно) */}
        <div className="wash-filters">
          <button className="wash-filter-primary">
            Бүх шүүлтүүр
          </button>
        </div>

        {/*  Cards */}
        <div className="parking-grid">

         {filteredServices.map((s) => (
          <ServiceCard key={s.name}{...s}/>
         ))}

        </div>
      </main>
    </>
  )
}