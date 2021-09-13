import { useDispatch, useSelector } from "react-redux"
import {useState} from "react"
import styled from "styled-components"
import { changePrice, addItem, removeItem, updateItemPrice } from "../../../app/productsSlice"
import { Button } from "antd"
import {EditOutlined, CheckOutlined, PlusCircleOutlined, MinusCircleOutlined} from "@ant-design/icons"
import { AddCustomItem } from "./AddCustomItem"

const TableContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Table = styled.table`
    border: 1px solid black;
    width: 100%;
`

const PriceCell = props => {
    let payload = props.product
    const token = props.token
    const dispatch = props.dispatch
    const [isRedactable, toggleRedact] = useState(false)
    
    const isValid = (text) => {
        return text === "" || /^\d+$/.test(text)
    }
    const onChange = (e) => {
        isValid(e.target.value) ? dispatch(changePrice([props.product, Number(e.target.value)])) : console.log("Fuck-ass data from input")
    }
    
    const onClick = () => {
        isRedactable ? payload = {...payload, pricing: {...payload.pricing, pricelistCost: props.product.pricing.pricelistCost}} : null
        isRedactable ? dispatch(updateItemPrice({token: token, payload: payload})) : null
        toggleRedact(prevState => !prevState)
    }
    return (
        <>
            {!isRedactable ? <td>{props.product.pricing.pricelistCost}€<Button icon={<EditOutlined/>} onClick={onClick}></Button></td> : 
            <td>
                €
                <input value={props.product.pricing.pricelistCost} onChange={onChange}/>
                <Button icon={<CheckOutlined />} onClick={onClick}></Button>
            </td>}
        </>
    )
}

const QuantityCell = props => {
    const dispatch = props.dispatch
    const product = props.product
    const handleIncr = () => {
        dispatch(addItem(product))
    }
    const handleDecr = () => {
        dispatch(removeItem(product))
    }

    return <td style={{width: 150}}>
        <Button icon={<MinusCircleOutlined />} onClick={handleDecr}/>
            {product.quantity}
        <Button icon={<PlusCircleOutlined />} onClick={handleIncr}/></td>
}

export const CartLayout = props => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.products.addedProducts)
    const token = useSelector(state => state.auth.token)
    
    // TODO add/remove with +/- buttons inside of quantity's td [x]
    // TODO add cost change with input (need state) [x]
    // TODO add add product button
    return (
        <TableContainer>
            <Table>
                <thead>
                    <tr style={{width: 420}}>
                        <td>Название</td>
                        <td>Количество</td>
                        <td>Цена за шт по прайсу</td>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((product) => {
                        return (
                            <tr key={product._id}>
                                <td style={{width: 200}}>{product.fullName}</td>
                                <QuantityCell dispatch={dispatch} product={product} token={token}></QuantityCell>
                                <PriceCell dispatch={dispatch} product={product} token={token} style={{width: 200}}/>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <AddCustomItem dispatch={dispatch} token={token} />
        </TableContainer>
    )
}