import { createSlice, isFulfilled } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        account: null,
        loginError: null,
        tokenChecked: false
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = {
                ...state.account,
                ...action.payload
            }
        },
        setLoginError: (state, action) => {
            state.loginError = action.payload;
        },
        tokenChecked: (state, action) => {
            state.tokenChecked = action.payload;
        }

    },
})

// Action creators are generated for each case reducer function
export const { setAccount, setLoginError, tokenChecked } = userSlice.actions

export default userSlice.reducer