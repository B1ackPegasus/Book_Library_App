import {configureStore} from "@reduxjs/toolkit";
import BookReducer from "./Books/reducer";

const store= configureStore(
    {
        reducer:{
            books:BookReducer
            //later can be other reducers
        }
    }
)
export default store;

