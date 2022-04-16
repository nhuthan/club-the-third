import { configureStore } from '@reduxjs/toolkit'
//import thunk from 'redux-thunk';

import todoReducer from './todo';
import ipReducer from './ipInfo';

export default configureStore({
    reducer: {
        todo: todoReducer,
        ipInfo: ipReducer
    },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //         thunk: true
    //     })
})