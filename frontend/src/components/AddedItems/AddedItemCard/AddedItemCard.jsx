import { useDispatch } from 'react-redux'

import { removeItem } from '../../../app/productsSlice'
import { PriceBar } from '../../ItemCard/PriceBar/PriceBar'

import { card, category_selector, card_container, searchbar_align } from './AddedItemCard.module.css'





export const AddedItemCard = (props) => {

    const dispatch = useDispatch()
    const item = props.item
    

    const deleteButtonHandler = () => {
        dispatch(removeItem(item))
    }

    return (
       <div className={card_container}>
           <div className={card}>
               <div className={category_selector}>
                   
                </div>
                <div className={searchbar_align}>
                    <h1>{item.fullName}</h1>
                </div>          
           </div>
           <PriceBar price={item.price} cost={item.cost} />
       </div>
    )
}