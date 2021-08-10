import { card, category_selector, card_container, searchbar_align } from './ItemCard.module.css'
import { PriceBar } from './PriceBar/PriceBar'
// import { OptionsList } from './OptionsList/OptionsList'
import { ProductBar } from './ProductBar/ProductBar'

export const ItemCard = (props) => {

    return (
       <div className={card_container}>
           <div className={card}>
               <div className={category_selector}>
                   <select name="category_selector" id="cat_sel">
                       <option value="value">Коботы</option>
                   </select>
                </div>
                <div className={searchbar_align}>
                    <ProductBar />
                </div>
                {/* <button>Добавить опцию</button>
                <OptionsList /> */}
                
           </div>
           <PriceBar/>
       </div>
    )
}