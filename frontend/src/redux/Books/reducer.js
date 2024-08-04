
import * as types from './ActionTypes';

const initialState = []

const BookReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.ADD_BOOK:
            return [...state , action.payload]
        case types.DELETE_BOOK:
            return state.filter(book => book.id !== action.payload)
        default:
            return state;
    }
}

export default BookReducer
