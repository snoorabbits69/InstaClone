import { useEffect, useState } from 'react';
import GetComments from '../../hooks/GetComments';
import Comment from './Comment';
import Addcomment from './Addcomment';

export default function Comments({ postid, parentref }) {
  const [page, setPage] = useState(1);
  const { comments, loading } = GetComments(postid, page);
  const [allComments, setAllComments] = useState([]);

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
    if (comments.length <= 0) return;

    setAllComments((prev) => {
      const commentIds = new Set(prev.map(comment => comment._id));
      const updatedComments = [...prev];

      comments.forEach((comment) => {
        if (!commentIds.has(comment._id)) {
          updatedComments.push(comment);
          commentIds.add(comment._id); 
        }
      });

      return updatedComments;
    });
  }, [comments, page]); 

  if (loading) {
    return <section>Loading comments...</section>;
  }

  return (
    <div>
      {allComments.length > 0 ? 
            <Comment comment={allComments} setAllComments={setAllComments} />
         : (
        <section>No comments</section>
      )}
      
      <div className="fixed left-0 w-full bottom-10">
        <Addcomment postid={postid} setAllComments={setAllComments} />
      </div>
    </div>
  );
 
}
