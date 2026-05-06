import { useLocation } from "react-router-dom"
import WashBooking from "../components/Booking/WashBooking"
import RepairBooking from "../components/Booking/RepairBooking"
export default function Booking() {
  const { state } = useLocation()

  if (!state) return <p>Мэдээлэл алга</p>

  const { type, name, price } = state

  return (
    <div className="book-main">
      <h1>Захиалга</h1>

      <h2>{name}</h2>
      <p>Үнэ: {price}</p>

      {/*  TYPE-ээр ялгана */}
      {type === "parking" && <ParkingBooking />}
      {type === "wash" && <WashBooking />}
      {type === "repair" && <RepairBooking />}
    </div>
  )
}