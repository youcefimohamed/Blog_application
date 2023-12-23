import {React, useEffect} from 'react'
import {useParams,Link} from "react-router-dom"
import './category.css'
import PostList from '../../components/posts/postList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsBasedOnCategory } from '../../redux/ApiCalls/postApiCall'
function Category() {
   const {category} = useParams()

   const dispatch  = useDispatch()
   const {postsCate}  = useSelector(state=>state.post)
   useEffect(()=>{
      dispatch(fetchPostsBasedOnCategory(category))
      window.scrollTo(0,0)
   }
      ,[category])
   return (
    <section className='category container'>
      {postsCate.length === 0 ?
      <>
         <h1 className='category-npt-found '>Posts with <span className='text-danger'>{category}</span> categroy not Found</h1>
         <Link to={"/posts"} className="category-not-found-link">Go to Post Page</Link>
      </>

      :
      <>
         <h1 className="category-title">Posts Based On {category}</h1>
         <PostList posts={postsCate}/>
      </>
      }
    </section>
  )
}

export default Category