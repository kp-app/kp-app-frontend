import { createSlice } from "@reduxjs/toolkit"
import { searchEveryWord } from "../utils/searchEveryWord"

// create init state
const initialState = {
    categories: ["Industrial Robots Universal Dummy", "Cobots Universal Dummy"],
    currentCategory: "Cobots Universal Dummy",
    currentTextInSearch: "",
    searchPredictions: [],
    currentItem: {},
    items: [
        {
            fullName: "Dummy Bot 7iA/L AB",
            itemModel: "Dummy Bot 7iA/L",
            cost: "77000",
            priceCustomer: "90010",
            pricePartner: "81000"
        },
        {
            fullName: "Cool Bot 777 iA/L A",
            itemModel: "Cool Bot 777 iA/L",
            cost: "977000",
            priceCustomer: "990010",
            pricePartner: "981000"
        },
        {
            fullName: "Cool Bot CX iA/L A",
            itemModel: "Cool Bot 999 iA/L",
            cost: "977000",
            priceCustomer: "990010",
            pricePartner: "981000"
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
        fetchItems(state, payload) {
            // payload = category.value
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
            let items = state.items
            if (items && query.length >= 4) {
                state.searchPredictions = items.filter(item => searchEveryWord(item.fullName, query))
                if (state.searchPredictions.length > 1) {
                    state.currentItem = {}
                }
            }
            
        },
        selectItem(state, action) {
           try { state.currentItem = state.items.filter(item => item.fullName === action.payload)[0]}
           catch(IndexError) {
               state.currentItem = {}
           }

        },
        submitItem(state) {
            // submit state.currentItem
            state.currentItem = {}
        },
        clearItem(state) {
            state.currentItem = {}
        },
        clearSearchBar(state) {
            state.currentTextInSearch = ""
            state.searchPredictions = []
        },

    }
})

export const { fetchCategories, fetchItems, pickCategory, typeToSearchBar, selectItem, submitItem, clearItem, clearSearchBar } = itemCardSlice.actions

export default itemCardSlice.reducer