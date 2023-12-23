import React from 'react'
import PostItem from './postItem'
import './post.css'
function PostList({posts}) {
  return (
    <div className='post-list'>
      {posts?.map((item)=>{
         return <PostItem post ={item} key={item._id} />
      })}
    </div>
  )
}

export default PostList