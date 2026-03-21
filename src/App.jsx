import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SplineSceneBasic } from '@/components/ui/demo'
import { ProjectDetails } from '@/components/ui/project-details'
import { ShaderAnimation } from '@/components/ui/shader-lines'
import './App.css'
import { useState } from 'react'

function App() {
  const [showShader, setShowShader] = useState(false);

  // Detecta cuando el usuario llega al final del grid
  // Aumenta el umbral para activar ShaderAnimation más tarde
  const handleScroll = () => {
    const grid = document.getElementById('main-grid');
    if (!grid) return;
    const gridRect = grid.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // Cambia el umbral de 50px a 300px para retrasar la animación
    if (gridRect.bottom < windowHeight + 300) {
      setShowShader(true);
    } else {
      setShowShader(false);
    }
  };

  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll);
  }

  return (
    <Router basename="/Horizon-Portfolio">
      <div className="relative w-full min-h-screen bg-black">
        {/* Fondo negro absoluto */}
        <div className="fixed inset-0 w-full h-full bg-black z-0" />
        {/* Dark gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 z-0" />
        {/* Routes rendering */}
        <Routes>
          <Route path="/" element={<SplineSceneBasic />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
        {/* Grid de proyectos */}
        <section id="main-grid" className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* ...grid content... */}
        </section>
        {/* ShaderAnimation removido */}
      </div>
    </Router>
  )
}

export default App
