import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Layout, Menu} from "antd";
import { clearUpToCategories, loadCategories } from "../../../app/itemCardSlice";
import { NavLink } from "react-router-dom";

export const CatalogContent = (props) => {
    const token = useSelector(state => state.auth.token)
    // download categories + respective subcategories into state on load
    // I mean, default shi', can't figure out nothing more elegant
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadCategories({token: token}))
    }, [])
    const cats = useSelector(state => state.itemCard.categories)
    return (
         
        <Menu
            mode="inline"
            style={{height: '100%', borderRight: 0}}
        >
            {cats.map(category => (<Menu.Item key={category._id}><NavLink to={`/category/${category._id}`}>{category.name}</NavLink></Menu.Item>))}
        </Menu>
        
    )
}