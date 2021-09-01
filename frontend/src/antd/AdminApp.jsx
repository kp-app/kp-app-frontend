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
    Button
} from "antd";
import {useState} from "react";

const AdminApp = () => {
    const [componentSize, setComponentSize] = useState('default');

    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <AuthedHeader>
            <Row>
                <Col span={6}></Col>
                <Col span={12}>
                    <Form
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        layout="horizontal"
                        initialValues={{
                            size: componentSize,
                        }}
                        onValuesChange={onFormLayoutChange}
                        size={componentSize}
                        onFinish={onSubmit}
                    >
                        <Form.Item label="Form Size" name="size">
                            <Radio.Group>
                                <Radio.Button value="small">Small</Radio.Button>
                                <Radio.Button value="default">Default</Radio.Button>
                                <Radio.Button value="large">Large</Radio.Button>
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