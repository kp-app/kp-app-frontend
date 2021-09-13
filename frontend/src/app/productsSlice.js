import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import {backendUrl} from "../../backendConfig"

const initialState = {
    addedProducts: [
    ],
    tableView: false
}

export const updateItemPrice = createAsyncThunk(
    'products/updatePrice',
    async (data, {fulfillWithValue, rejectWithValue}) => {
        try {
            const {token, payload} = data
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            const response = await axios.patch(
                `${backendUrl}products/setPrice?fullName=${payload.fullName}`,
                payload,
                config,
            )
            
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed to return data from API')
            }
            
            return fulfillWithValue({data: response.data})
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

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
                
            },
            changePrice(state, action) {
                let [item, newItemPrice] = action.payload
                let productEntry = state.addedProducts.map(product => product.fullName).lastIndexOf(item.fullName)
                state.addedProducts[productEntry] = {...state.addedProducts[productEntry], pricing: {pricelistCost: newItemPrice}}
            },
            switchView(state) {
                state.tableView = !state.tableView
            }
        },
        extraReducers: {
            [updateItemPrice.fulfilled]: (state, action) => {
                console.log(action.payload)
            },
            [updateItemPrice.rejected]: (state, action) => {
                console.log(action.payload)
            }
        }
    }
)

export const { addItem, removeItem, switchView, changePrice } = productsSlice.actions

export default productsSlice.reducer