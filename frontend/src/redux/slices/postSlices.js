import {createSlice} from '@reduxjs/toolkit'


const postSlice = createSlice({
   name:'post',
   initialState:{
      posts:[],
      postsCount : null,
      postsCate:[],
      loading:false,
      isPostCreated:false,
      post:null,

      


   },
   reducers:{
      setPosts(state,action){
         state.posts = action.payload
      },
      setPostsCount(state,action){
         state.postsCount = action.payload
      },
      setPostsCate(state,action){
         state.postsCate = action.payload
      },
      setLoading(state,action){
         state.loading=true;
      },
      clearLoading(state,action){
         state.loading=false;
      },
      setIsPostCreated(state,action){
         state.isPostCreated=true;
         state.loading = false;
      },
      clearIsPostCreated(state,action){
         state.isPostCreated=false;
      },
      setPost(state,action){
            state.post = action.payload
      },
      setLikes(state,action){
         state.post.likes = action.payload.likes
      },
      deletePost(state,action){
         state.posts = state.posts.filter(p => p._id !==action.payload)
      },
      addCommenttoPost(state,action){
         state.post.comments.push(action.payload)
      },
      updateCommentPost(state,action){
         state.post.comments = state.post.comments.map(comment=>
            comment._id===action.payload._id ? action.payload :comment
            )
      },
      DeleteCommentFromPost(state,action){
         const comment = state.post.comments.find(c=>c._id===action.payload);
         const commentIndex = state.post.comments.indexOf(comment)
         state.post.comments.splice(commentIndex,1)
      },


   }
})


const postActions = postSlice.actions
const postReducer = postSlice.reducer

export {postActions,postReducer}