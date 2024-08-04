import {useDispatch, useSelector} from "react-redux";
import "./BookList.css";
import {deleteBook} from "../../redux/Books/ActionCreator";


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

