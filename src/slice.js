import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    email : '',
    error : '',
}



export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setEmail : (state, actions) => {
            state.email = actions.payload
        },
        setError : (state, actions) => {
            state.error = actions.payload
        }
    }
})

export const {setEmail, setError} = blogSlice.actions

export default blogSlice.reducer