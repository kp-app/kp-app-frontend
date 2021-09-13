import {useDispatch, useSelector} from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { loadSubcategories, loadItemsByCategory, clearUpToCategories } from "../../../app/itemCardSlice";
import { ItemsBySubcat } from "../ItemGrid/ItemsBySubcategory";

export const ItemGrid = (props) => {
    // filters
    const categoryId = useLocation().pathname.split("/").slice(-1)[0];
    const token = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    // load subcats, items by cat
    useEffect(() => {
        dispatch(clearUpToCategories())
        dispatch(loadSubcategories({token: token, categoryId: categoryId}))
    }, [categoryId])

    const subcategories = useSelector(state => state.itemCard.subcategories)
    // display grid
    return (
        <>
            {subcategories.map((subcat, index) => <div style={{width: 1200}} key={subcat._id}>
                <h1>{subcat.name}</h1>
                <ItemsBySubcat token={token} subcategory={subcat}/>
            </div>)}
        </>
        // filter applied after .map() as .filter(subcat == activeSubcats) 
    )
}