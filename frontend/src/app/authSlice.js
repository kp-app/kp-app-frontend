import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {backendUrl} from "../../backendConfig"

const initialState = {
    currentCredentials: {
        username: "",
        password: ""
    },
    token: "",
    user: "",
    popupOpen: false
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, {fulfillWithValue, rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`${backendUrl}auth/login`, {
                method: 'POST',
                body: JSON.stringify({credentials})
            })
            if (!response.ok) {
                throw new Error('Failed to return data from API')
            }
            let username = credentials.username
            console.log(response.headers)
            dispatch(switchLoginState(response.headers['Auth'].split('Bearer ').slice(1)[0]))
            dispatch(clearCredentials())
            return fulfillWithValue(username)
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        switchLoginState(state, payload) {
            state.token = payload
        },

        typeUsername(state, action) {
            state.currentCredentials.username = action.payload
        },

        typePassword(state, action) {
            state.currentCredentials.password = action.payload
        },

        logout(state) {
            state.token = ""
            state.user = ""
        },
        clearCredentials(state) {
            state.currentCredentials.username = ""
            state.currentCredentials.password = ""
        },
        togglePopup(state) {
            state.popupOpen = !state.popupOpen
        }
    },
    extraReducers: {
        [login.pending]: (state, payload) => {
        },
        [login.rejected]: (state, payload) => {
        },
        [login.fulfilled]: (state, payload) => {
            state.user = payload
        }
    }
})

export const {switchLoginState, typeUsername, typePassword, logout, clearCredentials, togglePopup} = authSlice.actions
export default authSlice.reducer