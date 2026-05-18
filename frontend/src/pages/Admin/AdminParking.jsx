import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../../components/Navbar/Navbar';
import s from './AdminParking.module.css';
import { apiUrl, authFetch } from '../../services/api';

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:   'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const UB_CENTER = [47.9184, 106.9177];

// Click on map to pick coordinates
function LocationPicker({ onPick }) {
  useMapEvents({
    click(e) { onPick(e.latlng); }
  });
  return null;
}

const EMPTY_FORM = {
  spotId: '', name: '', loc: '', price: '',
  slots: '', rating: '5.0', emoji: '🅿️', lat: '', lng: ''
};

export default function AdminParking() {
  const [spots, setSpots]       = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [pickedPos, setPickedPos] = useState(null);   // { lat, lng }
  const [showMap, setShowMap]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]  = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadSpots = () => {
    fetch(apiUrl('/parking'))
      .then(res => res.json())
      .then(data => setSpots(data.PARKING_SPOTS || []))
      .catch(err => console.error('Error loading spots:', err));
  };

  useEffect(() => { loadSpots(); }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Map click → fill lat/lng fields
  const handleMapPick = ({ lat, lng }) => {
    const rLat = lat.toFixed(6);
    const rLng = lng.toFixed(6);
    setPickedPos({ lat: rLat, lng: rLng });
    setFormData(prev => ({ ...prev, lat: rLat, lng: rLng }));
  };

  const handleAddSpot = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await authFetch(apiUrl('/parking'), {
        method: 'POST',
        body: JSON.stringify({
          spotId:   formData.spotId,
          name:   formData.name,
          loc: formData.loc,
          price: Number(formData.price),
          slots:   Number(formData.slots),
          dist:  1.0,
          rating:  Number(formData.rating),
          cssClass: 'c1',
          badge:`${formData.slots} зогсоол`,
          emoji: formData.emoji,
          markerPrice: `${formData.price}₮`,
          markerSlots: `${formData.slots} зогсоол`,
          markerLoc: formData.loc,
          lat:  formData.lat ? Number(formData.lat) : null,
          lng: formData.lng ? Number(formData.lng) : null,
        })
      });

      if (response.ok) {
        showToast('Зогсоол амжилттай нэмэгдлээ!');
        loadSpots();
        setFormData(EMPTY_FORM);
        setPickedPos(null);
        setShowMap(false);
      } else {
        const err = await response.json();
        showToast('Алдаа: ' + (err.message || 'Тодорхойгүй'), 'error');
      }
    } catch (error) {
      showToast('Сэрвэртэй холбогдож чадсангүй.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (spotId) => {
    if (!window.confirm('Энэ зогсоолыг устгах уу?')) return;
    try {
      const response = await authFetch(apiUrl(`/parking/${spotId}`), { method: 'DELETE' });
      if (response.ok) { loadSpots(); showToast('Устгагдлаа.'); }
      else showToast('Устгахад алдаа гарлаа.', 'error');
    } catch { showToast('Сэрвэртэй холбогдож чадсангүй.', 'error'); }
  };

  return (
    <>
      <Navbar />

      {/* Toast */}
      {toast && (
        <div className={`${s.toast} ${toast.type === 'error' ? s.toastError : s.toastSuccess}`}>
          {toast.msg}
        </div>
      )}

      <div className={s.adminContainer}>
        <div className={s.pageHeader}>
          <h2 className={s.pageTitle}>Зогсоол удирдах</h2>
          <span className={s.badge}>{spots.length} зогсоол</span>
        </div>

        <div className={s.grid}>

          {/* ── Add Form ─────────────────────────────── */}
          <div className={s.formCard}>
            <h3 className={s.cardTitle}>Шинэ зогсоол нэмэх</h3>
            <form onSubmit={handleAddSpot} className={s.form}>

              <div className={s.fieldRow}>
                <div className={s.fieldGroup}>
                  <label className={s.label}>ID <span className={s.req}>*</span></label>
                  <input className={s.input} type="text" name="spotId"
                    placeholder="жишээ нь: emart" value={formData.spotId}
                    onChange={handleChange} required />
                </div>
              </div>

              <div className={s.fieldGroup}>
                <label className={s.label}>Нэр <span className={s.req}>*</span></label>
                <input className={s.input} type="text" name="name"
                  placeholder="Зогсоолын нэр" value={formData.name}
                  onChange={handleChange} required />
              </div>

              <div className={s.fieldGroup}>
                <label className={s.label}>Хаяг <span className={s.req}>*</span></label>
                <input className={s.input} type="text" name="loc"
                  placeholder="Дүүрэг, гудамж" value={formData.loc}
                  onChange={handleChange} required />
              </div>

              <div className={s.fieldRow}>
                <div className={s.fieldGroup}>
                  <label className={s.label}>Үнэ (₮/цаг) <span className={s.req}>*</span></label>
                  <input className={s.input} type="number" name="price"
                    placeholder="2000" value={formData.price}
                    onChange={handleChange} required min="0" />
                </div>
                <div className={s.fieldGroup}>
                  <label className={s.label}>Сул зогсоол <span className={s.req}>*</span></label>
                  <input className={s.input} type="number" name="slots"
                    placeholder="10" value={formData.slots}
                    onChange={handleChange} required min="0" />
                </div>
              </div>

              {/* ── GPS Section ────────────────────────── */}
              <div className={s.gpsSection}>
                <div className={s.gpsSectionHeader}>
                  <span className={s.gpsLabel}>GPS Координат</span>
                  <button type="button" className={s.mapToggle}
                    onClick={() => setShowMap(v => !v)}>
                    {showMap ? 'Газрын зураг хаах' : 'Газрын зурагаас сонгох'}
                  </button>
                </div>
                <p className={s.gpsHint}>
                  Газрын зурагт marker харуулахын тулд координат шаардлагатай.
                </p>

                <div className={s.fieldRow}>
                  <div className={s.fieldGroup}>
                    <label className={s.label}>Latitude (өргөрөг)</label>
                    <input className={s.input} type="number" name="lat"
                      placeholder="47.9184" step="any"
                      value={formData.lat} onChange={handleChange} />
                  </div>
                  <div className={s.fieldGroup}>
                    <label className={s.label}>Longitude (уртраг)</label>
                    <input className={s.input} type="number" name="lng"
                      placeholder="106.9177" step="any"
                      value={formData.lng} onChange={handleChange} />
                  </div>
                </div>

                {/* Mini Leaflet map */}
                {showMap && (
                  <div className={s.miniMapWrap}>
                    <p className={s.miniMapHint}>↓ Газрын зураг дээр дарж байршил сонгоно уу</p>
                    <MapContainer
                      center={pickedPos ? [pickedPos.lat, pickedPos.lng] : UB_CENTER}
                      zoom={15}
                      style={{ width: '100%', height: '280px', borderRadius: '10px' }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; OpenStreetMap'
                      />
                      <LocationPicker onPick={handleMapPick} />
                      {pickedPos && (
                        <Marker position={[pickedPos.lat, pickedPos.lng]} />
                      )}
                    </MapContainer>
                    {pickedPos && (
                      <div className={s.pickedCoords}>
                        ✅ Сонгосон байршил: {pickedPos.lat}, {pickedPos.lng}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button type="submit" className={s.submitBtn} disabled={saving}>
                {saving ? 'Хадгалж байна...' : 'Хадгалах'}
              </button>
            </form>
          </div>

          {/* ── Spot List ────────────────────────────── */}
          <div className={s.listCard}>
            <h3 className={s.cardTitle}>Одоо байгаа зогсоолууд</h3>
            <div className={s.spotList}>
              {spots.map(spot => (
                <div key={spot.spotId} className={s.spotItem}>
                  <div className={s.spotEmoji}>{spot.emoji}</div>
                  <div className={s.spotInfo}>
                    <strong className={s.spotName}>{spot.name}</strong>
                    <p className={s.spotLoc}>{spot.loc}</p>
                    <div className={s.spotMeta}>
                      <span className={s.metaChip}>{spot.price?.toLocaleString('mn-MN')}₮/цаг</span>
                      <span className={s.metaChip}>{spot.slots} зогсоол</span>
                      {spot.lat && spot.lng
                        ? <span className={`${s.metaChip} ${s.metaChipGps}`}>GPS</span>
                        : <span className={`${s.metaChip} ${s.metaChipNoGps}`}>GPS байхгүй</span>
                      }
                    </div>
                  </div>
                  <button onClick={() => handleDelete(spot.spotId)} className={s.deleteBtn} aria-label="Устгах">
                    Устгах
                  </button>
                </div>
              ))}
              {spots.length === 0 && (
                <p className={s.empty}>Зогсоол байхгүй байна.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
