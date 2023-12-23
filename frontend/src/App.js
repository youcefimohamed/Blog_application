import Header from "./components/header/Header";
import Home from "./Pages/home/Home"
import AdminDashbord from "./Pages/Admin/AdminDashbord"
import CreatePost from "./Pages/Create Post/CreatePost.jsx"
import  {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Register from "./Pages/forms/register";
import Login from "./Pages/forms/login";
import PostPage from "./Pages/Post Page/PostPage";
import Footer from './components/footer/footer.jsx'
import PostDetails from "./Pages/post-details/PostDetails";
import { ToastContainer} from 'react-toastify'
import Category from "./Pages/category/Category";
import Profile from "./Pages/profile page/Profile";
import UsersTable from "./Pages/Admin/UsersTable";
import PostsTable from "./Pages/Admin/PostsTable";
import CategoriesTable from "./Pages/Admin/CategoryTable";
import CommentsTable from "./Pages/Admin/CommentsTable";
import ForgetPassword from "./Pages/forms/ForgetPassword";
import ResetPassword from "./Pages/forms/ResetPassword";
import NotFound from "./Pages/not-found/NotFound";
import { useSelector } from "react-redux";
import VerifyEmail from "./Pages/verify-email/VerifyEmail";

function App() {
  const {user} = useSelector((state)=>state.auth)
  return (
    <BrowserRouter>
            <ToastContainer
      position="top-right"
      autoClose={2000}
      closeOnClick
      limit={2}
      theme="colored"
      />
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}  />
        <Route path="/login" element={ !user ? <Login/> :  <Navigate to="/" /> }  />
        <Route path="/register" element={!user ? <Register/> :  <Navigate to="/"/>}  />
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail/> :  <Navigate to="/"/>}  />
        <Route path="/forget-password" element={<ForgetPassword/>}  />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword/>}  />
        <Route path="/profile/:id" element={<Profile/>}  />

        <Route path="/posts" element={<PostPage/>}  />
        <Route path="/posts/create-post" element={user ? <CreatePost /> :  <Navigate to="/"/>}   />
        <Route path="/posts/details/:id" element={<PostDetails/>}  />
        <Route path="/posts/categories/:category" element={<Category/>}  />

          

        <Route path="/admin-dashboard" element={user?.isAdmin ? <AdminDashbord/> :  <Navigate to="/"/>}  />
        <Route path="/admin-dashboard/users-table" element={user?.isAdmin ? <UsersTable/> :  <Navigate to="/"/>}  />
        <Route path="/admin-dashboard/posts-table" element={user?.isAdmin ? <PostsTable/> :  <Navigate to="/"/>}  />
        <Route path="/admin-dashboard/categories-table" element={user?.isAdmin ? <CategoriesTable/> :  <Navigate to="/"/>}  />
        <Route path="/admin-dashboard/comments-table" element={user?.isAdmin ? <CommentsTable/> :  <Navigate to="/"/>}  />
        <Route path='*' element={<NotFound/>}/>
        
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
