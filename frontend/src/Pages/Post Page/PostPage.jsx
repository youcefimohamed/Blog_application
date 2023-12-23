import React, { useEffect, useState } from 'react'
import './post-page.css'
import PostList from '../../components/posts/postList'
import Sidebar from '../../components/sidebar/Sidebar'
import Pagination from '../../components/pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getPostsCount } from '../../redux/ApiCalls/postApiCall'
function PostPage() {

  const POST_PER_PAGE =3;

  const dispatch  = useDispatch()

  const [currentPage,setCurrentPage]  =useState(1)

  const {postsCount,posts} = useSelector(state=>state.post)

  const pages = Math.ceil(postsCount / POST_PER_PAGE)

  useEffect(()=>{
    const scrollOptions = {
      top: 0,
      behavior: 'auto' 
    };
    window.scrollTo(scrollOptions); 
    dispatch(fetchPosts(currentPage))   
  },[currentPage])

  useEffect(()=>{
    dispatch(getPostsCount())
  },[])
  return (
    <>
    <section className="posts-page">
      <PostList posts={posts} />
      <Sidebar />
    </section>
    <Pagination 
    pages={pages} 
    currentPage={currentPage} 
    setCurrentPage = {setCurrentPage}
    />
    </>
  )
}

export default PostPage