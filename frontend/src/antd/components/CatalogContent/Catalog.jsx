import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Layout, Menu} from "antd";

export const CatalogContent = (props) => {
    const {Header, Content, Sider} = Layout;

    // download categories + respective subcategories into state on load
    // I mean, default shi', can't figure out nothing more elegant
    const dispatch = useDispatch()
    useEffect(() => {
    }, [])

    const subcats = useSelector(state => state.itemCard.subcategories)
    const cats = useSelector(state => state.itemCard.categories)
    return (
        <Layout>
            <Sider>
                <Menu
                    mode="inline"
                    style={{height: '100%', borderRight: 0}}
                >
                    {cats.map(category => (<Menu.Item key={category._id}>{category.name}</Menu.Item>))}
                </Menu>
            </Sider>
            <Layout style={{padding: '0 24px 24px', minWidth: '1000px'}}>
                <Content
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    <div className="site-layout">
                        <Menu mode="inline"
                              style={{height: '100%', borderRight: 0}}>
                            {subcats.map(subcategory => (<Menu.Item key={subcategory._id}>
                                {subcategory.name}
                            </Menu.Item>))}
                        </Menu>
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}