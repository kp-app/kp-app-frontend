import { ItemCard } from './components/ItemCard/ItemCard'
import './App.css'
import { AddButton } from './components/AddButton'

function App() {

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
