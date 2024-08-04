import {v4 as uuid} from 'uuid';
const CreateBookWithID = (book) => {
    return{
        ...book,
        isFavourite:false,
        id: uuid()
    }
}
export default CreateBookWithID;