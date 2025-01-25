import { useEffect, useRef, useState } from 'react';
import { AddcommentRoute, replyCommentRoute } from '../../../utils/ApiRoutes';
import { useSelector } from 'react-redux';
import apiRequest from '../../Components/axios';

export default function Addcomment({ postid,setAllComments,parentId }) {
  const state = useSelector((state) => state.user);
  const [comment, setcomment] = useState('');
const inputref=useRef()

  let sendComment = async () => {
   let commentroute=parentId?replyCommentRoute(parentId):AddcommentRoute(postid);
    if (comment) {
   
      
        const  data  = await apiRequest('POST',commentroute, {
          postId: postid,
          userId: state.currentUser._id,
          text: comment,
          Username: state.currentUser.Username,
          avatarImage: state.currentUser.avatarImage,
        });
        setAllComments((prev)=>[...prev,data.comment])

        inputref.current.value=""
      } 
    
  };

  return (
    <div className="flex justify-around border-1 "  onKeyDown={(e) => {
      if (e.key === "Enter") {
      sendComment();
        e.preventDefault(); 
      }
    }}>
      <input ref={inputref}
        type="text"
        className="w-[80%] border-black outline-none border-b-2 mb-1 "
        onChange={(e) => {
          setcomment(e.target.value);
        }}
      />
      <button onClick={sendComment}>post</button>
    </div>
  );
}
