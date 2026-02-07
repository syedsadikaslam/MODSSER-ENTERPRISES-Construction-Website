import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ServiceDetail from './pages/ServiceDetail';
import ProjectDetail from './pages/ProjectDetail';
import VoiceflowWidget from './components/common/VoiceflowWidget';

function App() {
  return (
    /* overflow-hidden class yaha extra safety deti hai */
    <div className="min-h-screen w-full overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services/:type" element={<ServiceDetail />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
      <VoiceflowWidget />
    </div>
  );
}

export default App;