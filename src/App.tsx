import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="text-blue-400" size={32} />
            <span className="text-xl font-bold text-white">HookLogic</span>
          </Link>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
          <div className="hidden md:flex space-x-8">
            {[{ path: '/', label: 'Home' }, { path: '/services', label: 'Services' }, { path: '/about', label: 'About' }, { path: '/team', label: 'Team' }, { path: '/contact', label: 'Contact' }].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`text-sm uppercase tracking-wider transition-colors ${location.pathname === path ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden md:hidden"
        >
          <div className="flex flex-col space-y-4 p-4 bg-slate-900">
            {[{ path: '/', label: 'Home' }, { path: '/services', label: 'Services' }, { path: '/about', label: 'About' }, { path: '/team', label: 'Team' }, { path: '/contact', label: 'Contact' }].map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`block text-center text-sm uppercase tracking-wider transition-colors ${location.pathname === path ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
        <Navigation />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
