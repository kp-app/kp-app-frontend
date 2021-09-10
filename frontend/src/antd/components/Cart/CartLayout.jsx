import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import {useState} from "react"
import styled from "styled-components"
import { changePrice, addItem, removeItem } from "../../../app/productsSlice"
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
    const dispatch = props.dispatch
    const isValid = (text) => {
        return text === "" || /^\d+$/.test(text)
    }
    const onChange = (e) => {
        isValid(e.target.value) ? dispatch(changePrice([props.product, Number(e.target.value)])) : console.log("Fuck-ass data from input")
    }
    const [isRedactable, toggleRedact] = useState(false)
    const onClick = () => {
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
    
    // TODO add/remove with +/- buttons inside of quantity's td [x]
    // TODO add cost change with input (need state) [x]
    // TODO add add product button
    return (
        <TableContainer>
            <Table>
                <th style={{width: 420}}>
                    <td>Название</td>
                    <td>Количество</td>
                    <td>Цена за шт по прайсу</td>
                </th>
                {cartItems.map((product) => {
                    return (
                        <tr>
                            <td style={{width: 200}}>{product.fullName}</td>
                            <QuantityCell dispatch={dispatch} product={product}></QuantityCell>
                            <PriceCell dispatch={dispatch} product={product} style={{width: 200}}/>
                        </tr>
                    )
                })}
            </Table>
            <AddCustomItem dispatch={dispatch} />
        </TableContainer>
    )
}