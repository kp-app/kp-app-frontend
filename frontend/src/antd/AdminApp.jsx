import {
    Col, Form, Row, Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Input,
    Button, Breadcrumb
} from "antd";
import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, createSubcategory, loadCategories } from "../app/itemCardSlice";

const AdminApp = () => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const categories = useSelector(state => state.itemCard.categories)
    const [componentType, setComponentType] = useState('category');
    const [category, setCategory] = useState('')
    const [subcategoryText, typeSubcategory] = useState('')
    const [categoryText, typeCategory] = useState('')
    const [form] = Form.useForm()

    useEffect(() => {
        dispatch(loadCategories({token}))
    }, [categories])

    

    const onFormLayoutChange = ({creationType}) => {
        setComponentType(creationType)
    }

    const onSubmit = (values) => {
        console.log(values)
        if (componentType === 'category') {
            dispatch(createCategory({token, payload: {name: categoryText}}))
            typeCategory('')
        } else if (componentType === 'subcategory') {
            dispatch(createSubcategory({token, params: {categoryId: values.categorySelect}, payload: {name: subcategoryText}}))
            typeSubcategory('')
        }
        form.resetFields()
    }

    return (
        <Row>
            <Col span={6}></Col>
            <Col span={12}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>Админ-панель</Breadcrumb.Item>
                    <Breadcrumb.Item>Создать</Breadcrumb.Item>
                </Breadcrumb>
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    layout="horizontal"
                    initialValues={{
                        componentType: "category",
                    }}
                    size="default"
                    onFinish={onSubmit}
                >
                    <Form.Item label="Что создаем" name="type">
                        <Radio.Group onChange={e => setComponentType(e.target.value)}>
                            <Radio.Button value="category">Категорию</Radio.Button>
                            <Radio.Button value="subcategory">Подкатегорию</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    {componentType === "category" ? <Form.Item label="Имя категории" name="category">
                        <Input value={categoryText} onChange={e => {typeCategory(e.target.value)}}/>
                    </Form.Item> : <Form.Item label="Имя подкатегории" name="subcategory">
                        <Input value={subcategoryText} onChange={e => {typeSubcategory(e.target.value)}}/>
                    </Form.Item>
                    }
                    {componentType === "subcategory" && <Form.Item label="Родительская категория" name="categorySelect">
                        <Select onSelect={(e) => {setCategory(e)}}>
                            {categories.map(category => <Select.Option value={category._id} key={category._id}>
                                                            {category.name}
                                                        </Select.Option>)}
                        </Select>
                    </Form.Item>}
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                    }}>
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
            <Col span={6}></Col>
        </Row>
    )
}

export default AdminApp