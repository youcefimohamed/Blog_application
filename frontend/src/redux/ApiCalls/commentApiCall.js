import { toast } from "react-toastify"
import request from "../../utils/request"
import { commentActions } from "../slices/commentSlice"
import { postActions } from "../slices/postSlices"

// create Comment
export function createComment(newComment) {
   return async (dispatch,getState) =>{
      try {
         const {data} =  await request.post(`/api/comments`,newComment,
         {headers : {
            'Authorization': `Bearer ${getState().auth.user.token}`,
         }})
         dispatch(postActions.addCommenttoPost(data))
   }catch(error){ 
      toast.error(error.response.data.message)
   }
   
}  
}
// update Comment
export function updateComment(commentId,comment) {
   return async (dispatch,getState) =>{
      try {
         const {data} =  await request.put(`/api/comments/${commentId}`,comment,
         {headers : {
            'Authorization': `Bearer ${getState().auth.user.token}`,
         }})
         dispatch(postActions.updateCommentPost(data))
   }catch(error){ 
      toast.error(error.response.data.message)
   }
   
}  
}
// delete Comment
export function DeleteComment(commentId) {
   return async (dispatch,getState) =>{
      try {
         const {data} = await request.delete(`/api/comments/${commentId}`,
         {headers : {
            'Authorization': `Bearer ${getState().auth.user.token}`,
         }})
         dispatch(postActions.DeleteCommentFromPost(commentId))
         dispatch(commentActions.deleteComment(commentId))
   }catch(error){ 
      toast.error(error.response.data.message)
   }
}  
}




// get Comments
export function getComments() {
   return async (dispatch,getState) =>{
      try {
         const {data} = await request.get(`/api/comments`,
         {headers : {
            'Authorization': `Bearer ${getState().auth.user.token}`,
         }})
         dispatch(commentActions.setComments(data))
   }catch(error){ 
      toast.error(error.response.data.message)
   }
}  
}