import React from 'react';
import { useNavigate } from 'react-router-dom';
import CalcDate from '../../Components/CalcDate';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiRequest from '../../Components/axios';
import { DeleteCommentRoute } from '../../../utils/ApiRoutes';
import { addParentId, commentDelete } from '../../Redux/Slice/CommentSlice';

function RenderComment({ comment, navigate,id }) {
  let dispatch=useDispatch()
  let [commenteditable,setcommenteditable]=useState(false)
  return (
    <section className='m-4'>
      <div className="flex gap-4 ">
        <button
          className="flex gap-2"
          title={comment?.userId?.Username || 'Anonymous'}
          onClick={() => navigate(`/profile/${comment?.userId?.Username}`)}
        >
          <div className="w-10 h-10">
            <img
              src={comment?.userId?.avatarImage}
              alt="User avatar"
              className="rounded-full"
            />
          </div>
          <p className="mt-1 font-bold">{comment?.userId?.Username}: </p>
        </button>
        <div className="flex gap-2 mt-1" contentEditable={commenteditable} suppressContentEditableWarning={true}>
          <p>{comment?.text}</p>
        </div>
      </div>
      {!comment?.isDeleted &&
      <div className="flex gap-2 text-sm text-gray-500 justify-stretch">
        <CalcDate date={comment?.createdAt} />
        <div className='flex gap-2 '>
      <button onClick={()=>{
      console.log(comment._id)
      dispatch(addParentId({id:comment._id,Username:comment.userId.Username}))
      }}>reply</button>
      { id==comment.userId._id && 
      <div className='flex gap-2'>
         <button onClick={async()=>{
         setcommenteditable(!commenteditable)
      
      }}>edit</button>
      <button onClick={async()=>{
const data=await apiRequest('DELETE',DeleteCommentRoute(comment?._id))
    if(data.status){
      dispatch(commentDelete(data.comment))
    }
      }}>delete</button>
      </div> }
      </div>
      </div>
}

    </section>
  );
}

export default function Comment({ comment}) {
 
  const state=useSelector((state)=>state.user)
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState(false);
  if (!comment) return null;

  if (Array.isArray(comment)) {
    return (
      <>
        {comment.map((cmnt) => (
          <div key={cmnt._id}>
            <Comment comment={cmnt} />
          </div>
        ))}
      </>
    );
  }

  return (
    <div className=''>
      {comment._id && <RenderComment comment={comment} navigate={navigate} id={state?.currentUser._id}  />}
     
      {showReplies && (
        <div >
          {comment?.replies?.map((reply) => (
            <div key={reply._id} className='ml-4'>
              <Comment comment={reply} />
            </div>
          ))}
 

        </div>
      )}
      {comment.replies?.length > 0 && (
        <button
          className="mb-2 text-blue-500"
          onClick={() => setShowReplies(!showReplies)}
        >
      { showReplies? "Hide Replies": `View replies (${comment.replies.length})` }
        </button>
      )}
    </div>
  );
}






