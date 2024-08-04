import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title:''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers:{
            setTitleFilter:(state, action) =>{
            return {...state , title:action.payload}
            // mutate state with Slices ex state.title='' using Immer => create new object with changes autom.
        }

    }
})

//action creator created automatically  (type :filter/setTitleFilter based on reducer name)
//filterSlice.actions.setTitleFilter('toPayload')


export const {setTitleFilter} = filterSlice.actions

export const selectTitleFilter = (state)=> state.filter.title;//subscribe to changes title

//return reducer
export default filterSlice.reducer