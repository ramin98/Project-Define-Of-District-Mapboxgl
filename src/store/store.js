import { configureStore } from '@reduxjs/toolkit';
import objectSlice from "./reducer"

let store = configureStore({
    reducer:{
        objects: objectSlice
    },
   
})

export default store