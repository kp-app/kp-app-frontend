import { configureStore } from '@reduxjs/toolkit'
import itemCardSlice from './itemCardSlice'




export default store = configureStore({
  reducer: {
      itemCard: itemCardSlice,
  },
})