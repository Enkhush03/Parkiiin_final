import { useNavigate } from 'react-router-dom'
import s from './ParkingCard.module.css'

/**
 * PARKING_SPOTS массиваас нэг элементийг props-оор авна.
 * data-г src/data/parkingData.js-аас import хийж дамжуулна.
 */
export default function ParkingCard({ id, name, loc, price, slots, rating, cssClass, badge }) {
  const navigate = useNavigate()

  return (
    <div
      className={s.card}
      role="listitem"
      onClick={() => navigate('/booking', { state: { type: 'parking', id, name, price } })}
    >
      {/* Image area */}
      <div className={`${s.img} ${s[cssClass] || ''}`}>
        <span aria-hidden="true" />
        {badge && <div className={s.badge}>{badge}</div>}
      </div>

      {/* Body */}
      <div className={s.body}>
        <div className={s.name}>{name}</div>
        <div className={s.loc}>📍 {loc}</div>
        <div className={s.foot}>
          <div className={s.price}>
            {price.toLocaleString('mn-MN')}₮<span>/цаг</span>
          </div>
          <div className={s.rating} aria-label={`${rating} одтой`}>{rating}</div>
        </div>
        <button className={s.btn}>Захиалах →</button>
      </div>
    </div>
  )
}
