import { configureStore } from '@reduxjs/toolkit'
import itemCardSlice from './itemCardSlice'
import productsSlice from './productsSlice'




export default configureStore({
  reducer: {
      itemCard: itemCardSlice,
      products: productsSlice
  },
})