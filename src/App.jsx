import Home from './pages/home'
import GamePage from './pages/gamePage'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </Router>
  )
}

export default App
