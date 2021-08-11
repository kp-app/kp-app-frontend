import { createSlice } from "@reduxjs/toolkit"

// create init state
const initialState = {
    categories: [],
    currentCategory: "DUMMY_UNIVERSAL_COBOTS",
    currentTextInSearch: "",
    searchPredictions: [],
    items: [
        {
            fullName: "Dummy Bot 7iA/L AB",
            itemModel: "Dummy Bot 7iA/L",
            cost: 77000,
            priceClient: 90010,
            pricePartner: 81000
        },
        {
            fullName: "Cool Bot 777 iA/L A",
            itemModel: "Cool Bot 777 iA/L",
            cost: 977000,
            priceClient: 990010,
            pricePartner: 981000
        } 
    ]
}

// write slice
const itemCardSlice = createSlice({
    name: "itemCard",
    initialState,
    reducers: {
        // categories
        fetchCategories(state) {
            // idk man, it has something to do with fetching. asyncThunk bs?
        },
        pickCategory(state, action) {
            state.currentCategory = action.payload
        },
        // searchBar text/predictions
        typeToSearchBar(state, action) {
            // payload = whole field
            state.currentTextInSearch = action.payload
            // Try to predict
            let query = state.currentTextInSearch
            if (items && query.length > 4) {
                state.searchPredictions = items.filter(item => item.fullName.includes(query))
            }
            
        },
        clearSearchBar(state) {
            state.currentTextInSearch = ""
            state.searchPredictions = []
        },

    }
})

export const { fetchCategories, pickCategory, typeToSearchBar, clearSearchBar } = itemCardSlice.actions

export default itemCardSlice.reducer