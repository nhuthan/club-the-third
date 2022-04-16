import { createSlice } from '@reduxjs/toolkit'

export const ipSlice = createSlice({
    name: 'ipInfo',
    initialState: {
        info: {}
    },
    reducers: {
        setInfo: (state, action) => {
            console.log(state, action)
            state.info = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setInfo } = ipSlice.actions

export default ipSlice.reducer