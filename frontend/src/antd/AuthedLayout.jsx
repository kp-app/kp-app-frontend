import {Layout, Menu, Row, Col, Button, Modal, Input, Popover} from 'antd';
import {
    UserOutlined,
    LoginOutlined,
    LogoutOutlined,
    LockFilled,
    MenuOutlined,
    CloseOutlined,
    SlidersOutlined
} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {clearCredentials, login, logout, togglePopup, typePassword, typeUsername} from "../app/authSlice";
import {CatalogContent} from "./components/CatalogContent/Catalog";
import {useState} from "react";
import AdminApp from "./AdminApp";

export const AuthedHeader = (props) => {
    const dispatch = useDispatch()
    const {currentCredentials, token, user, popupOpen, error, isAdmin} = useSelector(state => state.auth)
    const {SubMenu} = Menu;
    const {Header, Content, Sider} = Layout;

    const [adminPanel, toggleAdminPanel] = useState(false)
    const handleAdminPanel = () => toggleAdminPanel(prevState => !prevState)


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
                        {token &&
                        <Popover content={CatalogContent} trigger="click" placement="bottomLeft" arrowPointAtCenter>
                            <Button type="secondary" icon={<MenuOutlined/>}>
                                Каталог
                            </Button>
                        </Popover>}
                        {token && isAdmin &&
                        <Button type="secondary"
                                icon={adminPanel ? <CloseOutlined/> : <SlidersOutlined/>}
                                onClick={handleAdminPanel}
                        >
                            Админ-панель
                        </Button>

                        }
                    </Col>
                    <Col span={2}>
                        <Button type={'primary'} icon={!token ? <LoginOutlined/> : <LogoutOutlined/>}
                                block={true} onClick={handleClick}>
                            {!token ? "Войти" : "Выйти"}
                        </Button>
                    </Col>
                </Row>
            </Header>
            {adminPanel ? <AdminApp/> : props.children}
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