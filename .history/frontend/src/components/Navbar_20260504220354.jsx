import { Link } from "lucide-router-dom"
export default function Navbar(){
    return(
        <nav className="top-nav">
            <div className="nav-logo">Parkiiin</div>

            <div className = "nav-links"></div>
        <Link className="nav-link" to="/">Нүүр</Link>
        <Link className="nav-link" to="/parking">Зогсоол</Link>
        <Link className="nav-link" to="/washing">Үйлчилгээ</Link>
        <Link className="nav-link" to="/tips">Зөвлөмж</Link>
        <Link className="nav-link" to="/profile">Профайл</Link>

        </nav>
    )
}