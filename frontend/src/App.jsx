import {ItemCard} from './components/ItemCard/ItemCard'
import './App.css'
import {CreateTableButton} from './components/SwitchToTableButton'
import {AddedItems} from './components/AddedItems/AddedItems'
import {Total} from './components/Total'
import {useSelector} from 'react-redux'
import {TableOutput} from './components/TableOutput/TableOutput'
import styled from "styled-components";


const Items = (props) => {
    const isCards = useSelector(state => state.products.tableView)
    return (
        <div>
            <div className="items">
                <ItemCard/>
            </div>
            <CreateTableButton/>
            {!isCards && <AddedCards/>}
            {isCards && <TableOutput/>}
        </div>
    )
}

const TRedWrapper = styled.div``

const AddedCards = (props) => {
    return (
        <div className="added_items">
            <Total/>
            <AddedItems/>
        </div>
    )
}

function App() {
    const isAuthenticated = useSelector(state => state.auth.token)


    return (
        <div className="App">
            {isAuthenticated && <Items/>}
            {!isAuthenticated && <TRedWrapper/>}
        </div>
    )

}

export default App
