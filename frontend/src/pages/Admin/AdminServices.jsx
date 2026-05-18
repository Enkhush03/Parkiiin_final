import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import s from './AdminParking.module.css';
import { apiUrl, authFetch } from '../../services/api';

const EMPTY_FORM = {
  serviceId: '', name: '', type: 'washing', loc: '', price: '',
  rating: '5.0', distance: '', time: '', tag: 'Нээлттэй',
  emoji: '🚿', gradient: 'linear-gradient(135deg,#1a2e2a,#2BBFA0)',
  top: '', left: ''
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [tab, setTab]           = useState('washing');
  const [form, setForm]         = useState(EMPTY_FORM);
  const [saving, setSaving]     = useState(false);
  const [toast, setToast]       = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadServices = () => {
    fetch(apiUrl('/services'))
      .then(r => r.json())
      .then(data => setServices(data.services || []))
      .catch(() => showToast('Өгөгдөл татахад алдаа гарлаа.', 'error'));
  };

  useEffect(() => { loadServices(); }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTabChange = (t) => {
    setTab(t);
    setForm({
      ...EMPTY_FORM,
      type: t,
      emoji: t === 'washing' ? '🚿' : '🔧',
      gradient: t === 'washing'
        ? 'linear-gradient(135deg,#1a2e2a,#2BBFA0)'
        : 'linear-gradient(135deg,#2b1a1a,#ff6b6b)'
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await authFetch(apiUrl('/services'), {
        method: 'POST',
        body: JSON.stringify({ ...form, rating: Number(form.rating) })
      });
      if (res.ok) {
        showToast('Үйлчилгээ амжилттай нэмэгдлээ!');
        setForm({ ...EMPTY_FORM, type: tab, emoji: tab === 'washing' ? '🚿' : '🔧' });
        loadServices();
      } else {
        const err = await res.json();
        showToast('Алдаа: ' + (err.error || err.message), 'error');
      }
    } catch { showToast('Сэрвэртэй холбогдож чадсангүй.', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (serviceId) => {
    if (!window.confirm('Энэ үйлчилгээг устгах уу?')) return;
    try {
      const res = await authFetch(apiUrl(`/services/${serviceId}`), { method: 'DELETE' });
      if (res.ok) { loadServices(); showToast('Устгагдлаа.'); }
      else showToast('Устгахад алдаа гарлаа.', 'error');
    } catch { showToast('Сэрвэртэй холбогдож чадсангүй.', 'error'); }
  };

  const filtered = services.filter(s => s.type === tab);

  return (
    <>
      <Navbar />

      {toast && (
        <div className={`${s.toast} ${toast.type === 'error' ? s.toastError : s.toastSuccess}`}>
          {toast.msg}
        </div>
      )}

      <div className={s.adminContainer}>
        <div className={s.pageHeader}>
          <h2 className={s.pageTitle}>Үйлчилгээ удирдах</h2>
          <span className={s.badge}>{services.length} үйлчилгээ</span>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {[{ key: 'washing', label: 'Угаалга' }, { key: 'repair', label: 'Засвар' }].map(t => (
            <button key={t.key} onClick={() => handleTabChange(t.key)} style={{
              padding: '8px 20px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: 14,
              background: tab === t.key ? 'var(--primary)' : 'var(--primary-light)',
              color: tab === t.key ? '#fff' : 'var(--primary)'
            }}>
              {t.label}
            </button>
          ))}
        </div>

        <div className={s.grid}>
          {/* Form */}
          <div className={s.formCard}>
            <h3 className={s.cardTitle}>Шинэ {tab === 'washing' ? 'угаалга' : 'засвар'} нэмэх</h3>
            <form onSubmit={handleAdd} className={s.form}>
              <div className={s.fieldGroup}>
                <label className={s.label}>ID <span className={s.req}>*</span></label>
                <input className={s.input} name="serviceId" placeholder="cleanmax-2" value={form.serviceId} onChange={handleChange} required />
              </div>
              <div className={s.fieldGroup}>
                <label className={s.label}>Нэр <span className={s.req}>*</span></label>
                <input className={s.input} name="name" placeholder="Үйлчилгээний нэр" value={form.name} onChange={handleChange} required />
              </div>
              <div className={s.fieldGroup}>
                <label className={s.label}>Хаяг <span className={s.req}>*</span></label>
                <input className={s.input} name="loc" placeholder="Дүүрэг, км" value={form.loc} onChange={handleChange} required />
              </div>
              <div className={s.fieldRow}>
                <div className={s.fieldGroup}>
                  <label className={s.label}>Үнэ <span className={s.req}>*</span></label>
                  <input className={s.input} name="price" placeholder="25,000₮" value={form.price} onChange={handleChange} required />
                </div>
                <div className={s.fieldGroup}>
                  <label className={s.label}>Үнэлгээ</label>
                  <input className={s.input} name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} />
                </div>
              </div>
              <div className={s.fieldRow}>
                <div className={s.fieldGroup}>
                  <label className={s.label}>Зай</label>
                  <input className={s.input} name="distance" placeholder="1.2км" value={form.distance} onChange={handleChange} />
                </div>
                <div className={s.fieldGroup}>
                  <label className={s.label}>Хугацаа</label>
                  <input className={s.input} name="time" placeholder="25-35 мин" value={form.time} onChange={handleChange} />
                </div>
              </div>
              <button type="submit" className={s.submitBtn} disabled={saving}>
                {saving ? 'Хадгалж байна...' : 'Нэмэх'}
              </button>
            </form>
          </div>

          {/* List */}
          <div className={s.listCard}>
            <h3 className={s.cardTitle}>
              {tab === 'washing' ? 'Угаалгын газрууд' : 'Засварын газрууд'} ({filtered.length})
            </h3>
            <div className={s.spotList}>
              {filtered.map(svc => (
                <div key={svc.serviceId} className={s.spotItem}>
                  <div className={s.spotEmoji} style={{ background: svc.gradient }}>
                    {svc.emoji}
                  </div>
                  <div className={s.spotInfo}>
                    <strong className={s.spotName}>{svc.name}</strong>
                    <p className={s.spotLoc}>{svc.loc}</p>
                    <div className={s.spotMeta}>
                      <span className={s.metaChip}>{svc.price}</span>
                      {svc.distance && <span className={s.metaChip}>{svc.distance}</span>}
                      {svc.rating && <span className={s.metaChip}>{svc.rating}</span>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(svc.serviceId)} className={s.deleteBtn}>Устгах</button>
                </div>
              ))}
              {filtered.length === 0 && <p className={s.empty}>Үйлчилгээ байхгүй байна.</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
