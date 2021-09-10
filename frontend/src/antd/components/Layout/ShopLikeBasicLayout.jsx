import {Breadcrumb, Dropdown, Layout, Slider} from "antd";
import {DownOutlined, LaptopOutlined, NotificationOutlined, UpOutlined, UserOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useSelector} from "react-redux";


export const ShopLikeBasicLayout = (props) => {
    const items = useSelector(state => state.itemCard.items)

    const [priceFilterMenuOpen, togglePriceFilterMenu] = useState(false)

    const {Header, Content, Sider} = Layout;
    return (
        <Layout style={{backgroundColor: "white"}}>
            <Sider width={200} className="site-layout-background" style={{backgroundColor: "white"}}>
                <h1>Фильтры</h1>
                {/* TODO Fix overlay range */}
                <Dropdown
                    overlay={<div style={{width: 180, padding: '0 10px'}}><Slider range defaultValue={[20, 50]}/>
                    </div>}
                    trigger="click"
                    visible={priceFilterMenuOpen}>
                    <a className="ant-dropdown-link" onClick={e => {
                        e.preventDefault()
                        togglePriceFilterMenu(prevState => !prevState)
                    }}>
                        Цена {!priceFilterMenuOpen ? <DownOutlined/> : <UpOutlined/>}
                    </a>
                </Dropdown>
            </Sider>
            <div style={{padding: '0 24px 24px', backgroundColor: 'white'}}>
                {props.children}
            </div>
        </Layout>
    )
}