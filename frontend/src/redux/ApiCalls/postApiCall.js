import request from "../../utils/request";
import { toast } from "react-toastify";
import { postActions } from "../slices/postSlices";



// fetch post based on page number 
export function fetchPosts(pageNumber) {
   return async (dispatch) =>{
      try {
         const {data} =  await request.get(`/api/posts?pageNumber=${pageNumber}`)
         dispatch(postActions.setPosts(data))
   }catch(error){
      toast.error(error.response.data.message)
   }
   
}  
}
// fetch posts 
export function fetchAllPosts() {
   return async (dispatch) =>{
      try {
         const {data} =  await request.get(`/api/posts`)
         dispatch(postActions.setPosts(data))
   }catch(error){
      toast.error(error.response.data.message)
   }
   
}  
}

// Get post Count
export function getPostsCount() {
   return async (dispatch) =>{
      try {
         const {data} =  await request.get(`/api/posts/count`)
         dispatch(postActions.setPostsCount(data))
   }catch(error){
      toast.error(error.response.data.message)
   }
   
}  
}
// fetch post based on page number
export function fetchPostsBasedOnCategory(category) {
   return async (dispatch) =>{
      try {
         const {data} =  await request.get(`/api/posts?category=${category}`)
         dispatch(postActions.setPostsCate(data))
   }catch(error){
      toast.error(error.response.data.message)
   }
   
}  
}
// Create post 
export function createPosts(newPost) {
   return async (dispatch,getState) =>{
      try {

         dispatch(postActions.setLoading());
         await request.post(`/api/posts`
         ,newPost,
         {
            headers:{
               'Content-Type':'multipart/form-data',
               Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo')).token}`
               },
         }
         )
         dispatch(postActions.setIsPostCreated())

         setTimeout(()=>{
            dispatch(postActions.clearIsPostCreated())
         },1200)
   }catch(error){
      toast.error(error.response.data.message)
      dispatch(postActions.clearLoading())
   }
   
}  
}


// fetch single post 
export function fetchSinglePost(PostId) {
   return async (dispatch) =>{
      try {
         const {data} =  await request.get(`/api/posts/${PostId}`)
         dispatch(postActions.setPost(data))
   }catch(error){
      toast.error(error.response.data.message)
   }
   
}  
}


// toggle Like post 
export function toggleLikePost(PostId) {
   return async (dispatch,getState) =>{
      try {
         const {data} =  await request.put(`/api/posts/like/${PostId}`
         ,{}
         ,{headers : {'Authorization': `Bearer ${getState().auth.user.token}`}
         
      })
         dispatch(postActions.setLikes(data))
   }catch(error){
      toast.error(error.response.data.message)
   }
   
}  
}


// update  post  Image
export function updatePostImage(PostId,newImage) {
   return async (dispatch,getState) =>{
      try {
         await request.put(`/api/posts/upload-image/${PostId}`
         ,newImage
         ,{headers : {
            'Authorization': `Bearer ${getState().auth.user.token}`,
            "Content-Type" : "multipart/form-data",
         }
      })
      toast.success('new post Image uploaded successfully')
   }catch(error){
      toast.error(error.response.data.message)
   }
   
}  
}

// update  post  
export function updatePost(PostId,newPost) {
   return async (dispatch,getState) =>{
      try {
         const {data} =  await request.put(`/api/posts/${PostId}`
         ,newPost
         ,{headers : {
            'Authorization': `Bearer ${getState().auth.user.token}`,
         }
      })
      dispatch(postActions.setPost(data))
   }catch(error){ 
      toast.error(error.response.data.message)
   }
   
}  
}
// Delete  post  
export function deletePost(PostId) {
   return async (dispatch,getState) =>{
      try {
         const {data} =  await request.delete(`/api/posts/${PostId}`
         ,{headers : {
            'Authorization': `Bearer ${getState().auth.user.token}`,
         }
      })
      dispatch(postActions.deletePost(data.postID))
      toast.success(data.message)

   }catch(error){ 
      toast.error(error.response.data.message)
   }
   
}  
}



