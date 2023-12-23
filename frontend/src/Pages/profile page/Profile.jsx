import "./profile.css";
import { useEffect, useState } from "react";
import {logoutUser} from '../../redux/ApiCalls/authApiCall'
import UpdateProfileModal from "./UpdateProfileModel";
import swal from "sweetalert";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/ApiCalls/profileApiCall";
import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../../components/posts/postItem";
import {Oval} from "react-loader-spinner"


const Profile = () => {

  const [updateProfile, setUpdateProfile] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch()
  const {profile,loading,isProfileDeleted} = useSelector(state=>state.profile)
  const {user} = useSelector(state=>state.auth)
  const {id} =useParams()


  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUserProfile(id))
  }, [id]);

  
  useEffect(() => {
    if(isProfileDeleted){
      navigate("/")
    }
  }, [isProfileDeleted]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(!file) return toast.warning("there is no file!");

    const formData = new FormData()
    formData.append("image",file)
      dispatch(uploadProfilePhoto(formData))

  }

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser())
      } 
    });
  }
  if(loading){
    return (
    <div className="profile-loader">
      <Oval
        height={120}
        width={120}
        color="#000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="grey"
        strokeWidth={3}
        strokeWidthSecondary={3}
        />
      
    </div>
          )
  }

  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} alt="" className="profile-image" />
          {user?._id===profile?._id &&
            <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="bi bi-camera-fill upload-profile-photo-icon"
              ></label>
            </abbr>
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
                onChange={e => setFile(e.target.files[0])}
              />
              <button type="submit" className=" upload-profile-photo-btn">upload</button>
            </form>
          }
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">
          {profile?.bio}
        </p>
        <div className="user-date-joined">
          <strong className="text-light">Date Joined: </strong>
          <span className="text-success">{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {
          user?._id===profile?._id &&
          <>
            <button onClick={() => setUpdateProfile(true)} className="btn btn-success p-3 profile-update-btn">
              <i className="bi bi-file-person-fill"></i>
              Update Profile
            </button>
            <button onClick={deleteAccountHandler} className="btn btn-danger delete-account-btn">
              Delete Your Account
            </button>
          </>
        }
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        {profile?.posts?.length !==0 ?

          (profile?.posts?.map(post=>{
            return <PostItem  
            key={post._id} 
            username = {profile?.username}  
            post={post}
            userId={profile?._id}
            />
          }))
          : 
          <div className="text-warning fs-4 fw-bold text-center">
              no posts in this profile
            </div>

        }
      </div>
      {updateProfile && <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />}
    </section>
  );
};

export default Profile;
