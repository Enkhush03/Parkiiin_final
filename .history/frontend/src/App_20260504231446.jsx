import { BrowserRouter, Routes, Route } from "react-router-dom";
import Washing from "./pages/Washing";
import Repair from "./pages/Repair";
function App(){
  return  (<BrowserRouter>
      <Routes>
        <Route path="/" element={<Washing />} />
        <Route path="/repair" element={<Repair />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;