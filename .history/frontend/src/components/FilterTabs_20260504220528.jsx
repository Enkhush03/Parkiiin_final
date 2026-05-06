export default function FilterTabs({ active, setActive }) {
  return (
    <div className="service-tabs">
      <button
        className={active === "wash" ? "active" : ""}
        onClick={() => setActive("wash")}
      >
        Угаалга
      </button>

      <button
        className={active === "repair" ? "active" : ""}
        onClick={() => setActive("repair")}
      >
        Засвар
      </button>
    </div>
  )
}