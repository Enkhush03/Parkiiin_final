import React, {useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar';




export default function FindPark() {
   const [parkingSpots, setParkingSpots] = useState([]);
  useEffect(() =>{
    fetch('/api/parking.json')
    .then(response => response.json())
    .then(data => {
      setParkingSpots(data.parking_spots);
    })
    .catch(error => console.error('Error fetching parking data:', error));
  },[]);

  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [sortType, setSortType] = useState('all')
  const [selectedSpot, setSelectedSpot] = useState(null)

  // Шүүлтүүр & Эрэмбэлэлт
  const filtered = useMemo(() => {
    let result = parkingSpots.filter(s =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.loc.toLowerCase().includes(query.toLowerCase())
    )

    if (sortType === 'near')  result.sort((a, b) => a.dist - b.dist)
    if (sortType === 'cheap') result.sort((a, b) => a.price - b.price)
    if (sortType === 'free')  result = result.filter(s => s.slots > 0)

    return result
  }, [parkingSpots, query, sortType])

  const handleSelectMarker = (id) => {
    const spot = MARKER_DATA[id]
    if (spot) setSelectedSpot({ id, ...spot })
  }

  const handleBook = () => {
    if (!selectedSpot) return
    navigate('/booking', {
      state: {
        type: 'parking',
        id: selectedSpot.id,
        name: selectedSpot.name,
        price: parseInt(selectedSpot.price.replace(/,/g, ''), 10) || 0
      }
    })
  }

  return (
    <>
      <Navbar />

      <div className="map-page" id="mapPage" role="main" aria-label="Зогсоол хайх" style={{ display: 'block' }}>

        {/* ── MAP BACKGROUND ──────────────────────────────── */}
        <div className="map-canvas" aria-hidden="true">
          {/* Decorative road grid */}
          <div className="map-road map-road--h" style={{ top: '30%' }}></div>
          <div className="map-road map-road--h" style={{ top: '52%' }}></div>
          <div className="map-road map-road--h" style={{ top: '70%' }}></div>
          <div className="map-road map-road--v" style={{ left: '25%' }}></div>
          <div className="map-road map-road--v" style={{ left: '50%' }}></div>
          <div className="map-road map-road--v" style={{ left: '72%' }}></div>
          {/* City blocks */}
          <div className="map-block" style={{ top: '10%', left: '5%', width: '16%', height: '16%' }}></div>
          <div className="map-block" style={{ top: '10%', left: '28%', width: '18%', height: '16%' }}></div>
          <div className="map-block" style={{ top: '10%', left: '53%', width: '14%', height: '16%' }}></div>
          <div className="map-block" style={{ top: '10%', right: '5%', width: '16%', height: '16%' }}></div>
          <div className="map-block" style={{ top: '34%', left: '5%', width: '16%', height: '14%' }}></div>
          <div className="map-block" style={{ top: '34%', left: '28%', width: '18%', height: '14%' }}></div>
          <div className="map-block" style={{ top: '34%', left: '53%', width: '14%', height: '14%' }}></div>
          <div className="map-block" style={{ top: '34%', right: '5%', width: '16%', height: '14%' }}></div>
          <div className="map-block" style={{ top: '56%', left: '5%', width: '16%', height: '10%' }}></div>
          <div className="map-block" style={{ top: '56%', left: '28%', width: '18%', height: '10%' }}></div>
          <div className="map-block" style={{ top: '56%', right: '5%', width: '16%', height: '10%' }}></div>
        </div>

        {/* ── FLOATING TOP UI ─────────────────────────────── */}
        <div className="map-top-ui" role="search">
          <div className="map-search-row">
            <div className="search-bar map-search-bar">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Зогсоол, хаяг хайх..."
                value={query} onChange={e => setQuery(e.target.value)}
                autoComplete="off" aria-label="Зогсоол хайх" />
            </div>
            <button className="map-filter-btn" aria-label="Шүүлтүүр" aria-pressed="false">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="8" y1="12" x2="16" y2="12" />
                <line x1="11" y1="18" x2="13" y2="18" />
              </svg>
            </button>
          </div>

          <div className="map-cats" role="navigation" aria-label="Ангилал">
            <button className="map-cat active">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Зогсоол
            </button>
            <Link className="map-cat map-cat--blue" to="/washing">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              Угаалга
            </Link>
            <Link className="map-cat map-cat--orange" to="/repair">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
              Засвар
            </Link>
          </div>

          <div className="map-sort-tabs" role="group" aria-label="Эрэмбэлэлт">
            <button className={`filter-tab ${sortType === 'all' ? 'active' : ''}`} onClick={() => setSortType('all')}>Бүгд</button>
            <button className={`filter-tab ${sortType === 'near' ? 'active' : ''}`} onClick={() => setSortType('near')}>Ойрхон</button>
            <button className={`filter-tab ${sortType === 'cheap' ? 'active' : ''}`} onClick={() => setSortType('cheap')}>Хямд</button>
            <button className={`filter-tab ${sortType === 'free' ? 'active' : ''}`} onClick={() => setSortType('free')}>Чөлөөтэй</button>
          </div>
        </div>

        {/* ── MAP MARKERS ─────────────────────────────────── */}
        {Object.entries(MARKER_DATA).map(([id, spot]) => {
          let pinClass = 'map-marker-pin';
          if (id === 'cleanmax') pinClass += ' map-marker-pin--blue';
          if (id === 'autodoc') pinClass += ' map-marker-pin--orange';
          
          return (
            <div key={id} className={`map-marker ${selectedSpot?.id === id ? 'active' : ''}`} style={{ top: spot.top, left: spot.left }}
              onClick={() => handleSelectMarker(id)}
              role="button" tabIndex="0">
              <div className={pinClass}>
                <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"
                  style={{ fill: 'none', stroke: 'white', strokeWidth: '2.5' }}>
                  {id === 'cleanmax' ? (
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  ) : id === 'autodoc' ? (
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  ) : (
                    <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><path d="M9 8h4.5a1.5 1.5 0 0 1 0 3H9" /></>
                  )}
                </svg>
                {id === 'cleanmax' ? 'CleanMax' : id === 'autodoc' ? 'Auto Doc' : spot.price}
              </div>
            </div>
          )
        })}

        {/* ── BOTTOM DETAIL CARD ───────────────────────────── */}
        <div className={`map-detail-card ${selectedSpot ? 'active' : ''}`} role="dialog">
          <div className="map-detail-handle" aria-hidden="true"></div>
          <button className="map-detail-close" onClick={() => setSelectedSpot(null)} aria-label="Хаах">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {selectedSpot && (
            <div className="map-detail-header">
              <div className="map-detail-img" aria-hidden="true">{selectedSpot.emoji}</div>
              <div className="map-detail-info">
                <div className="map-detail-name">{selectedSpot.name}</div>
                <div className="map-detail-loc">
                  <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"
                    style={{ fill: 'none', stroke: 'currentColor', strokeWidth: '2', display: 'inline', verticalAlign: 'middle', marginRight: '2px' }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {selectedSpot.loc}
                </div>
                <div className="map-detail-meta">
                  <span className="map-detail-price">{selectedSpot.price}<span style={{ fontSize: '11px', fontWeight: '400', color: 'var(--text-muted)' }}>/цаг</span></span>
                  <span className="map-detail-slots">{selectedSpot.slots}</span>
                  <span className="p-rating">{selectedSpot.rating}</span>
                </div>
              </div>
              <button className="map-detail-book" onClick={handleBook} aria-label="Захиалах">
                Захиалах →
              </button>
            </div>
          )}

          <div className="map-sub-services">
            <div className="map-sub-service-row">
              <span className="map-sub-service-label">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                Ойролцоох угаалга — 200м
              </span>
              <Link className="map-sub-service-btn" to="/washing">Үзэх</Link>
            </div>
            <div className="map-sub-service-row">
              <span className="map-sub-service-label">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                Ойролцоох засвар — 300м
              </span>
              <Link className="map-sub-service-btn" to="/repair">Үзэх</Link>
            </div>
          </div>
        </div>

        {/* ── PARKING LIST SHEET ───────────────────────────── */}
        <div className="parking-list-sheet" role="region" aria-label="Зогсоолын жагсаалт">
          <div className="sheet-handle" aria-hidden="true"></div>
          <div className="sheet-header">
            <h2 className="sheet-title">Ойролцоох зогсоол <span className="sheet-count">{filtered.length}</span></h2>
          </div>
          <div className="parking-grid">
            {filtered.map(s => (
              <div key={s.id} className="parking-card" onClick={() => handleSelectMarker(s.id)}>
                <div className={`parking-img ${s.cssClass}`}><span />
                  {s.badge && <div className="p-badge">{s.badge}</div>}
                </div>
                <div className="parking-body">
                  <div className="parking-name">{s.name}</div>
                  <div className="parking-loc">📍 {s.loc}</div>
                  <div className="parking-foot">
                    <div className="p-price">{s.price.toLocaleString()}₮<span>/цаг</span></div>
                    <div className="p-rating">{s.rating}</div>
                  </div>
                  <button className="book-btn" onClick={(e) => { e.stopPropagation(); navigate('/booking', { state: { type: 'parking', id: s.id, name: s.name, price: s.price } }) }}>Захиалах</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Олдсонгүй</p>}
          </div>
        </div>

      </div>
    </>
  )
}
