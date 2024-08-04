import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title:'',
    author:''
}

const filterSlice = createSlice({
    name: 'filter',
    initialState: initialState,
    reducers:{
            setTitleFilter:(state, action) =>{
            return {...state , title:action.payload}
            // mutate state with Slices ex state.title='' using Immer => create new object with changes autom.

            },
            setAuthorFilter:(state, action) =>{
                return{...state ,author:action.payload}
            },
            resetFilter:(state,action) =>{
                    return initialState
            }


    }
})

//action creator created automatically  (type :filter/setTitleFilter based on reducer name)
//filterSlice.actions.setTitleFilter('toPayload')


export const {setTitleFilter , resetFilter,setAuthorFilter} = filterSlice.actions

export const selectAuthorFilter = (state) => state.filter.author
export const selectTitleFilter = (state)=> state.filter.title;//subscribe to changes title

//return reducer
export default filterSlice.reducer