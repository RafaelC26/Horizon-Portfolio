import { SplineSceneBasic } from '@/components/ui/demo'
import bgImage from './assets/fortress_wide_hq.png'
import './App.css'

function App() {
  return (
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
      
      {/* UI and Scene rendering */}
      <SplineSceneBasic />
    </div>
  )
}

export default App
