import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RepairBooking() {

  const navigate = useNavigate()

  const [selectedService, setSelectedService] = useState("Тос солих")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")

  const services = [
    { name: "Тос солих", price: 85000 },
    { name: "Дугуй засвар", price: 15000 },
    { name: "Кузов засвар", price: 120000 }
  ]

  const handleSubmit = () => {
    if (!name || !phone) {
      alert("Мэдээллээ бүрэн оруулна уу")
      return
    }

    navigate("/success", {
      state: {
        type: "repair",
        service: selectedService,
        date: "Өнөөдөр",
        time: "—",
        name,
        phone
      }
    })
  }

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

      <div className="section-card">
        <input
          placeholder="Нэр"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Утас"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button className="btn-full" onClick={handleSubmit}>
        Захиалах
      </button>

    </div>
  )
}