import s from './TipCard.module.css'

/**
 * TIPS_ARTICLES массиваас нэг элементийг props-оор авна.
 * data-г src/data/tipsData.js-аас import хийж дамжуулна.
 */
export default function TipCard({ id, tag, title, desc, gradient }) {
  return (
    <div className={s.card} onClick={() => alert(`"${title}" нийтлэл удахгүй`)}>
      <div className={s.img} style={{ background: gradient }}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      </div>
      <div className={s.body}>
        <div className={s.tag}>{tag}</div>
        <div className={s.title}>{title}</div>
        <div className={s.desc}>{desc}</div>
        <div className={s.read}>Унших →</div>
      </div>
    </div>
  )
}
