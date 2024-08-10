import {useDispatch, useSelector} from "react-redux";
import "./BookList.css";
import {makeBookAsFavourite, deleteBook, selectBooks} from "../../redux/slices/bookSlice";
import { BsBookmarkHeart } from "react-icons/bs";
import { BsBookmarkHeartFill } from "react-icons/bs";
import {selectAuthorFilter, selectTitleFilter , selectOnlyFavourite} from "../../redux/slices/filterSlice";


const BookList = () => {
    const dispatch = useDispatch();
    const books = useSelector(selectBooks); //every time books will change => rerender
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


    const highligtMatch = (text, filter) =>{
        if (!filter) return text ;
        const regex = new RegExp(`(${filter})`,'gi'); //if we use () we won't delete filter
        return text.split(regex).map((substring, i) =>{
            if (substring.toLowerCase()===filter.toLowerCase()){
                return(
                    <span key={i} className="highlight">{substring}</span>
                );
            }
            return substring;
        })

    }

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
                                    {++i}.{highligtMatch(book.title , titleFilter)} by
                                    <strong> {highligtMatch(book.author,authorFilter)} </strong>
                                    ({book.source})
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

