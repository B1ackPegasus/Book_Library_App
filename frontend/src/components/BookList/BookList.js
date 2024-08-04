import {useDispatch, useSelector} from "react-redux";
import "./BookList.css";
import {deleteBook, makeBookAsFavourite} from "../../redux/Books/ActionCreator";
import { BsBookmarkHeart } from "react-icons/bs";
import { BsBookmarkHeartFill } from "react-icons/bs";

const BookList = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books); //every time books will change => rerender




    return(
        <div className="app-block book-list">
            <h2>Book List</h2>
            {books.length ===0 ? (
            <p>No books available</p>
                ):(
                    <ul>
                        {books.map((book,i) => (
                            <li key={i}>
                                <div className="book-info">
                                    {++i}.{book.title} by <strong>{book.author}</strong>
                                </div>
                                <span onClick={()=>dispatch(makeBookAsFavourite(book.id))}>
                                {book.isFavourite ? (
                                    <BsBookmarkHeartFill  className="star-icon"/>
                                ):(
                                    <BsBookmarkHeart className="star-icon"/>
                                )
                                }
                                </span>
                                <div className="book-actions">
                                    <button
                                        onClick={() => {dispatch(deleteBook(book.id))}}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
            )}
        </div>
    )
}
export default BookList;

