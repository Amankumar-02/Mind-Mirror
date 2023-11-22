import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from '../features/auth/authSlice'
import postSliceReducer from '../features/posts/postSlice'

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        posts: postSliceReducer,
    },
})

export default store