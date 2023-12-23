import React, { useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import './admin-table.css'
import swal from "sweetalert"
import { useDispatch, useSelector } from 'react-redux';
import { DeleteComment, getComments } from '../../redux/ApiCalls/commentApiCall';


function CommentsTable() {

  const dispatch = useDispatch()
  const {comments} = useSelector(state=>state.comment)

  useEffect(()=>{
    dispatch(getComments())
  },[])

  // Delete Post Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          dispatch(DeleteComment(commentId))
        } 
      });
  }

  return (
    <section className='tablee-container'>
      <AdminSidebar />
      <div className="tablee-wrapper">
        <h1 className="tablee-title">Comments</h1>
        <table className="tablee">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((item, index) => {
              return (<tr key={item._id}>
                <td>{index+1}</td>
                <td>
                  <div className="tablee-image">
                    <img
                      src={item.user.profilePhoto?.url}
                      alt="error"
                      className='tablee-user-image' />
                    <span className='tablee-username'>
                      {item.username}
                    </span>
                  </div>
                </td>
                <td>{item.text}</td>
                <td>
                  <div className="tablee-button-group">
                    <button onClick={()=>deleteCommentHandler(item._id)}>
                      Delete Comment
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

export default CommentsTable