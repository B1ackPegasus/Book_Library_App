import { createSlice  , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import createBookWithID from "../../utils/CreateBookWithID";
import {setError} from "./errorSlice";

const initialState = {
    books:[],
    isLoading:false
}

export const fetchBook = createAsyncThunk(
    'book/fetchBook', async(url,thunkAPI)=> {
        try {
            const res = await axios.get(url);
            return res.data;
        } catch (err) {
            thunkAPI.dispatch(setError(err.message))
             return thunkAPI.rejectWithValue(err) //to avoid getting into reducer (fulfilled)
        }
    })
const bookSlice = createSlice({
    name:"book",
    initialState,
    reducers:{

        addBook:(state, action) =>{
             state.books.push(action.payload)
        },
        deleteBook:(state , action)=>{
            return{...state ,books: state.books.filter(book => book.id !== action.payload)}
        },
        makeBookAsFavourite:(state, action)=>{
            return state.books.forEach(book =>
                book.id === action.payload //payload holds id of book
                    ?  book.isFavourite= !book.isFavourite :
                    book
            )
        }
    },
  /* OPTION 1    extraReducers:(builder) =>{
        builder.addCase(fetchBook.fulfilled , (state, action) =>{
            if (action.payload.title && action.payload.author) {
               state.push(createBookWithID(action.payload, 'api'))
            }
        })
        //if fulfield -> call function reducer
    }*/
    extraReducers:{
        [fetchBook.pending]: (state)=>{
            state.isLoading=true;
        },
        [fetchBook.fulfilled] : (state, action) => {
            state.isLoading=false;
            if (action.payload.title && action.payload.author) {
                state.books.push(createBookWithID(action.payload, 'api'))
            }
        },
        [fetchBook.rejected] : (state, action) => {
            state.isLoading=false;
        }
    }
})

//reducers create to us new state

export const {addBook
             ,deleteBook
             ,makeBookAsFavourite} = bookSlice.actions;

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

export const selectIsLoading=(state)=>state.books.isLoading
export const selectBooks = state => state.books.books; //every time books will change => rerender
export default bookSlice.reducer



