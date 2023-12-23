import React, { useEffect, useState } from 'react'
import './postDetails.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify"
import swal from "sweetalert"
import AddComments from '../../components/comments/AddComments'
import CommentList from '../../components/comments/commentList'
import UpdatePostModel from './UpdatePostModel'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, fetchSinglePost, toggleLikePost, updatePostImage } from '../../redux/ApiCalls/postApiCall'
function PostDetails() {

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { post } = useSelector(state => state.post)
   const  {user}  =useSelector(state=>state.auth)
   const { id } = useParams()

   const [file, setFile] = useState(null)

   const [updatePost, setUpdatePost] = useState(false)

   useEffect(() => {
      const scrollOptions = {
         top: 0,
         behavior: 'auto'
      };
      window.scrollTo(scrollOptions);

      dispatch(fetchSinglePost(id))
   }, [id])

   // Update Image submit handler
   const UpdateImageSubmitHandler = (e) => {
      e.preventDefault()
      if (!file) {
         return toast.warning("there is no file")
      }
      const formData = new FormData();
      formData.append('image', file);
      dispatch(updatePostImage(post?._id,formData))
   }


   // Delete Post Handler
   const deletePostHandler = (e) => {
      swal({
         title: "Are you sure?",
         text: "Once deleted, you will not be able to recover this Post!",
         icon: "warning",
         buttons: true,
         dangerMode: true,
      })
         .then((isOk) => {
            if (isOk) {
               dispatch(deletePost(post?._id))
               navigate(`/profile/${user._id}`)
               
            } else {
               swal("Something went wrong !");
            }
         });
   }


   return (
      <section className="post-details">
         <div className="post-details-image-wrapper">
            <img src={file ? URL.createObjectURL(file) : post?.image.url} alt="" className="post-details-image" />

            {
               post?.user._id === user?._id &&
               <form onSubmit={UpdateImageSubmitHandler} className='update-post-image-form'>
                  <label htmlFor="file" className="update-post-label">
                     <i className="bi bi-image-fill"></i>
                     Select New Image
                  </label>
                  <input
                     onChange={(e) => { setFile(e.target.files[0]) }}
                     style={{ display: "none" }}
                     type="file"
                     name="file"
                     id="file" />
                  <button type="submit" >Upload</button>
               </form>
            }
         </div>
         <div className="post-details-user-info">
            <img src={post?.user.profilePhoto?.url} alt="" className="post-details-user-image" />
            <div className="post-details-user">
               <strong>
                  <Link to={`/profile/${post?.user._id}`}>{post?.user.username} </Link>
               </strong>
               <span>{new Date(post?.createdAt).toDateString()} </span>
            </div>
         </div>
         <h1 className="post-details-title">{post?.title}</h1>
         <p className="post-details-description">{post?.description}
         </p>
         <div className="post-details-icon-wrapper">
            <div>
               {user &&
               <i 
               className={post?.likes.includes(user?._id) ?
                  "bi bi-hand-thumbs-up-fill" :
                  'bi bi-hand-thumbs-up'
               }
               onClick={()=>{dispatch(toggleLikePost(post?._id))}}
               ></i>
               }
               
               <small>{post?.likes.length} likes</small>
            </div>

            {
               post?.user._id === user?._id &&

               (<div>
                  <i onClick={() => setUpdatePost(true)} className="bi bi-pencil-square"></i>
                  <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
               </div>)

            }

         </div>
            {
               user ?
               <AddComments postId = {post?._id} />
               :
               <p className='post-details-info-write'>
                  to write a comment you should login first
                  <Link to={"/login"} 
                  className='text-success fw-bold ms-2'
                  style={{textDecoration:"underline"}}
                  >Login to Your Account</Link>
               </p>
            }
         <CommentList comments={post?.comments} />
         {updatePost && <UpdatePostModel post={post} setUpdatePost={setUpdatePost} />}
      </section>
   )
}

export default PostDetails