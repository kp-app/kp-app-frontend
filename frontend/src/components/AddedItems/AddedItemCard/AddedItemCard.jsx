import { useDispatch } from 'react-redux'

import { removeItem } from '../../../app/productsSlice'
import { PriceBar } from '../../ItemCard/PriceBar/PriceBar'

import { card, category_selector, card_container, searchbar_align, controls, category_header } from './AddedItemCard.module.css'





export const AddedItemCard = (props) => {

    const dispatch = useDispatch()
    const item = props.item
    

    const deleteButtonHandler = () => {
        dispatch(removeItem(item))
    }

    return (
       <div className={card_container}>
           <div className={card}>
               <div className={controls}>
                    <div>Количество: <b>{item.quantity}</b></div>
                    <button onClick={deleteButtonHandler}>Удалить</button>
               </div>
               <div className={`${category_selector} ${category_header}`}>
                   <p>Категория: <b>{item.category}</b></p>
                </div>
                <div className={searchbar_align}>
                    <h1>{item.fullName}</h1>
                </div>          
           </div>
           <PriceBar cost={item.cost} price={item.price} quantity={item.quantity} />
       </div>
    )
}