import { Button, Form, Input } from "antd"
import { useState } from "react"
import { addItem } from "../../../app/productsSlice"



export const AddCustomItem = props => {
    const [inputOpen, toggleInput] = useState(false)
    const dispatch = props.dispatch
    const switchView = () => {
        toggleInput(prevState => !prevState)
    }
    return (
        <>
            {inputOpen ? <CustomItemForm switchView={switchView} dispatch={dispatch}/>  : <Button onClick={switchView}>Добавить товар</Button>}
        </>
    )
}

const CustomItemForm = props => {
    const dispatch = props.dispatch
    const [fullName, typeName] = useState("")
    const [pricing, typePrice] = useState(0)
    const [quantity, typeQuantity] = useState(0)

    const switchView = props.switchView
    const handleSubmit = (values) => {
        const product = {fullName, pricing: {pricelistCost: pricing}, quantity}
        console.log(product)
        dispatch(addItem(product))
        switchView()
    }
    return <Form
            autoComplete="off" 
            onFinish={handleSubmit}
            name="basic"
            labelCol={{
                span: 12
            }}
            wrapperCol={{
                span: 24
            }}
            >
        <Form.Item label="Название" name="fullName" rules={[
            {
                required: true,
                message: 'Название продукта не может быть пустым!',
            }
        ]}>
            <Input value={fullName} onChange={(e) => typeName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Количество" name="quantity" rules={
            [
                {
                    required: true,
                    pattern: /^\d+$/,
                    message: "Только число"
                }
            ]
        }>
            <Input value={quantity} onChange={(e) => {
                typeQuantity(Number(e.target.value))
            }} />
        </Form.Item>
        <Form.Item label="Цена за штуку" name="pricing" rules={
            [
                {
                    required: true,
                    pattern: /^\d+$/,
                    message: "Только число",
                }
            ]
        }>
            <Input value={pricing} onChange={(e) => {
                typePrice(Number(e.target.value))
            }} />
        </Form.Item>
        <Form.Item><Button type="primary" htmlType="submit">Подтвердить</Button><Button type="default" onClick={switchView}>Свернуть</Button></Form.Item>
    </Form>
}

// useState, open up a form when redacting, button will dispatch addItem() after validation, hide form, toggle back to button "Add item"