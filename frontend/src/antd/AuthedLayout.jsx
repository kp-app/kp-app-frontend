import {Layout, Menu, Row, Col, Button, Modal, Input, Popover} from 'antd';
import {
    UserOutlined,
    LoginOutlined,
    LogoutOutlined,
    LockFilled,
    MenuOutlined,
    CloseOutlined,
    SlidersOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {clearCredentials, login, logout, togglePopup, typePassword, typeUsername} from "../app/authSlice";
import {CatalogContent} from "./components/CatalogContent/Catalog";
import {useState} from "react";
import {NavLink} from "react-router-dom";


export const AuthedHeader = (props) => {
    const dispatch = useDispatch()
    const {currentCredentials, token, user, popupOpen, error, isAdmin} = useSelector(state => state.auth)
    const {SubMenu} = Menu;
    const {Header, Content, Sider} = Layout;

    const [adminPanel, toggleAdminPanel] = useState(false)
    const handleAdminPanel = () => toggleAdminPanel(prevState => !prevState)

    const [cart, toggleCart] = useState(false)
    const handleCartToggle = () => toggleCart(prevState => !prevState)

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
                    <Col span={16}>
                        <div className="logo"/>
                        {token &&
                        <Popover content={CatalogContent} trigger="click" placement="bottomLeft" arrowPointAtCenter>
                            <Button type="secondary" icon={<MenuOutlined/>}>
                                ??????????????
                            </Button>
                        </Popover>}
                    </Col>
                    <Col span={2}>
                        {token && <NavLink to={"/cart"}>
                            <Button type="secondary"
                                    icon={<ShoppingCartOutlined />}
                                    onClick={handleCartToggle}
                                    style={{marginRight: 10}}
                            >
                            </Button>
                        </NavLink>}
                    </Col>
                    <Col span={3}>
                        {token && isAdmin &&
                        <NavLink to={adminPanel ? "/" : "/admin"}>
                            <Button type="secondary"
                                    icon={adminPanel ? <CloseOutlined/> : <SlidersOutlined/>}
                                    onClick={handleAdminPanel}
                                    style={{marginRight: 20}}
                            >

                                ??????????-????????????

                            </Button>
                        </NavLink>
                        }
                    </Col>
                    <Col span={3}>
                        <Button type={'primary'} icon={!token ? <LoginOutlined/> : <LogoutOutlined/>}
                                block={true} onClick={handleClick}>
                            {!token ? "??????????" : "??????????"}
                        </Button>
                    </Col>
                </Row>
            </Header>
            {props.children}
            {!token && <Modal
                title="?????????? ?? ??????????????"
                centered
                visible={popupOpen}
                onOk={handleLoginFormSubmit}
                onCancel={() => dispatch(togglePopup())}
                width={1000}
            >
                <Input type="text" size="large" placeholder="??????????" prefix={<UserOutlined/>}
                       name={"username"} value={currentCredentials.username} onChange={handleChange}/>
                <br/>
                <Input size="large" placeholder="????????????"
                       type="password" prefix={<LockFilled/>}
                       name={"password"} value={currentCredentials.password} onChange={handleChange}/>
            </Modal>}
        </Layout>
    )
}