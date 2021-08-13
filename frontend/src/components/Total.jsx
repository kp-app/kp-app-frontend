import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { PriceBar } from './ItemCard/PriceBar/PriceBar'

const PriceDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: var(--card-width);
    margin: auto;
`

export const Total = () => {
    
    let products = useSelector(state => state.products.addedProducts)    

    if (products.length > 1) {
        const totalCost = products.reduce((acc, cur) => {    
            return acc += cur.cost*cur.quantity
        }, 0)

        const totalPrice = products.reduce((acc, cur) => {
            return acc += cur.cost*cur.quantity
        }, 0)

        return (
            <PriceDiv className="">
                <h1>Итого</h1>
                <PriceBar cost={totalCost} price={totalPrice} quantity={1} />
            </PriceDiv>
        )
    } else if (products.length === 1) {
        return (
            <PriceDiv className="">
                <h1>Итого</h1>
                <PriceBar cost={products[0].cost} price={products[0].price} quantity={products[0].quantity} />
            </PriceDiv>
        )
    } else {
        return null
    }

}