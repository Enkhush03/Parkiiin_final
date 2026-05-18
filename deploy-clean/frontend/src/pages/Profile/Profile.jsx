import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { apiUrl, authFetch } from '../../services/api'

export default function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSubpage, setActiveSubpage] = useState(location.state?.subpage || null)
  const [user, setUser] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [newVehicle, setNewVehicle] = useState({ model: '', plate: '', emoji: '🚗' })
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const returnToBooking = location.state?.returnToBooking || null

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    authFetch(apiUrl(`/users/${parsedUser.id}`))
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('user');
          navigate('/login');
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        const updatedUser = { ...parsedUser, ...data };
        setUser(updatedUser);
        setVehicles(data.vehicles || []);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch(err => console.error(err));

    setOrdersLoading(true);
    authFetch(apiUrl(`/orders/user/${parsedUser.id}`))
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setOrdersLoading(false);
      })
      .catch(() => setOrdersLoading(false));
  }, [navigate]);

  useEffect(() => {
    if (location.state?.subpage) {
      setActiveSubpage(location.state.subpage);
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  }

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      const response = await authFetch(apiUrl(`/users/${user.id}/vehicles`), {
        method: 'POST',
        body: JSON.stringify(newVehicle)
      });

      if (response.ok) {
        const updatedVehicles = await response.json();
        setVehicles(updatedVehicles);
        setNewVehicle({ model: '', plate: '', emoji: '🚗' });
        const updatedUser = { ...user, vehicles: updatedVehicles };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        if (returnToBooking) {
          navigate('/booking', { state: returnToBooking, replace: true });
        }
      } else {
        alert('Машин нэмэхэд алдаа гарлаа');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteVehicle = async (vehicleId) => {
    if (!window.confirm('Энэ машиныг устгах уу?')) return;

    try {
      const response = await authFetch(apiUrl(`/users/${user.id}/vehicles/${vehicleId}`), {
        method: 'DELETE'
      });

      if (response.ok) {
        const updatedVehicles = await response.json();
        setVehicles(updatedVehicles);
        const updatedUser = { ...user, vehicles: updatedVehicles };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (!user) return null;

  return (
    <>
      <Navbar />

      <main id="profilePage" className="page-enter" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        <div className="profile-hero">
          <div className="profile-top">
            <div className="avatar" aria-label="Хэрэглэгчийн дүрс тэмдэг">{user.name?.charAt(0).toUpperCase()}</div>
            <div className="profile-info">
              <h1>{user.name}</h1>
              <p>{user.email}</p>
            </div>
            <button className="profile-settings-btn" aria-label="Тохиргоо" onClick={() => setActiveSubpage('settings')}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="profile-stats-wrap">
          <div className="profile-stats-grid">
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div className="profile-stat-num">{orders.filter(o => o.type === 'parking').length}</div>
              <div className="profile-stat-lbl">Зогсоол</div>
            </div>
            <div className="profile-stat-card profile-stat-card--accent" onClick={() => setActiveSubpage('loyalty')}>
              <div className="profile-stat-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></svg>
              </div>
              <div className="profile-stat-num">{user.points || 0}</div>
              <div className="profile-stat-lbl">Оноо</div>
            </div>
            <div className="profile-stat-card">
              <div className="profile-stat-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              </div>
              <div className="profile-stat-num">0.0</div>
              <div className="profile-stat-lbl">Үнэлгээ</div>
            </div>
          </div>
        </div>

        <div className="menu-list" role="navigation" aria-label="Профайл цэс">
          <div className="menu-item" onClick={() => setActiveSubpage('vehicles')} role="button" tabIndex="0">
            <div className="menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v5" /><circle cx="15.5" cy="17.5" r="2.5" /><circle cx="5.5" cy="17.5" r="2.5" /><polyline points="3 13 3 9 9 9" /><polyline points="13 3 13 9 3 9" /></svg>
            </div>
            <div className="menu-text">
              <div className="menu-title">Машины төрөл</div>
              <div className="menu-sub">{vehicles.length} машин бүртгэлтэй</div>
            </div>
            <span className="menu-arrow" aria-hidden="true">›</span>
          </div>

          <div className="menu-item" onClick={() => setActiveSubpage('history')} role="button" tabIndex="0">
            <div className="menu-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            </div>
            <div className="menu-text">
              <div className="menu-title">Захиалгын түүх</div>
              <div className="menu-sub">Өнгөрсөн захиалгууд</div>
            </div>
            <span className="menu-arrow" aria-hidden="true">›</span>
          </div>

          <div className="menu-item menu-item--danger" onClick={handleLogout} role="button" tabIndex="0">
            <div className="menu-icon menu-icon--danger" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            </div>
            <div className="menu-text">
              <div className="menu-title menu-title--danger">Системээс гарах</div>
            </div>
            <span className="menu-arrow menu-arrow--danger" aria-hidden="true">›</span>
          </div>
        </div>
      </main>

      {activeSubpage && (
        <div className="subpage active" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'var(--bg)',
          zIndex: 9999,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div className="subpage-header" style={{
            display: 'flex', alignItems: 'center', padding: '16px',
            borderBottom: '1px solid var(--border)', background: 'var(--card-bg)',
            position: 'sticky', top: 0, zIndex: 10
          }}>
            <button
              className="subpage-back"
              onClick={() => setActiveSubpage(null)}
              style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', marginRight: '16px', color: 'var(--text)' }}
            >←</button>
            <h2 className="subpage-title" style={{ margin: 0, fontSize: '18px', color: 'var(--text)' }}>{
              activeSubpage === 'history' ? 'Захиалгын түүх' :
                activeSubpage === 'loyalty' ? 'Loyalty оноо' :
                  activeSubpage === 'vehicles' ? 'Миний машинууд' :
                    activeSubpage === 'payments' ? 'Төлбөрийн хэрэгсэл' : 'Тохиргоо'
            }</h2>
          </div>

          <div className="subpage-content" style={{ padding: '20px', flex: 1 }}>
            {activeSubpage === 'history' ? (
              <div className="history-wrap">
                {ordersLoading ? (
                  <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>Уншиж байна...</p>
                ) : orders.length === 0 ? (
                  <div style={{ textAlign: 'center', marginTop: '60px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '8px' }}>Захиалга байхгүй байна.</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', opacity: 0.7 }}>Зогсоол болон үйлчилгээ захиалахад энд харагдана.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {orders.map(order => {
                      const typeLabel = order.type === 'parking' ? 'Зогсоол' : (order.type === 'washing' || order.type === 'wash') ? 'Угаалга' : 'Засвар';
                      const typeBg = order.type === 'parking' ? '#e8f5e9' : (order.type === 'washing' || order.type === 'wash') ? '#e3f2fd' : '#fff3e0';
                      const typeColor = order.type === 'parking' ? '#2e7d32' : (order.type === 'washing' || order.type === 'wash') ? '#1565c0' : '#e65100';
                      const statusLabel = order.status === 'active' ? 'Идэвхтэй' : order.status === 'completed' ? 'Дууссан' : 'Цуцлагдсан';
                      const statusColor = order.status === 'active' ? '#2BBFA0' : order.status === 'completed' ? '#999' : '#ff4d4f';
                      const date = new Date(order.createdAt);
                      const dateStr = date.toLocaleDateString('mn-MN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                      const timeStr = date.toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' });

                      return (
                        <div key={order._id} style={{
                          background: 'var(--card-bg)',
                          borderRadius: '12px',
                          padding: '16px',
                          boxShadow: 'var(--shadow)',
                          border: '1px solid var(--border)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{
                                background: typeBg, color: typeColor,
                                borderRadius: '6px', padding: '3px 8px',
                                fontSize: '12px', fontWeight: '600'
                              }}>{typeLabel}</span>
                              <span style={{ color: statusColor, fontSize: '12px', fontWeight: '600' }}>● {statusLabel}</span>
                            </div>
                            <span style={{ fontSize: '11px', color: '#bbb' }}>{dateStr} {timeStr}</span>
                          </div>

                          <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '4px', color: 'var(--text)' }}>{order.name}</div>
                          {order.loc && <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>{order.loc}</div>}

                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--text-muted)' }}>
                              {order.hour && <span>{order.hour} цаг</span>}
                              {order.vehicle?.plate && <span>{order.vehicle.plate}</span>}
                              <span style={{ color: '#aaa' }}>{order.orderId}</span>
                            </div>
                            <div style={{ fontWeight: '700', color: 'var(--primary)', fontSize: '16px' }}>
                              {order.price?.toLocaleString('mn-MN')}₮
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : activeSubpage === 'vehicles' ? (
              <div className="vehicles-wrap">
                <form onSubmit={handleAddVehicle} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                  <input type="text" placeholder="Загвар (Prius)" required style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    value={newVehicle.model} onChange={e => setNewVehicle({...newVehicle, model: e.target.value})} />
                  <input type="text" placeholder="Улсын дугаар" required style={{ width: '120px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                    value={newVehicle.plate} onChange={e => setNewVehicle({...newVehicle, plate: e.target.value})} />
                  <button type="submit" style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0 15px', borderRadius: '8px' }}>Нэмэх</button>
                </form>

                <div className="vehicles-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {vehicles.map(v => (
                    <div key={v._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '24px' }}>{v.emoji}</span>
                        <div>
                          <div style={{ fontWeight: 'bold', color: 'var(--text)' }}>{v.model}</div>
                          <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{v.plate}</div>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteVehicle(v._id)} style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '6px' }}>Устгах</button>
                    </div>
                  ))}
                  {vehicles.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>Машин бүртгүүлээгүй байна.</p>}
                </div>
              </div>
            ) : (
              <p style={{ textAlign: 'center', marginTop: '40px', color: 'var(--text-muted)' }}>
                Энэ хэсэг хөгжүүлэлтийн шатанд байна.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
