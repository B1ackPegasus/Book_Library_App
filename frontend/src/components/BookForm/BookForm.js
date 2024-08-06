import  "./BookForm.css"
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addBook} from "../../redux/slices/bookSlice";
import booksData from "../../data/books.json"
import CreateBookWithID from "../../utils/CreateBookWithID";

const BookForm = () => {

    const [title,setTitle] = useState("")
    const [author , setAuthor] = useState("")
    const dispatch = useDispatch()


    const handleSubmit = (e)=>{

        e.preventDefault()

        if (title && author){

            const newBook = CreateBookWithID({title, author})

            dispatch(addBook(newBook))

            setTitle("")
            setAuthor("")
        }
    }


    const handleRandomBook = ()=>{
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = booksData[randomIndex];
        dispatch(addBook(CreateBookWithID(randomBook)))
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
            </form>
        </div>
    )
}
export default BookForm;