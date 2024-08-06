import { createSlice } from "@reduxjs/toolkit";
import {useSelector} from "react-redux";


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
    }
})

//reducers create to us new state

export const {addBook
             ,deleteBook
             ,makeBookAsFavourite} = bookSlice.actions;

export const selectBooks = state => state.books; //every time books will change => rerender
export default bookSlice.reducer


//bookSlice.action  have function inside that creates action
//addbook create action | action = { type:book/addBook  payload: info}
