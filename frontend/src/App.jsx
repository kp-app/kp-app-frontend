import { ItemCard } from './components/ItemCard/ItemCard'
import './App.css'
import { CreateTableButton } from './components/CreateTableButton'
import { AddedItems } from './components/AddedItems/AddedItems'
import { FinalPrice } from './components/FinalPrice'

function App() {

  return (
    <div className="App">
      <div className="items">
        <ItemCard />
      </div>
      <CreateTableButton />
      <div className="added_items">
        <FinalPrice />
        <AddedItems />
      </div>
    </div>
  )
}

export default App
