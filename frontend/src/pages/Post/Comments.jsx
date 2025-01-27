import { useEffect, useState } from 'react';
import GetComments from '../../hooks/GetComments';
import Comment from './Comment';
import Addcomment from './Addcomment';
import { useSelector, useDispatch } from 'react-redux';
import { commentAdd } from '../../Redux/Slice/CommentSlice'; // Update with the correct path to your slice

export default function Comments({ postid, parentref }) {
  const dispatch = useDispatch();
  const Selectedcomments = useSelector((state) => state.comment.Selectedcomments);
  const [page, setPage] = useState(1);
  const { comments, loading } = GetComments(postid, page);
  const [parentId, setparentId] = useState();

  useEffect(() => {
    if (comments.length <= 0 || loading) return;

    const handleScroll = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollHeight - scrollTop <= clientHeight + 50) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const scrollContainer = parentref?.current;
    scrollContainer.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [comments, loading]);

  useEffect(() => {
    if (comments.length > 0) {
      dispatch(commentAdd(comments));
    }
  }, [comments, dispatch]);

  if (loading) {
    return <section>Loading comments...</section>;
  }

  return (
    <div>
      {Selectedcomments.length > 0 ? (
        <Comment
          comment={Selectedcomments}
          setparentId={setparentId}
        />
      ) : (
        <section>No comments</section>
      )}
      
      <div className="fixed left-0 w-full bottom-10">
        <Addcomment
          postid={postid}
          parentId={parentId}
        
        />
      </div>
    </div>
  );
}
