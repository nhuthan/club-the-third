import { configureStore } from '@reduxjs/toolkit'
//import thunk from 'redux-thunk';

import todoReducer from './todo';
import ipReducer from './ipInfo';
import userReducer from './user';

export default configureStore({
    reducer: {
        todo: todoReducer,
        ipInfo: ipReducer,
        user: userReducer
    }
})