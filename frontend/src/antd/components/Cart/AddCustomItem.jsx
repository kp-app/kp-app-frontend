import { Button, Form, Input, Select } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { clearUpToCategories, loadSubcategories } from "../../../app/itemCardSlice"
import { addItem, createItem } from "../../../app/productsSlice"

const {Option} = Select

export const AddCustomItem = props => {
    const [inputOpen, toggleInput] = useState(false)
    const dispatch = props.dispatch
    const token = props.token
    const switchView = () => {
        toggleInput(prevState => !prevState)
    }
    return (
        <>
            {inputOpen ? <CustomItemForm switchView={switchView} dispatch={dispatch} token={token}/>  : <Button onClick={switchView}>Добавить товар</Button>}
        </>
    )
}

const CustomItemForm = props => {
    const dispatch = props.dispatch
    const token = props.token
    const categories = useSelector(state => state.itemCard.categories)
    const [fullName, typeName] = useState("")
    const [pricing, typePrice] = useState(0)
    const [quantity, typeQuantity] = useState(0)
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")

    useEffect(() => {
        category ? dispatch(loadSubcategories({token, categoryId: category})) : null
        return () => {
            dispatch(clearUpToCategories())
        }
    }, [category])

    const subcategories = useSelector(state => state.itemCard.subcategories)

    const switchView = props.switchView
    const handleSubmit = (values) => {
        console.log(values)
        const product = {fullName, pricing: {pricelistCost: pricing}, quantity}
        dispatch(addItem(product))
        // categories/subcats - use selects, not input. With an option to create [x]
        // strip off quantity from products [x]
        const productDto = {...product}
        delete productDto.quantity
        dispatch(createItem({token, params: {categoryId: category, subcategoryId: subcategory}, payload: productDto}))
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
        <Form.Item label="Категория" name="category" rules={
            [
                {
                    required: true,
                    message: "Выберите категорию!"
                }
            ]
        }>
            <Select onSelect={(catId) => {setCategory(catId)}}>{categories.map(category => <Option value={category._id} key={category._id}>{category.name}</Option>)}</Select>
        </Form.Item>
        <Form.Item label="Подкатегория" name="subcategory">
            <Select onSelect={(subcatId) => {setSubcategory(subcatId)}}>{subcategories.map(subcategory => <Option value={subcategory._id} key={subcategory._id}>{subcategory.name}</Option>)}</Select>
        </Form.Item>
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
