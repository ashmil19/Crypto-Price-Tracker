import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {user: null, userId: null, accessToken: null},
    reducers: {
        setCredentials: (state, action) =>{
            const {user, userId, accessToken} = action.payload
            state.user = user
            state.userId = userId,
            state.accessToken = accessToken
        }
    }
})


export const { setCredentials } = authSlice.actions

export default authSlice.reducer