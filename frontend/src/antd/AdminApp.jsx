import {AuthedHeader} from "./AuthedLayout";
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
import {useState} from "react";

const AdminApp = () => {
    const [componentType, setComponentType] = useState('item');

    const onFormLayoutChange = ({creationType}) => {
        setComponentType(creationType);
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <AuthedHeader>
            <Row>
                <Col span={6}></Col>
                <Col span={12}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Админ-панель</Breadcrumb.Item>
                        <Breadcrumb.Item>Создать</Breadcrumb.Item>
                    </Breadcrumb>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        layout="horizontal"
                        initialValues={{
                            componentType: "item",
                        }}
                        onValuesChange={onFormLayoutChange}
                        size="default"
                        onFinish={onSubmit}
                    >
                        <Form.Item label="Что создаем" name="type">
                            <Radio.Group>
                                <Radio.Button value="item">Товар</Radio.Button>
                                <Radio.Button value="category">Категория</Radio.Button>
                                <Radio.Button value="subcategory">Подкатегория</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="Input" name="input">
                            <Input/>
                        </Form.Item>
                        <Form.Item label="Select" name="select">
                            <Select>
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="TreeSelect">
                            <TreeSelect
                                treeData={[
                                    {
                                        title: 'Light',
                                        value: 'light',
                                        children: [
                                            {
                                                title: 'Bamboo',
                                                value: 'bamboo',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="Cascader">
                            <Cascader
                                options={[
                                    {
                                        value: 'zhejiang',
                                        label: 'Zhejiang',
                                        children: [
                                            {
                                                value: 'hangzhou',
                                                label: 'Hangzhou',
                                            },
                                        ],
                                    },
                                ]}
                            />
                        </Form.Item>
                        <Form.Item label="DatePicker">
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item label="InputNumber">
                            <InputNumber/>
                        </Form.Item>
                        <Form.Item label="Switch" valuePropName="checked">
                            <Switch/>
                        </Form.Item>
                        <Form.Item label="Button">
                            <Button htmlType="submit">Button</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}></Col>
            </Row>
        </AuthedHeader>
    )
}

export default AdminApp