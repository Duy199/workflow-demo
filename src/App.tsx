import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WorkflowBuilder from './pages/WorkflowBuilder'

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<WorkflowBuilder />} />
    </Routes>
  )
}

export default App
