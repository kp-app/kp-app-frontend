import {ItemCard} from './components/ItemCard/ItemCard'
import './App.css'
import {CreateTableButton} from './components/SwitchToTableButton'
import {AddedItems} from './components/AddedItems/AddedItems'
import {Total} from './components/Total'
import {useSelector} from 'react-redux'
import {TableOutput} from './components/TableOutput/TableOutput'
import styled from "styled-components";
import {Header} from "./components/Header/Header";


const TRedWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TRedLogoPlaceholder = styled.div`
  background: url("https://www.rusprofile.ru/storage/logo_7ac096ff528a7d261babb131a5f7bf3c/500x500/9b1d88de97543124bd2d24aa82f97972.png");
`

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
        <div>
            <Header/>
            <div className="App">
                {isAuthenticated && <Items/>}
                {!isAuthenticated && <TRedWrapper><TRedLogoPlaceholder/></TRedWrapper>}
            </div>
        </div>
    )

}

export default App
