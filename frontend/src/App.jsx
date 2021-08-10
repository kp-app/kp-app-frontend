import { useState } from 'react'
import { ItemCard } from './components/ItemCard/ItemCard'
import './App.css'
import { AddButton } from './components/AddButton'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div className="items">
        <ItemCard />
      </div>
      <AddButton />
    </div>
  )
}

export default App
