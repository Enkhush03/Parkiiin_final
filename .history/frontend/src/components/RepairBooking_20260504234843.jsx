import { useState } from "react"

export default function RepairBooking({ service }) {

  const [selectedService, setSelectedService] = useState("Тос солих")

  const services = [
    { name: "Тос солих", price: 85000 },
    { name: "Дугуй засвар", price: 15000 },
    { name: "Кузов засвар", price: 120000 }
  ]

  return (
    <div className="section-card">

      <h2>Засварын үйлчилгээ</h2>

      {services.map((s) => (
        <div
          key={s.name}
          className={selectedService === s.name ? "svc-card svc-card--selected" : "svc-card"}
          onClick={() => setSelectedService(s.name)}
        >
          {s.name} — {s.price}₮
        </div>
      ))}

      <h3>Сонгосон:</h3>
      <p>{selectedService}</p>

    </div>
  )
}