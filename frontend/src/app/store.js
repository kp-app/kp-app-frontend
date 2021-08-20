import {configureStore} from '@reduxjs/toolkit'
import itemCardSlice from './itemCardSlice'
import productsSlice from './productsSlice'
import authSlice from "./authSlice";


export default configureStore({
    reducer: {
        itemCard: itemCardSlice,
        products: productsSlice,
        auth: authSlice
    },
})