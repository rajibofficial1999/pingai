import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface StateProps {
    isLoggedIn: boolean,
    user: User | null
}

const initialState: StateProps = {
    isLoggedIn: false,
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        removeUser: (state) => {
            state.isLoggedIn = false
            state.user = null
        }
    },
})

export const { setUser, removeUser } = authSlice.actions

export default authSlice.reducer