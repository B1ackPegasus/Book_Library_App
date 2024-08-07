import {v4 as uuid} from 'uuid';

const CreateBookWithID = (book,source) => {
    return{
        ...book,
        source,
        isFavourite:false,
        id: uuid(),
    }
}
export default CreateBookWithID;