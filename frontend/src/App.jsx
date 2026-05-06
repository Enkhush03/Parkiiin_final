import { BrowserRouter, Routes, Route } from "react-router-dom";
import Washing from "./pages/Washing";
import Repair from "./pages/Repair";
import Booking from "./pages/Booking";
import Success from "./pages/Success"

function App(){
  return  (<BrowserRouter>
      <Routes>
        <Route path="/" element={<Washing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/success" element={<Success />} />
        <Route path="/washing" element={<Washing />} />
        <Route path="/repair" element={<Repair />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;