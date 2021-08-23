import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import {backendUrl} from "../../backendConfig"
import { setExpiringItem } from "../utils/timedLocalStorage"

const initialState = {
    currentCredentials: {
        username: "",
        password: ""
    },
    token: "",
    user: "",
    popupOpen: false,
    error: "",
    isAdmin: false

}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, {fulfillWithValue, rejectWithValue, dispatch}) => {
        try {
            const response = await axios.post(
                `${backendUrl}auth/login`,
                credentials,
            )
            if (response.status !== 201) {
                throw new Error('Failed to return data from API')
            }
            let username = credentials.username
            let token = response.data.access_token
            dispatch(clearCredentials()) // kind of a side-effect, right?
            return fulfillWithValue({username, token})
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        typeUsername(state, action) {
            state.currentCredentials.username = action.payload
        },

        typePassword(state, action) {
            state.currentCredentials.password = action.payload
        },

        logout(state) {
            state.token = ""
            state.user = ""
            localStorage.removeItem('token')
        },
        clearCredentials(state) {
            state.currentCredentials.username = ""
            state.currentCredentials.password = ""
            state.error = ""
            state.popupOpen = false
        },
        togglePopup(state) {
            state.popupOpen = !state.popupOpen
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
        },
        [login.rejected]: (state, action) => {
            state.error = action.payload
        },
        [login.fulfilled]: (state, action) => {
            state.user = action.payload.username
            state.token = action.payload.token
            setExpiringItem('token', action.payload.token)
            setExpiringItem('username', action.payload.username)
        }
    }
})

export const {typeUsername, typePassword, logout, clearCredentials, togglePopup} = authSlice.actions
export default authSlice.reducer