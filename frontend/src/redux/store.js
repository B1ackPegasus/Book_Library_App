import {configureStore} from "@reduxjs/toolkit";
import BookReducer from "./slices/bookSlice";
import filterReducer from "./slices/filterSlice";

const store= configureStore(
    {
        reducer:{
            books:BookReducer,
            filter:filterReducer,
        }
    }
)
export default store;

