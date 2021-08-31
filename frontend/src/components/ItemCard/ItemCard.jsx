import { useDispatch, useSelector } from 'react-redux'
import {useEffect} from 'react'
import { loadCategories, loadItemsBySubcategory, loadSubcategories, pickCategory, pickSubcategory } from '../../app/itemCardSlice'

import { card, category_selector, card_container, searchbar_align } from './ItemCard.module.css'
import { PriceBar } from './PriceBar/PriceBar'
// import { OptionsList } from './OptionsList/OptionsList'
import { ProductBar } from './ProductBar/ProductBar'

export const ItemCard = (props) => {
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)

    // load categories on creation of component
    useEffect(() => {
        dispatch(loadCategories({token: token}))
    }, [])

    const categories = useSelector(state => state.itemCard.categories)
    let currentCategory = useSelector(state => state.itemCard.currentCategory)
    let currentSubcategory = useSelector(state => state.itemCard.currentSubcategory)
    const items = useSelector(state => state.itemCard.items)
    const subcategories = useSelector(state => state.itemCard.subcategories)
    
    const currentItem = useSelector(state => state.itemCard.currentItem) || {cost: "", pricePartner: "", priceCustomer: ""}

    useEffect(() => {
        // console.log("Loading subcategories")
        dispatch(loadSubcategories({token, category: currentCategory}))
    }, [currentCategory])
    
    const categoryChangeHandler = (e) => {
        let newCategory = e.target.value // change here
        dispatch(pickCategory(newCategory))
    }

    useEffect(() => {
        // console.log(`Loading items in ${currentSubcategory.name} subcategory`)
        dispatch(loadItemsBySubcategory({token, subcategory: currentSubcategory }))
    }, [currentSubcategory])

    const subcategoryChangeHandler = (e) => {
        let newSubcategory = e.target.value
        dispatch(pickSubcategory(newSubcategory))
    }

    return (
       <div className={card_container}>
           <div className={card}>
               <div className={category_selector}>
                   <select name="category_selector" id="cat_sel" onChange={categoryChangeHandler} value={currentCategory ? currentCategory.name : ""}>
                       {/* TODO Fetch data on load in useEffect */}
                       {categories ? categories.map((category) => (<option value={category.name} key={category._id}>{category.name}</option>)) : null}
                   </select>
                   <select name="subcategory_selector" id="subcat_sel" value={currentSubcategory ? currentSubcategory.name : ""} onChange={subcategoryChangeHandler}>
                        {subcategories ? subcategories.map((subcat) => (<option value={subcat.name} key={subcat._id}>{subcat.name}</option>)) : null}
                   </select>
                   {/* <select name="type_selector" id="type_sel"></select> */}
                </div>
                <div className={searchbar_align}>
                    <ProductBar />
                </div>          
           </div>
           <PriceBar cost={currentItem.cost} price={currentItem.price} quantity={1} />
       </div>
    )
}