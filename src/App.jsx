import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SplineSceneBasic } from '@/components/ui/demo'
import { ProjectDetails } from '@/components/ui/project-details'
import bgImage from './assets/fortress_wide_hq.png'
import './App.css'

function App() {
  return (
    <Router basename="/Horizon-Portfolio">
      <div className="relative w-full min-h-screen bg-[#020617]">
        {/* Background Image very dark and desaturated */}
        <div 
          className="fixed inset-0 w-full h-full opacity-25 mix-blend-luminosity"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Dark gradient overlay to blend the bottom for the robot */}
        <div className="fixed inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90 z-0" />
        
        {/* Routes rendering */}
        <Routes>
          <Route path="/" element={<SplineSceneBasic />} />
          <Route path="/project/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
