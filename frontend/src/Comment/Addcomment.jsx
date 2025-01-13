import React, { useRef, useState } from 'react';
import { AddcommentRoute } from '../../utils/ApiRoutes';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Addcomment({ postid,setAllcomments }) {
  const state = useSelector((state) => state.user);
  const [comment, setcomment] = useState('');
const inputref=useRef()
  let sendComment = async () => {
    if (comment) {
      try {
        let commentroute = AddcommentRoute(postid);
        const { data } = await axios.post(commentroute, {
          postId: postid,
          userId: state.currentUser._id,
          text: comment,
          Username: state.currentUser.Username,
          avatarImage: state.currentUser.avatarImage,
        });
      setAllcomments((prev)=>[...prev,data.comment])
        inputref.current.value=""
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-around border-2 border-t-black">
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
