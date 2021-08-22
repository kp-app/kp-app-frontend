import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {backendUrl} from "../../backendConfig"

const initialState = {
    currentCredentials: {
        username: "",
        password: ""
    },
    token: ""
}

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`${backendUrl}auth/login`, {
                method: 'POST',
                body: JSON.stringify({credentials})
            })
            if (!response.ok) {
                throw new Error('Failed to return data from API')
            }
            dispatch(switchLoginState(response.headers.split('Bearer ').slice(1)[0]))
            dispatch(clearCredentials())
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
        },
        clearCredentials(state) {
            state.currentCredentials.username = ""
            state.currentCredentials.password = ""
        }
    },
    extraReducers: {
        [login.pending]: {},
        [login.rejected]: {},
        [login.fulfilled]: {}
    }
})

export const {switchLoginState, typeUsername, typePassword, logout, clearCredentials} = authSlice.actions
export default authSlice.reducer