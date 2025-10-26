import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Variant1 from './pages/Variant1'
import Variant2 from './pages/Variant2'
import Variant3 from './pages/Variant3'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/variant-1" element={<Variant1 />} />
      <Route path="/variant-2" element={<Variant2 />} />
      <Route path="/variant-3" element={<Variant3 />} />
    </Routes>
  )
}

export default App
