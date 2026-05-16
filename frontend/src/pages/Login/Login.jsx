import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from './Login.module.css'
import { apiUrl } from '../../services/api'

export default function Login() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('login')   
  const [showPass, setShowPass] = useState(false)
  const [form, setForm]  = useState({ email: '', password: '', name: '' })
  const [loading, setLoading]   = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = tab === 'login' ? '/auth/login' : '/auth/register';

    try {
      const response = await fetch(apiUrl(endpoint), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        // token bolon hereglegchiin medeellig hamtad ni hadgalna
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/profile');
      } else {
        alert(data.message || 'Алдаа гарлаа');
      }
    } catch (error) {
      alert('Сэрвэртэй холбогдож чадсангүй');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={s.wrap}>
      <div className={s.card}>
        <div className={s.logo}>Parkiiin</div>
        <p className={s.sub}>
          {tab === 'login' ? 'Тавтай морил!' : 'Шинэ бүртгэл үүсгэх'}
        </p>

        {/* Tab switcher */}
        <div className={s.tabSw}>
          <button className={`${s.tabBtn} ${tab === 'login'  ? s.active : ''}`} onClick={() => setTab('login')}>Нэвтрэх</button>
          <button className={`${s.tabBtn} ${tab === 'signup' ? s.active : ''}`} onClick={() => setTab('signup')}>Бүртгэл</button>
        </div>

        <form onSubmit={handleSubmit}>
          {tab === 'signup' && (
            <div className={s.formG}>
              <label className={s.formL} htmlFor="name">Нэр</label>
              <input id="name" className={s.formI} type="text" placeholder="Таны нэр" value={form.name} onChange={set('name')} required />
            </div>
          )}

          <div className={s.formG}>
            <label className={s.formL} htmlFor="email">И-мэйл</label>
            <input id="email" className={s.formI} type="email" placeholder="email@example.com" value={form.email} onChange={set('email')} required />
          </div>

          <div className={s.formG}>
            <label className={s.formL} htmlFor="password">Нууц үг</label>
            <div className={s.eyeWrap}>
              <input
                id="password"
                className={s.formI}
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={set('password')}
                minLength={6}
                required
              />
              <button type="button" className={s.eyeBtn} onClick={() => setShowPass(v => !v)} aria-label="Нууц үг харах">
                <svg viewBox="0 0 24 24">
                  {showPass
                    ? <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                    : <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                  }
                </svg>
              </button>
            </div>
          </div>

          {tab === 'login' && (
            <Link to="/forgot" className={s.forgot}>Нууц үгээ мартсан уу?</Link>
          )}

          <button type="submit" className={s.btnFull} disabled={loading}>
            {loading ? 'Түр хүлээнэ үү...' : tab === 'login' ? 'Нэвтрэх' : 'Бүртгэл үүсгэх'}
          </button>
        </form>

        <div className={s.divider}><span>эсвэл</span></div>

        <div className={s.socialBtns}>
          <button className={s.socialBtn}>Google</button>
          <button className={s.socialBtn}>Apple ID</button>
        </div>
      </div>
    </div>
  )
}
