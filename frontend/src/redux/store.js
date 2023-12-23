import { configureStore} from "@reduxjs/toolkit"
import { authReducer } from "./slices/authSlices"
import { profileReducer } from "./slices/profileSlice"
import { postReducer } from "./slices/postSlices"
import { categoryReducer } from "./slices/categorySlice"
import { commentReducer } from "./slices/commentSlice"
import { passwordReducer } from "./slices/passwordSlice"

const store = configureStore({
   reducer:{
      auth: authReducer,
      profile : profileReducer,
      post : postReducer,
      category:categoryReducer,
      comment:commentReducer,
      password:passwordReducer
      
   }
})

export default store