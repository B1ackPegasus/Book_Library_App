import * as at from './ActionTypes';




export const addBook = (book) => {
    return {
        type: at.ADD_BOOK,
        payload: book

    }
}
// return action with type : at.ADD_BOOK type of action which should happen
// and payload with additional info

export const deleteBook = (bookId) => {
    return{
        type: at.DELETE_BOOK,
        payload: bookId
    }
}