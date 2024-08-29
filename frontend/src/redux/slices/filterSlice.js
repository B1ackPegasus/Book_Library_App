import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title:'',
    author:'',
    onlyFavourite:false
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
            resetFilter:() =>{
                    return initialState
            },
            showFavourite:(state,action)=>{
                return {...state , onlyFavourite:!state.onlyFavourite}
            }



    }
})

//action creator created automatically  (type :filter/setTitleFilter based on reducer name)
//filterSlice.actions.setTitleFilter('toPayload')



export const {setTitleFilter
             ,resetFilter
             ,setAuthorFilter
             ,showFavourite
             } = filterSlice.actions

//функуия которая вернет екшн (type : filter/setTitleFilter payload : )


export const selectAuthorFilter = (state) => state.filter.author
export const selectTitleFilter = (state)=> state.filter.title;//subscribe to changes title
export const selectOnlyFavourite = (state)=> state.filter.onlyFavourite;
//selector for every


//return reducer
export default filterSlice.reducer