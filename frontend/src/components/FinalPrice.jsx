import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { PriceBar } from './ItemCard/PriceBar/PriceBar'

const PriceDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: var(--card-width);
    margin: auto;
`

export const FinalPrice = () => {
    
    let prices = useSelector(state => state.products.priceTable.prices)
    let costs = useSelector(state => state.products.priceTable.costs)
    

    if (prices.length > 1) {
        const totalCost = costs.reduce((acc, cur) => {    
            return acc + cur
        })

        const totalPrice = prices.reduce((acc, cur) => {
            return acc + cur
        })

        return (
            <PriceDiv className="">
                <h1>Итого</h1>
                <PriceBar cost={totalCost} price={totalPrice} />
            </PriceDiv>
        )
    } else if (prices.length === 1) {
        return (
            <PriceDiv className="">
                <h1>Итого</h1>
                <PriceBar cost={costs[0]} price={prices[0]} />
            </PriceDiv>
        )
    } else {
        return null
    }
}