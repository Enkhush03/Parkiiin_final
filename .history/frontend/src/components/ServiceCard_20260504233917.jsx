import { useNavigate } from "react-router-dom"
export default function ServiceCard({
  name,
  distance,
  time,
  price,
  rating,
  tag,
  gradient
}) {
  return (
    <div className="service-card">
      <div
        className="service-img"
        style={{ background: gradient }}
      >
        <span></span>
        <div className="s-tag">{tag}</div>
      </div>

      <div className="service-body">
        <div className="service-name">{name}</div>
        <div className="service-dist">
          📍 {distance} • ⏱ {time}
        </div>

        <div className="service-foot">
          <div className="s-price">{price}</div>
          <div className="s-rating">{rating}</div>
        </div>

        <button className="book-btn">
          Захиалах →
        </button>
      </div>
    </div>
  )
}