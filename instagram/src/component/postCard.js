import { getDownloadURL, ref, getMetadata } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { db, firebaseStorage } from '../utils/firebase';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import likedicon from "../assets/images/liked.png";
import unlikedicon from "../assets/images/unliked.png";
import Comment from './comment';

// design the post card using the data that has been send
const PostCard = ({ data }) => {
  // getting reference of storage path
  const postref = ref(firebaseStorage, data.path);
  // initializing url user like videometadata and new post
  const [url, setUrl] = useState("");
  const [user, setUser] = useState("");
  const [liked, setLike] = useState();
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [isNewPost, setIsNewPost] = useState(false);
  // logged user detail
  const currentUser = useSelector(state => state.auth.authDetail);
  const navigate = useNavigate();
  // getting the post data from the storage
  useEffect(() => {
    // getting url, metadata, and post detail
    const getVideoData = async () => {
      const downloadURL = await getDownloadURL(postref);
      setUrl(downloadURL);

      const metadata = await getMetadata(postref);
      setVideoMetadata(metadata);

      const userSnapshot = await getDoc(doc(db, "Users", data.sender));
      setUser(userSnapshot.data());
    };
    getVideoData();

    // checking if the user has already liked the post
    const duplicate = data?.likes?.filter(like => like === currentUser?.userId);
    // setting liked in cases
    if (duplicate?.length > 0) {
      setLike(true);
    } else {
      setLike(false);
    }
    // getting the time of post and current time
    const postTime = data?.time?.toDate();
    const currentTime = new Date();
    // check difference in minutes
    const timeDifference = Math.abs(currentTime - postTime);
    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    // if less than 5 min set new post
    if (minutesDifference <= 5) {
      setIsNewPost(true);
    } else {
      setIsNewPost(false);
    }
  }, []);
  // send the data of user to userdetail to check his profile
  const handleCheckuser = () => {
    navigate("/userDetail", { state: user });
  };
  // handle the like system of the post
  const handleLike = async () => {
    // if user has already liked the post it will be unliked and then he will be removed from the like list
    if (liked) {
      setLike(false);
      await updateDoc(doc(db, "Posts", data.postId), {
        likes: data.likes.filter(like => like !== currentUser?.userId)
      });
    } else {
      // if it is unliked it will be like and the user will be added in the list
      setLike(true);
      const notificationData = {
        detail: `${currentUser.username} liked your post with PostId ${data.postId}`,
        time: new Date().toUTCString()
      };

      await updateDoc(doc(db, "Posts", data.postId), {
        likes: arrayUnion(currentUser?.userId)
      });
      // a notification will be send to the sender of post 
      await updateDoc(doc(db, "Users", data.sender), {
        notifications: arrayUnion(notificationData)
      });
    }
  };
  // check if the media is video or not 
  const isVideo = videoMetadata && videoMetadata.contentType.startsWith("video/");

  return (
    <>
      <div id='post'>
        {/* check if it is new post */}
        {isNewPost && <span className="newposttag">New</span>}
        <span>
          {/* sender detail that can navigate to its detail*/}
          <img src={user?.photo} alt='user' />
          <h2 className='pointer' onClick={handleCheckuser}>
            {user?.username}
          </h2>
        </span>
        {isVideo ? (
          <div>
            {/* post media video*/}
            <video id='video' controls>
              <source src={url} type={videoMetadata.contentType} />
              Your browser does not support the video tag.
            </video></div>
        ) : (
          // post photo media
          <div style={{ backgroundImage: "url(" + url + ")" }}></div>
        )}
        {/* like button calling like functions */}
        <img onClick={handleLike} src={liked ? likedicon : unlikedicon} alt='like button' />
        {/* to handle comment */}
        <Comment comments={data.comment} id={data.postId} sender={data.sender} />
        <span>{data?.likes?.length} Likes</span>
        <p>{data.description}</p>
        <span className='time'>{data?.time?.toDate().toString()}</span>
      </div>
    </>
  );
};

export default PostCard;
