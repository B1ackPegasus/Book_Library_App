import './Filter.css'
import {useDispatch, useSelector} from 'react-redux'

import {selectTitleFilter,
        selectAuthorFilter,
        selectOnlyFavourite,
        resetFilter,
        setTitleFilter,
        setAuthorFilter,
        showFavourite
        } from "../../redux/slices/filterSlice";


const Filter = ()=>{
    const dispatch = useDispatch();
    const filterTitle = useSelector(selectTitleFilter);
    const filterAuthor = useSelector(selectAuthorFilter);
    const showFavouriteBooks = useSelector(selectOnlyFavourite);

    const handleTitleFilterChange=(e)=>{
        dispatch(setTitleFilter(e.target.value));
    }

    const handleResetFilters = () =>{
        dispatch(resetFilter())
    }

    const handleAuthorFilterChange=(e)=>{
        dispatch(setAuthorFilter(e.target.value))
    }

    const handleOnlyFavouriteFilterChange=(e)=>{
        dispatch(showFavourite())
    }

    return(
        <div className="app-block filter">
            <div className="filter-row">
                <div className="filter-group">
                    <input
                        type="text"
                        value={filterTitle} //make it controlled
                        placeholder="Filter by title..."
                        onChange={handleTitleFilterChange}/>
                </div>
                <div className="filter-group">
                    <input
                        type="text"
                        value={filterAuthor}
                        placeholder="Filter by author..."
                        onChange={handleAuthorFilterChange}/>
                </div>
                <div className="filter-group">
                    <label>
                    <input type = "checkbox"
                           checked={showFavouriteBooks}
                           onChange={handleOnlyFavouriteFilterChange}/>Favourite
                    </label>
                </div>
                <button type="button" onClick={handleResetFilters}>Reset Filters</button>
            </div>
        </div>

    )
}
export default Filter;


