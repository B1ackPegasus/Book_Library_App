
import * as types from './ActionTypes';

const initialState = []

const BookReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_BOOK:
            return [...state , action.payload]
        case types.DELETE_BOOK:
            return state.filter(book => book.id !== action.payload)
        case types.MAKE_FAVOURITE:
            return state.map(book =>
            book.id === action.payload //payload holds id of book
             ? { ...book , isFavourite: !book.isFavourite }:
                book
            )
        default:
            return state;
    }
}

export default BookReducer
