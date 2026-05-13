import { useState, useEffect, useMemo } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import TipCard from '../../components/TipCard/TipCard'
import { userService } from '../../services/userService'

import s from './Tips.module.css'

const CATS = [
  { key: 'all',    label: 'Бүгд' },
  { key: 'safety', label: 'Аюулгүй байдал' },
  { key: 'signs',  label: 'Тэмдэг' },
  { key: 'eco',    label: 'Эко' },
  { key: 'night',  label: 'Шөнийн' },
]

export default function Tips() {
  const [tab,    setTab]    = useState('article')
  const [cat,    setCat]    = useState('all')
  const [query,  setQuery]  = useState('')
  const [apiData, setApiData] = useState({ TipsArticles: [], TipsVideos: [] })

  useEffect(() => {
    userService.getTips()
      .then(data => {
        setApiData(data)
      })
      .catch(err => console.error("Error loading tips:", err))
  }, [])

  // Нийтлэлийн шүүлт — useMemo ашиглан
  const articles = useMemo(() =>
    apiData.TipsArticles
      .filter(a => cat === 'all' || a.cat === cat)
      .filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.desc.toLowerCase().includes(query.toLowerCase())
      ),
    [apiData.TipsArticles, cat, query]
  )

  // Видеоны шүүлт
  const videos = useMemo(() =>
    apiData.TipsVideos.filter(v =>
      !v.featured && v.label.toLowerCase().includes(query.toLowerCase())
    ),
    [apiData.TipsVideos, query]
  )
  const featured = apiData.TipsVideos.find(v => v.featured)

  return (
    <>
      <Navbar />

      <div className="page-header" style={{ paddingTop: '64px' }}>
        <div className="page-header-inner">
          <h1>Зөвлөмжүүд</h1>
          <p>Жолооч нарт зориулсан хэрэгтэй нийтлэл, бичлэгүүд</p>
        </div>
      </div>

      <main className="tips-content" style={{ paddingBottom: '100px', maxWidth: '800px', margin: '0 auto', padding: '24px' }}>
        
        {/* ── Search ─────────────────────────────────────── */}
        <div className="search-bar" style={{ marginBottom: '24px' }} role="search">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input type="text" placeholder="Нийтлэл, зөвлөмж хайх..." value={query} onChange={e => setQuery(e.target.value)}
            autoComplete="off" aria-label="Зөвлөмж хайх" />
        </div>

        {/* ── Tabs ───────────────────────────────────────── */}
        <div className="service-tabs" style={{ marginBottom: '24px' }} role="tablist">
          <button className={`service-tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')} role="tab" aria-selected={tab === 'all'}>Бүгд</button>
          <button className={`service-tab ${tab === 'article' ? 'active' : ''}`} onClick={() => setTab('article')} role="tab" aria-selected={tab === 'article'}>Нийтлэл</button>
          <button className={`service-tab ${tab === 'video' ? 'active' : ''}`} onClick={() => setTab('video')} role="tab" aria-selected={tab === 'video'}>Бичлэг</button>
        </div>

          {/* Articles panel */}
          {tab === 'article' && (
            <>
              {/* Category pills */}
              <div className={s.cats} role="group" aria-label="Ангилал">
                {CATS.map(({ key, label }) => (
                  <button
                    key={key}
                    className={`${s.cat} ${cat === key ? s.active : ''}`}
                    onClick={() => setCat(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className={s.sectionRow}>
                <h3>Онцлох нийтлэлүүд</h3>
                <a href="#">Бүгдийг үзэх →</a>
              </div>

              {/* TIPS_ARTICLES-г .map() ашиглан рендер */}
              {articles.map(article => (
                <TipCard key={article.id} {...article} />
              ))}
            </>
          )}

          {/* Videos panel */}
          {tab === 'video' && (
            <>
              <div className={s.sectionRow}>
                <h3>Сүүлийн үеийн видео</h3>
                <a href="#">Бүгдийг үзэх →</a>
              </div>

              {/* TIPS_VIDEOS-г .map() ашиглан рендер */}
              <div className={s.videoRow} role="list">
                {videos.map(v => (
                  <div
                    key={v.id}
                    className={s.videoThumb}
                    style={{ background: v.gradient }}
                    role="listitem"
                    tabIndex={0}
                    onClick={() => alert(`Видео: ${v.label}`)}
                    aria-label={v.label}
                  >
                    <div className={s.playBtn}>▶</div>
                    <div className={s.duration}>{v.duration}</div>
                    <div className={s.videoLabel}>{v.label}</div>
                  </div>
                ))}
              </div>

              {featured && (
                <>
                  <div className={s.sectionRow}><h3>Онцлох видео</h3></div>
                  <div
                    className={`${s.videoThumb} ${s.videoFeatured}`}
                    style={{ background: featured.gradient }}
                    tabIndex={0}
                    onClick={() => alert(`Видео: ${featured.label}`)}
                    aria-label={featured.label}
                  >
                    <div className={s.playBtn} style={{ fontSize: 28 }}>▶</div>
                    <div className={s.duration} style={{ fontSize: 13 }}>{featured.duration}</div>
                    <div className={s.videoLabel} style={{ fontSize: 14, fontWeight: 700 }}>{featured.label}</div>
                  </div>
                </>
              )}
            </>
          )}
      </main>
    </>
  )
}
