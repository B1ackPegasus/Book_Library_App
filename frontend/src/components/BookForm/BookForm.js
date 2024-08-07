import  "./BookForm.css"
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addBook} from "../../redux/Books/ActionCreator";
import booksData from "../../data/books.json"
import CreateBookWithID from "../../utils/CreateBookWithID";
import axios, {isAxiosError} from "axios";
import createBookWithID from "../../utils/CreateBookWithID"; // to do request to API

const BookForm = () => {

    const [title,setTitle] = useState("")
    const [author , setAuthor] = useState("")
    const dispatch = useDispatch()


    const handleSubmit = (e)=>{

        e.preventDefault()

        if (title && author){

            const newBook = CreateBookWithID({title, author},'user')

            dispatch(addBook(newBook))

            setTitle("")
            setAuthor("")
        }
    }


    const handleRandomBook = ()=>{
        const randomIndex = Math.floor(Math.random() * booksData.length);
        const randomBook = booksData[randomIndex];
        dispatch(addBook(CreateBookWithID(randomBook,'random')))
    }


    const thankFunction = async (dispatch,getState)=> {
        try {
            const response = await axios.get("http://localhost:4000/random-book") //wait until  info come
            if (response?.data?.title && response?.data?.author) { //use ? so if it  undefined we wont get error
                dispatch(addBook(createBookWithID(response.data, 'api')))
            }
        } catch (error) {
            console.log(error)
        }
    }
     //use async so code can continue
    //better to write it in Slice (bookSlice)


    const handleAddRandomViaApi = () =>{
            //sent async function to redux so it can call it  and in code now we work only usual functions
            dispatch(thankFunction)

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
                <button type = "button" onClick={handleAddRandomViaApi}>Add random via API</button>
            </form>
        </div>
    )
}
export default BookForm;