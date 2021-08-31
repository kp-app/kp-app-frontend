import {Layout, Menu, Row, Col, Button, Modal, Input} from 'antd';
import {UserOutlined, SelectOutlined, LockFilled} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {clearCredentials, login, logout, togglePopup, typePassword, typeUsername} from "../app/authSlice";

export const AuthedHeader = (props) => {
    const dispatch = useDispatch()
    const {currentCredentials, token, user, popupOpen, error, isAdmin} = useSelector(state => state.auth)
    const {SubMenu} = Menu;
    const {Header, Content, Sider} = Layout;

    const handleClick = (e) => {
        const clear = () => {
            dispatch(clearCredentials())
            dispatch(logout())
        }
        token ? clear() : dispatch(togglePopup())
    }
    const handleLoginFormSubmit = (e) => {
        e.preventDefault()
        dispatch(login(currentCredentials))
    }

    const handleChange = ({target}) => {
        if (target.name === 'password') {
            dispatch(typePassword(target.value))
        } else if (target.name === 'username') {
            dispatch(typeUsername(target.value))
        }
    }

    return (
        <Layout>
            <Header className="header">
                <Row>
                    <Col span={22}>
                        <div className="logo"/>
                        {token && <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                            <Menu.Item key="1">nav 1</Menu.Item>
                            <Menu.Item key="2">nav 2</Menu.Item>
                            <Menu.Item key="3">nav 3</Menu.Item>
                        </Menu>}
                    </Col>
                    <Col span={2}>
                        <Button type={'primary'} icon={!token ? <UserOutlined/> : <SelectOutlined/>}
                                block={true} onClick={handleClick}>
                            {!token ? "Войти" : "Выйти"}
                        </Button>
                    </Col>
                </Row>
            </Header>
            {props.children}
            {!token && <Modal
                title="Войти в систему"
                centered
                visible={popupOpen}
                onOk={handleLoginFormSubmit}
                onCancel={() => dispatch(togglePopup())}
                width={1000}
            >
                <Input type="text" size="large" placeholder="Логин" prefix={<UserOutlined/>}
                       name={"username"} value={currentCredentials.username} onChange={handleChange}/>
                <br/>
                <Input size="large" placeholder="Пароль"
                       type="password" prefix={<LockFilled/>}
                       name={"password"} value={currentCredentials.password} onChange={handleChange}/>
            </Modal>}
        </Layout>
    )
}