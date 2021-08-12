import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    addedProducts: [
    ],
    priceTable: {
        itemNames: [],
        prices: [],
        costs: []
    }
}

const productsSlice = createSlice(
    {
        name: "products",
        initialState,
        reducers: {
            addItem(state, action) {
                let item = action.payload
                state.addedProducts = [...state.addedProducts, item]
                state.priceTable.itemNames = [...state.priceTable.itemNames, item.fullName]
                // TODO what if we wanna send this proposal to partner, not end customer?
                state.priceTable.prices = [...state.priceTable.prices, item.priceCustomer]
                state.priceTable.costs = [...state.priceTable.prices, item.cost]
            },
            removeItem(state, action) {
                let lastProductEntry = state.addedProducts.lastIndexOf(action.payload)
                if (lastProductEntry !== -1) {
                    // it's ok to mutate since nothing mutates anyway :)
                    state.addedProducts.remove(action.payload)
                    state.priceTable.itemNames.splice(lastProductEntry, 1)
                    state.priceTable.prices.splice(lastProductEntry, 1)
                    state.priceTable.costs.splice(lastProductEntry, 1)
                } else {
                    throw {message: "Tried to remove non-existing element :)", name: "No such value to remove"}
                }
                
            }
        }
    }
)

export const { addItem, removeItem } = productsSlice.actions

export default productsSlice.reducer