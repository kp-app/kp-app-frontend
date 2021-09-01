import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {backendUrl} from "../../backendConfig"
import {searchEveryWord} from "../utils/searchEveryWord"

// create init state
const initialState = {
    categories: [],
    currentCategory: {},
    subcategories: [],
    currentSubcategory: {},
    currentTextInSearch: "",
    searchPredictions: [],
    currentItem: {},
    items: []
}

export const loadCategories = createAsyncThunk(
    'itemCard/loadCategories',
    async (data, {fulfillWithValue, rejectWithValue, dispatch}) => {
        try {
            let {token} = data
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            const response = await axios.get(
                `${backendUrl}categories`,
                config
            )
            if (response.status !== 200) {
                throw new Error('Failed to return data from API')
            }
            dispatch(clearUpToCategories()) // kind of a side-effect, right?
            return fulfillWithValue({data: response.data})
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)
export const loadAllSubcats = createAsyncThunk(
    'itemCard/loadAllSubcats',
    async (data, {fulfillWithValue, rejectWithValue, dispatch}) => {
        try {
            let {token} = data
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            };
            const response = await axios.get(
                // TODO use proper params pls
                `${backendUrl}subcategories`,
                config
            )
            // console.log(response)
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Failed to return data from API')
            }
            // dispatch(loadItemsByCategory({token, category}))
            return fulfillWithValue({data: response.data})

        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)
export const loadSubcategories = createAsyncThunk(
    'itemCard/loadSubcategories',
    async (data, {fulfillWithValue, rejectWithValue, dispatch}) => {
        try {
            let {token, category} = data
            if (Object.keys(category).length !== 0) {
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(
                    // TODO use proper params pls
                    `${backendUrl}subcategories?categoryId=${category._id}`,
                    config
                )
                // console.log(response)
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error('Failed to return data from API')
                }
                dispatch(clearItems()) // kind of a side-effect, right?
                // dispatch(loadItemsByCategory({token, category}))
                return fulfillWithValue({data: response.data})
            }
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)
export const loadItemsByCategory = createAsyncThunk(
    'itemCard/loadItemsByCategory',
    async (data, {fulfillWithValue, rejectWithValue, dispatch}) => {
        try {
            let {token, category} = data
            if (Object.keys(category).length !== 0) {
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(
                    // TODO use proper params pls
                    `${backendUrl}products?categoryId=${category._id}`,
                    config
                )
                console.log(response)
                if (response.status !== 200) {
                    throw new Error('Failed to return data from API')
                }
                return fulfillWithValue({data: response.data, dispatch})
            } else {
                console.log("Broken subcat obj", category)
            }
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const loadItemsBySubcategory = createAsyncThunk(
    'itemCard/loadItemsBySubcategory',
    async (data, {fulfillWithValue, rejectWithValue, dispatch}) => {
        try {
            let {token, subcategory} = data
            if (Object.keys(subcategory).length !== 0) {
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(
                    // TODO use proper params pls
                    `${backendUrl}products/subcategory?subcategoryId=${subcategory._id}`,
                    config
                )
                console.log(response)
                if (response.status !== 200) {
                    throw new Error('Failed to return data from API')
                }
                return fulfillWithValue({data: response.data, dispatch})
            } else {
                console.log("Broken subcat obj", subcategory)
            }
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)
// write slice
const itemCardSlice = createSlice({
    name: "itemCard",
    initialState,
    reducers: {
        pickCategory(state, action) {
            state.currentCategory = state.categories.filter(cat => cat.name === action.payload)[0]
        },
        pickSubcategory(state, action) {
            state.currentSubcategory = state.subcategories.filter(subcat => subcat.name === action.payload)[0]
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
            try {
                state.currentItem = state.items.filter(item => item.fullName === action.payload)[0]
            } catch (IndexError) {
                state.currentItem = {}
            }

        },
        clearSearchBar(state) {
            state.currentTextInSearch = ""
            state.searchPredictions = []
            state.currentItem = {}
        },
        clearUpToCategories(state) {
            state.subcategories = []
            state.items = []
            state.currentItem = {}
            state.currentTextInSearch = ""
            state.searchPredictions = []
        },
        clearItems(state) {
            state.items = []
            state.currentItem = {}
            state.currentTextInSearch = ""
            state.searchPredictions = []
        }
    },
    extraReducers: {
        [loadCategories.fulfilled]: (state, action) => {
            state.categories = action.payload.data
        },
        [loadSubcategories.fulfilled]: (state, action) => {
            state.subcategories = action.payload.data
        },
        [loadAllSubcats.fulfilled]: (state, action) => {
            state.subcategories = action.payload.data
        },
        [loadItemsBySubcategory.fulfilled]: (state, action) => {
            state.items = action.payload.data
        },
        [loadItemsByCategory.fulfilled]: (state, action) => {
            state.items = action.payload.data
        },
        [loadCategories.rejected]: (state, action) => {
            console.log(action.payload)
        },
        [loadSubcategories.rejected]: (state, action) => {
            console.log(action.payload)
        },
        [loadItemsBySubcategory.rejected]: (state, action) => {
            console.log(action.payload)
        },
        [loadItemsByCategory.rejected]: (state, action) => {
            console.log(action.payload)
        },
        [loadAllSubcats.rejected]: (state, action) => {
            console.log(action.payload)
        }
    }
})

export const {
    pickCategory, typeToSearchBar,
    selectItem, clearSearchBar,
    clearUpToCategories, clearItems,
    pickSubcategory
} = itemCardSlice.actions

export default itemCardSlice.reducer