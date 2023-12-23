import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import './admin-table.css'
import { Link } from 'react-router-dom'
import swal from "sweetalert"
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, fetchAllPosts } from '../../redux/ApiCalls/postApiCall'

function PostsTable() {

   const dispatch = useDispatch()
   const {posts, isPostDeleted } = useSelector(state=>state.post)
  
   useEffect(()=>{
     dispatch(fetchAllPosts())
   },[isPostDeleted])
   



      // Delete Post Handler
      const deletePostHandler = (PostId) => {
         swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
         })
            .then((willDelete) => {
               if (willDelete) {
                  dispatch(deletePost(PostId))
               } 
            });
      }
   
   return (
      <section className='tablee-container'>
         <AdminSidebar />
         <div className="tablee-wrapper">
            <h1 className="tablee-title">Posts</h1>
            <table className="tablee">
               <thead>
                  <tr>
                     <th>Count</th>
                     <th>User</th>
                     <th>Post Title</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {posts?.map((item,index) => {
                     return (<tr key={item._id}>
                        <td>{index+1}</td>
                        <td>
                           <div className="tablee-image">
                              <img
                                 src={item.user?.profilePhoto.url}
                                 alt="error"
                                 className='tablee-user-image' />
                              <span className='tablee-username'>
                                 {item.user.username}
                              </span>
                           </div>
                        </td>
                        <td>{item.title}</td>
                        <td>
                           <div className="tablee-button-group">
                              <button>
                                 <Link to={`/posts/details/${item._id}`}>View Post</Link>
                              </button>
                              <button onClick={()=>deletePostHandler(item._id)}>
                              Delete Post
                              </button>
                           </div>
                        </td>

                     </tr>)
                  })}
               </tbody>

            </table>
         </div>
      </section>
   )
}

export default PostsTable