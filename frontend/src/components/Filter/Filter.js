import './Filter.css'
import {useDispatch, useSelector} from 'react-redux'
import {selectTitleFilter, setTitleFilter} from "../../redux/slices/filterSlice";


const Filter = ()=>{
    const dispatch = useDispatch();
    const filterTitle = useSelector(selectTitleFilter);

    const handleTitleFilterChange=(e)=>{
        dispatch(setTitleFilter(e.target.value));
    }
    return(
        <div className= "app-block filter">
            <div className = "filter-group">
                <input
                    type ="text"
                    value={filterTitle} //make it controlled
                    placeholder="Filter by title..."
                    onChange={handleTitleFilterChange} />
            </div>
        </div>
    )
}
export default Filter;


