import {createSlice} from '@reduxjs/toolkit'


const passwordSlice = createSlice({
   name:'password',
   initialState:{
      isError:false,

   },
   reducers:{
      setError(state,action){
         state.isError = true
      },

   }
})


const passwordActions = passwordSlice.actions
const passwordReducer = passwordSlice.reducer

export {passwordActions,passwordReducer}