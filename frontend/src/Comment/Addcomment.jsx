import React, { useState } from 'react';
import { AddcommentRoute } from '../../utils/ApiRoutes';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Addcomment({ postid }) {
  console.log(postid);
  const state = useSelector((state) => state.user);
  console.log(state.currentUser._id);
  const [comment, setcomment] = useState('');

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
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex justify-around">
      <input
        type="text"
        className="w-[80%] outline-none"
        onChange={(e) => {
          setcomment(e.target.value);
        }}
      />
      <button onClick={sendComment}>post</button>
    </div>
  );
}
