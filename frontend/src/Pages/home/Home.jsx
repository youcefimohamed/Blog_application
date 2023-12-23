import React, { useEffect } from 'react'
import "./Home.css"
import PostList from '../../components/posts/postList'
import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector, } from  'react-redux'
import { fetchPosts } from '../../redux/ApiCalls/postApiCall'
import { fetchCategories } from '../../redux/ApiCalls/categoryApiCall'
function Home() {
  const dispatch = useDispatch()
  const {posts} =  useSelector(state=>state.post)

  useEffect(()=>{
    dispatch(fetchPosts(1))
    dispatch(fetchCategories())

  },[])

  return (
    <section className='home'>
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className='home-title'>Welcome to Blog</h1>
        </div>
      </div>
      <div className="home-lastest-post">Lastest Post</div>
      <div className="home-container">
        <PostList posts ={posts}/>
        <Sidebar/>
      </div>
      <div className="home-see-posts-link">
        <Link to="/posts" className='home-link'>See All Posts</Link>
      </div>
    </section>
  )
}

export default Home