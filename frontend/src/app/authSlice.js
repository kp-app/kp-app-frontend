import {createSlice} from "@reduxjs/toolkit"
import {backendUrl} from "../../backendConfig"

const initialState = {
    currentCredentials: {
        username: "",
        password: ""
    },
    token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        async login(state) {
            const token = await fetch(`${backendUrl}auth/login`, {
                body: JSON.stringify({...state.currentCredentials})
            })
            state.token = token
            state.currentCredentials.username = ""
            state.currentCredentials.password = ""
        },

        typeUsername(state, action) {
            state.currentCredentials.username = action.payload
        },

        typePassword(state, action) {
            state.currentCredentials.password = action.payload
        },

        logout(state) {
            state.token = ""
        }
    }
})

export const {login, typeUsername, typePassword, logout} = authSlice.actions
export default authSlice.reducer