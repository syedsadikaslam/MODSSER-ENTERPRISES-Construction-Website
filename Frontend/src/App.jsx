
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';

// Pages & Components
import Home from './pages/Home';
import About from './pages/About';
import ServiceDetail from './pages/ServiceDetail';
import ProjectDetail from './pages/ProjectDetail';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookingPage from './pages/BookingPage';
import Profile from './pages/Profile';
import AuthCallback from './pages/AuthCallback';
import VoiceflowWidget from './components/common/VoiceflowWidget';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-white">

        <AnimatePresence mode="wait">
          {loading ? (
            /* --- LOGO ANIMATION SCREEN --- */
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white"
            >
              <motion.img
                src="./img/logo.png" // Make sure logo.png is in your public folder
                alt="Logo"
                className="w-40 md:w-56"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.05, 1],
                  opacity: 1
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* Optional: Chota sa loading text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-gray-500 font-light tracking-widest uppercase text-xs"
              >
                Loading Excellence...
              </motion.p>
            </motion.div>
          ) : (
            /* --- ACTUAL WEBSITE CONTENT --- */
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services/:type" element={<ServiceDetail />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/book" element={<BookingPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
              </Routes>

              <VoiceflowWidget />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </AuthProvider>
  );
}

export default App;