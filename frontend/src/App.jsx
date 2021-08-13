import { ItemCard } from './components/ItemCard/ItemCard'
import './App.css'
import { CreateTableButton } from './components/SwitchToTableButton'
import { AddedItems } from './components/AddedItems/AddedItems'
import { Total } from './components/Total'
import { useSelector } from 'react-redux'
import { TableOutput } from './components/TableOutput/TableOutput'

const AddedCards = (props) => {
  return (
  <div className="added_items">
    <Total />
    <AddedItems />
  </div>
)}

function App() {
  const isCards = useSelector(state => state.products.tableView)


  return (
    <div className="App">
      <div className="items">
        <ItemCard />
      </div>
      <CreateTableButton />
      {!isCards && <AddedCards />}
      {isCards && <TableOutput />}
    </div>
  )
}

export default App
