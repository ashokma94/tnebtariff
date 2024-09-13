import { useState } from 'react'
import FrontPanel from './components/FrontPanel'

function App() {
  const [count, setCount] = useState(0)

  return (
    <FrontPanel />
  )
}

export default App
