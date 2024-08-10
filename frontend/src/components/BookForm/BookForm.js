import  "./BookForm.css"
import {useState} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {addBook , thankFunction , fetchBook} from "../../redux/slices/bookSlice";
import booksData from "../../data/books.json"
import CreateBookWithID from "../../utils/CreateBookWithID";
import {setError} from "../../redux/slices/errorSlice";
import {FaSpinner} from "react-icons/fa";
import {selectIsLoading} from "../../redux/slices/bookSlice";

const BookForm = () => {

    const [title,setTitle] = useState("")
    const [author , setAuthor] = useState("")
    const dispatch = useDispatch()
    const isLoading = useSelector(selectIsLoading);

    const handleSubmit = (e)=>{

        e.preventDefault()

        if (title && author){

            const newBook = CreateBookWithID({title, author},'user')

            dispatch(addBook(newBook))

            setTitle("")
            setAuthor("")
        }
        else{
            dispatch(setError('Title and author are required'))
        }

    }


    const handleRandomBook = ()=>{
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = booksData[randomIndex];
        dispatch(addBook(CreateBookWithID(randomBook,'random')))
    }



    const handleAddRandomViaApi = () =>{
            //sent async function to redux so it can call it  and in code now we work only usual functions
           dispatch(fetchBook("http://localhost:4000/random-book"))

    }

    return (
        <div className="app-block book-form">
            <h2> Add a New Book </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" value={title}
                           onChange={(e)=> {setTitle(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor="author">Author</label>
                    <input type="text" id="author" value={author}
                           onChange={(e)=> {setAuthor(e.target.value)}}/>
                </div>
                <button type="submit">Add Book</button>
                <button type="button" onClick={handleRandomBook}>Add Random</button>
                <button type = "button" onClick={handleAddRandomViaApi} disabled={isLoading}>
                    {isLoading ? (<>
                    <span> Is Loading </span>
                    <FaSpinner className="spinner"/>
                     </>):
                    " Add random via API"}
                   </button>
            </form>
        </div>
    )
}
export default BookForm;