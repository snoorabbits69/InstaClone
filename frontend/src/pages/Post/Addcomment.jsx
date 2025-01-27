import { useEffect, useRef, useState } from 'react';
import { AddcommentRoute, replyCommentRoute } from '../../../utils/ApiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '../../Components/axios';
import { commentInsert, removeParentId, resetcomment } from '../../Redux/Slice/CommentSlice';

export default function Addcomment({ postid}) {
  const dispatch = useDispatch();
  const {parentId,parentUser}=useSelector((state)=>state.comment)
  const state = useSelector((state) => state.user);
  const [comment, setComment] = useState('');


  const sendComment = async () => {
    console.log(parentId)
    let commentRoute = parentId
      ? replyCommentRoute(parentId)
      : AddcommentRoute(postid);
    if (comment) {
      const data = await apiRequest('POST', commentRoute, {
        postId: postid,
        userId: state.currentUser._id,
        text: comment.trim(),
        Username: state.currentUser.Username,
        avatarImage: state.currentUser.avatarImage,
      });
      dispatch(commentInsert(data.comment));
      dispatch(removeParentId());
      setComment('');
    }
  };

  return (
    <div className="flex justify-around p-4 border-t-2 border-black border-1">
    {parentId && <span className='text-blue-600 '>@{parentUser}</span>}
      <input
       
        type="text"
value={comment}
placeholder="add a comment"
        className="w-[80%] border-black outline-none"
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); 
            sendComment();
          }
        }}
      />
      <button onClick={sendComment}>Post</button>
    </div>
  );
}
