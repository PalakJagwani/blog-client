import {configureStore} from '@reduxjs/toolkit';
import blogReducer from '../slice'

export const store = configureStore({
    reducer : blogReducer
})