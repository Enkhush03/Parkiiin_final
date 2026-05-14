import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { bookingService } from '../services/bookingService'

export default function Booking() {
  const { state } = useLocation()
  const navigate = useNavigate()
  
  const [config, setConfig] = useState(null)
  const [hour, setHour] = useState(2)
  const [useLoyalty, setUseLoyalty] = useState(false)
  const [payment, setPayment] = useState('qpay')

  const [vehicles, setVehicles] = useState([])
  const [selectedVehicleId, setSelectedVehicleId] = useState('')

  useEffect(() => {
    // Load vehicles from logged-in user
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userObj = JSON.parse(userStr);
      setVehicles(userObj.vehicles || []);
      if (userObj.vehicles && userObj.vehicles.length > 0) {
        setSelectedVehicleId(userObj.vehicles[0]._id);
      }
    }

    bookingService.getBookingConfig()
      .then(data => {
        setConfig(data)
        // Default утгуудыг тохируулах (JSON-оос)
        const defPayment = data.PaymentMethod.find(p => p.default)
        if (defPayment) setPayment(defPayment.id)
      })
      .catch(err => console.error("Error loading booking config:", err))
  }, [])

  if (!state) return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Мэдээлэл алга байна. <button onClick={() => navigate('/parking')}>Буцах</button></div>

  const { type, name, price } = state
  
  // Тооцоолол
  const ratePerHour = config?.Booking?.Price_per_hour || price
  const basePrice = ratePerHour * hour
  const discount = useLoyalty ? (config?.Booking?.Bonus || 0) : 0
  const total = basePrice - discount

  const handleConfirm = () => {
    navigate('/success', {
      state: {
        name,
        loc: 'Сүхбаатар дүүрэг, УБ',
        hour,
        total
      }
    })
  }

  // Loading state
  if (!config) return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Уншиж байна...</div>

  return (
    <>
      <Navbar />
      
      <main className="book-main">
        <div className="book-content page-enter" style={{ paddingBottom: '100px' }}>

          {/* ── Back + Title ─────────────────────────────── */}
          <div className="book-header">
            <button onClick={() => navigate(-1)} className="back-btn" aria-label="Буцах">←</button>
            <h1 className="book-page-title">Зогсоолын захиалга</h1>
          </div>

          {/* ── Parking summary ───────────────────────────── */}
          <div className="section-card">
            <div className="booking-park-row">
              <div className="booking-park-icon" aria-hidden="true"></div>
              <div className="booking-park-info">
                <div className="booking-park-name">{name}</div>
                <div className="booking-park-loc">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Сүхбаатар дүүрэг, УБ
                </div>
                <span className="p-rating">4.8</span>
              </div>
              <div className="booking-park-price">
                {price.toLocaleString()}₮
                <span className="booking-park-price-unit">/цаг</span>
              </div>
            </div>
          </div>

          {/* ── Hour selection ────────────────────────────── */}
          <div className="section-card">
            <div className="sc-title">Хугацаа сонгох</div>
            <div className="hours-grid" role="group" aria-label="Цаг сонгох">
              {config.HourOptions.map(opt => (
                <button 
                  key={opt.label} 
                  className={`hour-btn ${hour === opt.hours ? 'active' : ''} ${opt.span2 ? 'hour-btn--span2' : ''}`} 
                  onClick={() => setHour(opt.hours)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Vehicle info ───────────────────────────────── */}
          <div className="section-card">
            <div className="sc-title">Машины мэдээлэл</div>
            {vehicles.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <select 
                  style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }}
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                >
                  {vehicles.map(v => (
                    <option key={v._id} value={v._id}>{v.emoji} {v.model} - {v.plate}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div style={{ padding: '15px', background: '#fff3cd', color: '#856404', borderRadius: '8px' }}>
                Та профайл хэсэгт орж машинаа бүртгүүлнэ үү.
              </div>
            )}
          </div>

          {/* ── Loyalty toggle ────────────────────────────── */}
          <div className="section-card">
            <div className="sc-title">Loyalty оноо</div>
            <div className="booking-loyalty-row">
              <div className="booking-loyalty-info">
                <div className="loyalty-title">{config.Booking.Bonus} оноо ашиглах</div>
                <div className="loyalty-desc">Захиалгын дүнгээс хөнгөлөлт эдлэх</div>
              </div>
              <button className={`toggle ${useLoyalty ? 'on' : ''}`} onClick={() => setUseLoyalty(!useLoyalty)} aria-label="Loyalty оноо идэвхжүүлэх" aria-pressed={useLoyalty}>
              </button>
            </div>
          </div>

          {/* ── Price summary ─────────────────────────────── */}
          <div className="section-card">
            <div className="sc-title">Захиалгын хураангуй</div>
            <div className="sum-row">
              <span className="lbl">Зогсоол ({hour} цаг)</span>
              <span className="sum-value">{basePrice.toLocaleString()}₮</span>
            </div>
            {useLoyalty && (
              <div className="sum-row">
                <span className="lbl">Ашигласан оноо</span>
                <span className="sum-discount">−{discount.toLocaleString()}₮</span>
              </div>
            )}
            <div className="sum-row sum-row--total">
              <span className="lbl">Нийт төлөх</span>
              <span className="sum-total">{total.toLocaleString()}₮</span>
            </div>
          </div>

          {/* ── Payment method ────────────────────────────── */}
          <div className="section-card">
            <div className="sc-title">Төлбөрийн хэрэгсэл</div>
            <div className="payment-grid payment-grid--single" role="group" aria-label="Төлбөрийн хэрэгсэл">

              <button className={`pay-opt ${payment === 'qpay' ? 'active' : ''}`} onClick={() => setPayment('qpay')}>
                <span className="pay-icon" aria-hidden="true"></span>
                <div className="pay-opt-detail">
                  <div className="pay-opt-name">QPay</div>
                  <div className="pay-opt-sub">Цахим хэтэвч</div>
                </div>
                <span className="pay-check" aria-hidden="true"></span>
              </button>

              <button className={`pay-opt ${payment === 'socialpay' ? 'active' : ''}`} onClick={() => setPayment('socialpay')}>
                <span className="pay-icon" aria-hidden="true"></span>
                <div className="pay-opt-detail">
                  <div className="pay-opt-name">Social Pay</div>
                  <div className="pay-opt-sub">Голомт банк</div>
                </div>
                <span className="pay-check" aria-hidden="true"></span>
              </button>

              <button className={`pay-opt ${payment === 'toki' ? 'active' : ''}`} onClick={() => setPayment('toki')}>
                <span className="pay-icon" aria-hidden="true"></span>
                <div className="pay-opt-detail">
                  <div className="pay-opt-name">Toki Pay</div>
                  <div className="pay-opt-sub">Цахим хэтэвч</div>
                </div>
                <span className="pay-check" aria-hidden="true"></span>
              </button>

              <button className={`pay-opt ${payment === 'card' ? 'active' : ''}`} onClick={() => setPayment('card')}>
                <span className="pay-icon" aria-hidden="true"></span>
                <div className="pay-opt-detail">
                  <div className="pay-opt-name">Банкны карт</div>
                  <div className="pay-opt-sub">Visa / Mastercard</div>
                </div>
                <span className="pay-check" aria-hidden="true"></span>
              </button>

            </div>
          </div>

          {/* ── Confirm button ────────────────────────────── */}
          <button className="btn-full" onClick={handleConfirm}>
            Төлбөр баталгаажуулах 
          </button>

        </div>
      </main>
    </>
  )
}