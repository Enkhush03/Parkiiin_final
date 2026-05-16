import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const CARDS = [
  { path: '/admin/parking',  icon: '🅿️', title: 'Зогсоол удирдах',    desc: 'Зогсоол нэмэх, устгах, GPS тохируулах' },
  { path: '/admin/services', icon: '🔧', title: 'Үйлчилгээ удирдах',   desc: 'Угаалга болон засварын газар нэмэх, устгах' },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '90px 20px 60px' }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1e293b', marginBottom: 8 }}><span>⚙️</span> Admin панел</h2>
        <p style={{ color: '#64748b', marginBottom: 32 }}>Удирдах хэсгийг сонгоно уу</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {CARDS.map(c => (
            <div key={c.path} onClick={() => navigate(c.path)}
              style={{ background: '#fff', borderRadius: 18, padding: 28, boxShadow: '0 2px 20px rgba(0,0,0,0.07)', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.07)'; }}
            >
              <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>{c.title}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
