import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {backendUrl} from "../../backendConfig"

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
                `${backendUrl}subcategories/all`,
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
            let {token, categoryId} = data
            if (Object.keys(categoryId).length !== 0) {
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(
                    // TODO use proper params pls
                    `${backendUrl}subcategories?categoryId=${categoryId}`,
                    config
                )
                // console.log(response)
                if (response.status !== 200 && response.status !== 201) {
                    throw new Error('Failed to return data from API')
                }
                // dispatch(clearItems()) // kind of a side-effect, right?
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
            let {token, categoryId} = data
            
            if (Object.keys(categoryId).length !== 0) {
                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                };
                const response = await axios.get(
                    // TODO use proper params pls
                    `${backendUrl}products/category?categoryId=${categoryId}`,
                    config
                )
                console.log(response)
                if (response.status !== 200) {
                    throw new Error('Failed to return data from API')
                }
                return fulfillWithValue({data: {items: response.data, category: categoryId}})
            } else {
                console.log("Broken subcat obj", categoryId)
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
                return fulfillWithValue({data: {items: response.data, subcategory: subcategory}})
            } else {
                console.log("Broken subcat obj", subcategoryId)
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
            state.items = [...state.items, {subcategory: action.payload.data.subcategory, items: action.payload.data.items}]
        },
        [loadItemsByCategory.fulfilled]: (state, action) => {
            state.items = [...state.items, {category: action.payload.data.category, items: action.payload.data.items}]
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
    pickCategory,
    clearUpToCategories, clearItems,
    pickSubcategory
} = itemCardSlice.actions

export default itemCardSlice.reducer