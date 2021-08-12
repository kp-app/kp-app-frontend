import { ItemCard } from './components/ItemCard/ItemCard'
import './App.css'
import { AddButton } from './components/AddButton'
import { AddedItems } from './components/AddedItems/AddedItems'
import { FinalPrice } from './components/FinalPrice'

function App() {

  return (
    <div className="App">
      <div className="items">
        <ItemCard />
      </div>
      <AddButton />
      <div className="added_items">
        <FinalPrice />
        <AddedItems />
      </div>
    </div>
  )
}

export default App
