import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addedProducts: [
    ]
}

const productsSlice = createSlice(
    {
        name: "products",
        initialState,
        reducers: {
            addItem(state, action) {
                let lastProductEntry = state.addedProducts.map(product => product.fullName).lastIndexOf(action.payload.fullName)
                if (lastProductEntry === -1) {
                    let item = {...action.payload, quantity: 1}
                    state.addedProducts = [...state.addedProducts, item]
                } else {

                    state.addedProducts[lastProductEntry] = {...state.addedProducts[lastProductEntry], quantity: state.addedProducts[lastProductEntry].quantity + 1}
                    
                }
            },
            removeItem(state, action) {
                
                let lastProductEntry = state.addedProducts.map(product => product.fullName).lastIndexOf(action.payload.fullName)
                if (lastProductEntry !== -1) {
                    if (state.addedProducts[lastProductEntry].quantity > 1) {
            
                        // Reduce quantity, reduce cost & price
                        state.addedProducts[lastProductEntry] = {
                            ...state.addedProducts[lastProductEntry], 
                            quantity: state.addedProducts[lastProductEntry].quantity - 1
                        }
                        
                    } else {
                        state.addedProducts.splice(lastProductEntry, 1)

                    }
                } else {
                    throw {message: "Tried to remove non-existing element :)", name: "No such value to remove"}
                }
                
            }
        }
    }
)

export const { addItem, removeItem } = productsSlice.actions

export default productsSlice.reducer