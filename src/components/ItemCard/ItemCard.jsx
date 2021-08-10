import { card, category_selector } from './ItemCard.module.css'
import { OptionsList } from './OptionsList/OptionsList'
import { ProductBar } from './ProductBar/ProductBar'

export const ItemCard = (props) => {

    return (
       <div className={card}>
           <div className={category_selector}>
               <select name="category_selector" id="cat_sel">
                   <option value="value">Коботы</option>
               </select>
            </div>
            <ProductBar />
            <button>Добавить опцию</button>
            <OptionsList />
       </div>
    )
}