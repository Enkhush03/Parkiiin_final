export default function SearchBar({ onSearch }) {
  return (
    <div className="search-bar">
      <input
        placeholder="Хайх..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  )
}