import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Store from './pages/Store'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </div>
  );
}

export default App;
