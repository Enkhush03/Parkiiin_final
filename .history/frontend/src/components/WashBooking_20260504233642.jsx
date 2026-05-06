import { useState } from "react"

export default function WashBooking({ service }) {

  const [selectedService, setSelectedService] = useState("Бүтэн угаалга")
  const [selectedTime, setSelectedTime] = useState("11:00")
  const [selectedDate, setSelectedDate] = useState("6-р сарын 24")

  const services = [
    { name: "Бүтэн угаалга", price: 45000, duration: "60 мин" },
    { name: "Тос солих", price: 85000, duration: "30 мин" },
    { name: "Кузов өнгөлгөө", price: 250000, duration: "180 мин" },
    { name: "Дугуй засвар", price: 15000, duration: "20 мин" }
  ]

  const times = ["11:00", "12:00", "13:00", "14:00", "15:00"]

  return (
    <div className="section-card">

      <h2>Үйлчилгээгээ сонгох</h2>

      <div className="svc-grid">
        {services.map((s) => (
          <div
            key={s.name}
            className={`svc-card ${selectedService === s.name ? "svc-card--selected" : ""}`}
            onClick={() => setSelectedService(s.name)}
          >
            <h3>{s.name}</h3>
            <p>{s.duration}</p>
            <span>{s.price}₮</span>
          </div>
        ))}
      </div>

      <h2>Цаг сонгох</h2>

      <div className="appt-time-grid">
        {times.map((t) => (
          <button
            key={t}
            className={selectedTime === t ? "appt-time-slot appt-time-slot--selected" : "appt-time-slot"}
            onClick={() => setSelectedTime(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="section-card">
        <h3>Хураангуй</h3>
        <p>{selectedService}</p>
        <p>{selectedDate} - {selectedTime}</p>
      </div>

    </div>
  )
}