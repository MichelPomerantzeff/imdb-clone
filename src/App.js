import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import './App.css'

import { HashRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
      <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>

            <Routes>
                <Route path='/watchlist' element={<Watchlist/>}/>
            </Routes>
        </Router>
  );
}

export default App;
