import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Watched from "./pages/Watched";
import Login from "./pages/Login";
import Register from "./pages/Register";
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

            <Routes>
                <Route path='/watched' element={<Watched/>}/>
            </Routes>
            
            <Routes>
                <Route path='/login' element={<Login/>}/>
            </Routes>
            
            <Routes>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </Router>
  );
}

export default App;
