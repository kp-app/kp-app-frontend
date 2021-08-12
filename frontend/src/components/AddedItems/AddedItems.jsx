import { useSelector } from "react-redux"
import styled from "styled-components"
import { AddedItemCard } from "./AddedItemCard/AddedItemCard"

const ReversedDiv = styled.div`
    display: flex;
    flex-direction: column-reverse;
`

export const AddedItems = () => {
    const items = useSelector(state => state.products.addedProducts)
    return <ReversedDiv>
        {items ? items.map((item, index)=> <AddedItemCard item={item} key={index} />) : ""}
    </ReversedDiv>
}