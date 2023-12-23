import React, { useState } from "react";
import "./comment-list.css";
import swal from "sweetalert";
import UpdateComment from "./UpdateComment";
import Moment from 'react-moment'
import { useDispatch, useSelector } from "react-redux";
import { DeleteComment } from "../../redux/ApiCalls/commentApiCall";

function CommentList({comments}) {

   const dispatch = useDispatch();
   const  {user}  =useSelector(state=>state.auth)


   const [updateComment,setUpdateComment]  = useState(false)
   const [commentForUpdate,setCommentForUpdate]  = useState(null)

      // update comment handler 
      const updateCommentHandler = (comment)=>{
         setCommentForUpdate(comment)
         setUpdateComment(true)
      }

      // Delete Comment Handler
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
      <div className="comment-list">
         <h4 className="comment-list-count">{comments?.length} comments</h4>
         {comments?.map((comment) => {
            return (
               <div key={comment._id} className="comment-item">
                  <div className="comment-item-info">
                     <div className="comment-item-username">{comment.username}</div>
                     <div className="comment-item-time">
                        <Moment fromNow ago>
                        {comment.createdAt} 
                        </Moment>
                        {" " + 'ago'}
                     </div>
                  </div>
                  <p className="comment-item-text">
                     {comment.text}
                  </p>
                  {
                  comment.user === user?._id &&
                  <div className="comment-item-icon-wrapper">
                     <i onClick={()=>updateCommentHandler(comment)} className="bi bi-pencil-square"></i>
                     <i onClick={()=>{deleteCommentHandler(comment?._id)}} className="bi bi-trash-fill"></i>
                  </div>
                  }
               </div>
            );
         })}
         {/* Update comment */}
         {updateComment 
          && (<UpdateComment commentForUpdate= {commentForUpdate} setUpdateComment = {setUpdateComment}/> )}
      </div>
   );
}

export default CommentList;
