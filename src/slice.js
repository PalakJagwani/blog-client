import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    email : ''
}



export const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        setEmail : (state, actions) => {
            state.email = actions.payload
        }
    }
})

export const {setEmail} = blogSlice.actions

export default blogSlice.reducer