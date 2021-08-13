import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories, fetchItems, pickCategory } from '../../app/itemCardSlice'

import { card, category_selector, card_container, searchbar_align } from './ItemCard.module.css'
import { PriceBar } from './PriceBar/PriceBar'
// import { OptionsList } from './OptionsList/OptionsList'
import { ProductBar } from './ProductBar/ProductBar'

export const ItemCard = (props) => {
    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [])
    const dispatch = useDispatch()
    let currentCategory = useSelector(state => state.itemCard.currentCategory)
    const items = useSelector(state => state.itemCard.items)
    const categories = useSelector(state => state.itemCard.categories)
    const currentItem = useSelector(state => state.itemCard.currentItem) || {cost: "", pricePartner: "", priceCustomer: ""}

    const categoryChangeHandler = (e) => {
        let newCategory = e.target.value

        // such usage is not recommended though. We could batch 'em up in reducer or right here w/ some library
        dispatch(fetchItems(newCategory))
        dispatch(pickCategory(newCategory))
    }

    return (
       <div className={card_container}>
           <div className={card}>
               <div className={category_selector}>
                   <select name="category_selector" id="cat_sel" onChange={categoryChangeHandler} value={currentCategory}>
                       {/* TODO Fetch data on load in useEffect */}
                       {categories.map((category, index) => (<option value={category} key={index}>{category}</option>))}
                   </select>
                </div>
                <div className={searchbar_align}>
                    <ProductBar />
                </div>          
           </div>
           <PriceBar item={currentItem} />
       </div>
    )
}