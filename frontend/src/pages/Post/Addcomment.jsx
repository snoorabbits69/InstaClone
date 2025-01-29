import { useEffect, useRef, useState } from 'react';
import { AddcommentRoute, replyCommentRoute } from '../../../utils/ApiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '../../Components/axios';
import { commentInsert, removeParentId} from '../../Redux/Slice/CommentSlice';
import { RxCross1 } from "react-icons/rx";

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
    <div className="relative flex justify-around p-4 border-t-2 border-black border-1">
    {parentId && <p className='flex text-blue-600 '>
     <span className="border-2 rounded-full "> @{parentUser}</span> <button className="absolute text-sm text-black border-2 rounded-full left-14 bottom-8" onClick={()=>{
      dispatch(removeParentId())
     }}><RxCross1/></button></p>}
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
