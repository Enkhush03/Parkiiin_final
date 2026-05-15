import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Navbar from '../../components/Navbar/Navbar'
import { parkingService } from '../../services/parkingService'
import s from './FindPark.module.css'

// Leaflet default icon fix (Vite/webpack asset issue)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Custom colored circle marker for each parking spot
const createParkingIcon = (emoji, isActive) =>
  L.divIcon({
    className: '',
    html: `
      <div style="
        width: ${isActive ? '52px' : '42px'};
        height: ${isActive ? '52px' : '42px'};
        background: ${isActive ? '#4f46e5' : '#ffffff'};
        border: 3px solid ${isActive ? '#4f46e5' : '#e2e8f0'};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${isActive ? '24px' : '20px'};
        box-shadow: 0 4px 16px rgba(0,0,0,${isActive ? '0.35' : '0.18'});
        transition: all 0.2s ease;
        cursor: pointer;
      ">${emoji}</div>`,
    iconSize: [isActive ? 52 : 42, isActive ? 52 : 42],
    iconAnchor: [isActive ? 26 : 21, isActive ? 26 : 21],
    popupAnchor: [0, isActive ? -30 : -24],
  })

// Fly to selected spot
function FlyToSpot({ spot }) {
  const map = useMap()
  useEffect(() => {
    if (spot?.lat && spot?.lng) {
      map.flyTo([spot.lat, spot.lng], 16, { duration: 0.8 })
    }
  }, [spot, map])
  return null
}

const getNumericPrice = (price) => {
  if (typeof price === 'number') return price
  return parseInt(String(price).replace(/[^\d]/g, ''), 10) || 0
}

const formatPrice = (price) => {
  if (typeof price === 'number') return price.toLocaleString('mn-MN')
  return price
}

// UB city center coordinates
const UB_CENTER = [47.9184, 106.9177]

export default function FindPark() {
  const [parkingSpots, setParkingSpots] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [sortType, setSortType] = useState('all')
  const [selectedSpot, setSelectedSpot] = useState(null)

  useEffect(() => {
    parkingService.getParkingSpots()
      .then(data => { setParkingSpots(data); setLoading(false) })
      .catch(err => { console.error('Error fetching parking data:', err); setLoading(false) })
  }, [])

  const filtered = useMemo(() => {
    let result = parkingSpots.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.loc.toLowerCase().includes(query.toLowerCase())
    )
    if (sortType === 'near')  result = [...result].sort((a, b) => a.dist - b.dist)
    if (sortType === 'cheap') result = [...result].sort((a, b) => a.price - b.price)
    if (sortType === 'free')  result = result.filter(s => s.slots > 0)
    return result
  }, [parkingSpots, query, sortType])

  const handleBook = () => {
    if (!selectedSpot) return
    navigate('/booking', {
      state: {
        type: 'parking',
        id: selectedSpot.id,
        name: selectedSpot.name,
        price: getNumericPrice(selectedSpot.price)
      }
    })
  }

  return (
    <>
      <Navbar />

      <div className={s.page} id="mapPage" role="main" aria-label="Зогсоол хайх">

        {/* ── LEAFLET MAP ────────────────────────────────────── */}
        <div className={s.mapWrap}>
          {!loading && (
            <MapContainer
              center={UB_CENTER}
              zoom={15}
              style={{ width: '100%', height: '100%' }}
              zoomControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <FlyToSpot spot={selectedSpot} />

              {parkingSpots.filter(s => s.lat && s.lng).map(spot => (
                <Marker
                  key={spot.id}
                  position={[spot.lat, spot.lng]}
                  icon={createParkingIcon(spot.emoji, selectedSpot?.id === spot.id)}
                  eventHandlers={{ click: () => setSelectedSpot(spot) }}
                >
                  <Popup>
                    <div style={{ minWidth: '160px' }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{spot.name}</div>
                      <div style={{ color: '#64748b', fontSize: '12px', marginBottom: '6px' }}>📍 {spot.loc}</div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontWeight: 700, color: '#4f46e5' }}>{formatPrice(spot.price)}₮/цаг</span>
                        <span style={{ color: '#10b981', fontSize: '12px' }}>⭐ {spot.rating}</span>
                      </div>
                      <button
                        onClick={handleBook}
                        style={{
                          marginTop: '8px', width: '100%', padding: '6px',
                          background: '#4f46e5', color: '#fff', border: 'none',
                          borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600
                        }}
                      >Захиалах →</button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
          {loading && (
            <div className={s.mapLoader}>
              <div className={s.spinner} />
              <p>Газрын зураг ачаалж байна...</p>
            </div>
          )}
        </div>

        {/* ── FLOATING TOP UI ─────────────────────────────────── */}
        <div className={s.topUi} role="search">
          <div className={s.searchRow}>
            <div className={s.searchBar}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Зогсоол, хаяг хайх..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoComplete="off"
                aria-label="Зогсоол хайх"
              />
              {query && (
                <button className={s.clearBtn} onClick={() => setQuery('')} aria-label="Цэвэрлэх">✕</button>
              )}
            </div>
          </div>

          <div className={s.cats} role="navigation" aria-label="Ангилал">
            <button className={`${s.cat} ${s.catActive}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Зогсоол
            </button>
            <Link className={`${s.cat} ${s.catBlue}`} to="/washing">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              Угаалга
            </Link>
            <Link className={`${s.cat} ${s.catOrange}`} to="/repair">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              Засвар
            </Link>
          </div>

          <div className={s.sortTabs} role="group" aria-label="Эрэмбэлэлт">
            {[['all','Бүгд'],['near','Ойрхон'],['cheap','Хямд'],['free','Чөлөөтэй']].map(([v, label]) => (
              <button
                key={v}
                className={`${s.sortTab} ${sortType === v ? s.sortTabActive : ''}`}
                onClick={() => setSortType(v)}
              >{label}</button>
            ))}
          </div>
        </div>

        {/* ── BOTTOM DETAIL CARD ─────────────────────────────── */}
        <div className={`${s.detailCard} ${selectedSpot ? s.detailCardActive : ''}`} role="dialog">
          <div className={s.detailHandle} aria-hidden="true" />
          <button className={s.detailClose} onClick={() => setSelectedSpot(null)} aria-label="Хаах">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {selectedSpot && (
            <div className={s.detailHeader}>
              <div className={s.detailImg}>{selectedSpot.emoji}</div>
              <div className={s.detailInfo}>
                <div className={s.detailName}>{selectedSpot.name}</div>
                <div className={s.detailLoc}>
                  <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"
                    style={{ fill:'none', stroke:'currentColor', strokeWidth:'2', display:'inline', verticalAlign:'middle', marginRight:'2px' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {selectedSpot.loc}
                </div>
                <div className={s.detailMeta}>
                  <span className={s.detailPrice}>
                    {formatPrice(selectedSpot.price)}₮
                    <span style={{ fontSize:'11px', fontWeight:'400', color:'var(--text-muted)' }}>/цаг</span>
                  </span>
                  <span className={s.detailSlots}>{selectedSpot.slots} зогсоол</span>
                  <span className={s.detailRating}>⭐ {selectedSpot.rating}</span>
                </div>
              </div>
              <button className={s.detailBook} onClick={handleBook} aria-label="Захиалах">
                Захиалах →
              </button>
            </div>
          )}

          <div className={s.subServices}>
            <div className={s.subServiceRow}>
              <span className={s.subServiceLabel}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                Ойролцоох угаалга — 200м
              </span>
              <Link className={s.subServiceBtn} to="/washing">Үзэх</Link>
            </div>
            <div className={s.subServiceRow}>
              <span className={s.subServiceLabel}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
                Ойролцоох засвар — 300м
              </span>
              <Link className={s.subServiceBtn} to="/repair">Үзэх</Link>
            </div>
          </div>
        </div>

        {/* ── PARKING LIST SHEET ─────────────────────────────── */}
        <div className={s.listSheet} role="region" aria-label="Зогсоолын жагсаалт">
          <div className={s.sheetHandle} aria-hidden="true" />
          <div className={s.sheetHeader}>
            <h2 className={s.sheetTitle}>
              Ойролцоох зогсоол <span className={s.sheetCount}>{filtered.length}</span>
            </h2>
          </div>
          <div className={s.parkingGrid}>
            {filtered.map(spot => (
              <div key={spot.id} className={`${s.parkingCard} ${selectedSpot?.id === spot.id ? s.parkingCardActive : ''}`}
                onClick={() => setSelectedSpot(spot)}>
                <div className={`parking-img ${spot.cssClass}`}><span />
                  {spot.badge && <div className="p-badge">{spot.badge}</div>}
                </div>
                <div className={s.parkingBody}>
                  <div className={s.parkingName}>{spot.name}</div>
                  <div className={s.parkingLoc}>📍 {spot.loc}</div>
                  <div className={s.parkingFoot}>
                    <div className="p-price">{formatPrice(spot.price)}₮<span>/цаг</span></div>
                    <div className="p-rating">{spot.rating}</div>
                  </div>
                  <button className="book-btn"
                    onClick={e => {
                      e.stopPropagation()
                      navigate('/booking', { state: { type: 'parking', id: spot.id, name: spot.name, price: spot.price } })
                    }}>Захиалах</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Олдсонгүй</p>
            )}
          </div>
        </div>

      </div>
    </>
  )
}
