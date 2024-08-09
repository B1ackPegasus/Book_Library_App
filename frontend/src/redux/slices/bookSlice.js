import { createSlice  , createAsyncThunk} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";
import createBookWithID from "../../utils/CreateBookWithID";
import * as fethooks from "./bookSlice";
import {setError} from "./errorSlice";

const initialState = []

const bookSlice = createSlice({
    name:"book",
    initialState,
    reducers:{

        addBook:(state, action) =>{
            return [...state, action.payload]
        },
        deleteBook:(state , action)=>{
            return state.filter(book => book.id !== action.payload)
        },
        makeBookAsFavourite:(state, action)=>{
            return state.map(book =>
                book.id === action.payload //payload holds id of book
                    ? { ...book , isFavourite: !book.isFavourite }:
                    book
            )
        }
    },
    extraReducers:(builder) =>{
        builder.addCase(fetchBook.fulfilled , (state, action) =>{
            if (action.payload.title && action.payload.author) {
               state.push(createBookWithID(action.payload, 'api'))
            }
        })
        //if fulfield -> call function reducer
    }
})

//reducers create to us new state

export const {addBook
             ,deleteBook
             ,makeBookAsFavourite} = bookSlice.actions;


export const fetchBook = createAsyncThunk(
    'book/fetchBook', async(url,thunkAPI)=>{
        try{
            const res = await axios.get(url);
            return res;
        }
        catch(err){
            thunkAPI.dispatch(setError(err.message))
            throw err //to avoid getting into reducer (fulfilled)
        }



    }
)




/*export const thankFunction = async (dispatch,getState)=> {
    try {
        const response = await axios.get("http://localhost:4000/random-book") //wait until  info come
        if (response?.data?.title && response?.data?.author) { //use ? so if it  undefined we wont get error
            dispatch(addBook(createBookWithID(response.data, 'api')))
        }
    } catch (error) {
        console.log(error)
    }
}*/


export const selectBooks = state => state.books; //every time books will change => rerender
export default bookSlice.reducer



