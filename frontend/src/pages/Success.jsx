import { useLocation, useNavigate } from "react-router-dom"

export default function Success() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) return <p>Мэдээлэл алга</p>

  const { type, service, date, time, name } = state

  return (
    <div className="book-main">
      <div className="book-content success-page-content">

        <div className="success-hero">
          <div className="success-check-circle">✔</div>
        </div>

        <h1 className="success-title">Амжилттай!</h1>

        <p className="success-subtitle">
          {type === "parking"
            ? "Таны зогсоолын захиалга амжилттай баталгаажлаа"
            : "Таны захиалга амжилттай баталгаажлаа"}
        </p>

        <div className="section-card success-detail-card">

          <div className="success-card-top">
            <div>
              <span className="success-eyebrow">
                {type === "parking" ? "Зогсоол" : "Үйлчилгээ"}
              </span>

              <h2 className="success-service-name">
                {service}
              </h2>
            </div>

            <span className="success-id-pill">
              ID: #{Math.floor(Math.random() * 100000)}
            </span>
          </div>

          <div className="success-info-row">
            <div className="success-info-col">
              <span className="success-info-label">Цаг</span>
              <div className="success-info-value">
                {time} | {date}
              </div>
            </div>
          </div>

        </div>

        <div className="success-actions">

          <button
            className="btn-full"
            onClick={() => navigate("/")}
          >
            Нүүр хуудас руу
          </button>

        </div>

      </div>
    </div>
  )
}