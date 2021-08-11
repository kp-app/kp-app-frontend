import { configureStore } from '@reduxjs/toolkit'
import itemCardSlice from './itemCardSlice'




export default configureStore({
  reducer: {
      itemCard: itemCardSlice,
  },
})