import {useDispatch, useSelector} from "react-redux";
import "./BookList.css";
import {deleteBook, makeBookAsFavourite} from "../../redux/Books/ActionCreator";
import { BsBookmarkHeart } from "react-icons/bs";
import { BsBookmarkHeartFill } from "react-icons/bs";
import {selectAuthorFilter, selectTitleFilter , selectOnlyFavourite} from "../../redux/slices/filterSlice";


const BookList = () => {
    const dispatch = useDispatch();
    const books = useSelector(state => state.books); //every time books will change => rerender
    const titleFilter = useSelector(selectTitleFilter);
    const authorFilter = useSelector(selectAuthorFilter);
    const onlyFavouriteFilter = useSelector(selectOnlyFavourite);

    const filteredBooks = books.filter((book)=>{
        const matchesTitle = book.title
            .toLowerCase()
            .includes(titleFilter.toLowerCase()) &&
            book.author
            .toLowerCase()
            .includes(authorFilter.toLowerCase());
        const matchesFavourite = onlyFavouriteFilter ? book.isFavourite : true;

            return matchesTitle && matchesFavourite;
    });


    return(
        <div className="app-block book-list">
            <h2>Book List</h2>
            {books.length === 0 ? (
            <p>No books available</p>
                ):(
                    <ul>
                        {filteredBooks.map((book,i) => (
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

