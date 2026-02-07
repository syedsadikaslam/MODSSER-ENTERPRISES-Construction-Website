import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ServiceDetail from './pages/ServiceDetail';
import VoiceflowWidget from './components/common/VoiceflowWidget';

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/:type" element={<ServiceDetail />} />
      </Routes>
      <VoiceflowWidget />
    </>
  );
}

export default App;