import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { loadItemsBySubcategory } from "../../../app/itemCardSlice"
import {Card} from 'antd'
import { AddButton } from "./AddToCartButton"

export const ItemsBySubcat = (props) => {
    const {token, subcategory} = props
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadItemsBySubcategory({token: token, subcategory: subcategory}))
    }, [])
    let items = useSelector(state => state.itemCard.items).filter(itemGroup => itemGroup.subcategory.name === subcategory.name)
    items.length > 0 ? items = items[0].items : null
    return (
        <div style={{
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 5fr))"
            }}>
                {items.map(item => <Card title={null} bordered={true}>
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}} key={item._id}>
                        <div>{item.fullName}</div>
                            <AddButton item={item}/>
                        <div>Стоимость {item.pricing.pricelistCost !== 0 ? `€ ${item.pricing.pricelistCost}` : "не указана"}</div>
                    </div>
                </Card>)}
        </div>
    )
}