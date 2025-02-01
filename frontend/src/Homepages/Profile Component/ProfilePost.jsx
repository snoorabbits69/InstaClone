import GetPosts from '../../hooks/GetPosts';
import { useNavigate } from 'react-router-dom';
import GetsavedPosts from '../../hooks/GetSavedPosts';
import { useEffect, useState } from 'react';

export default function ProfilePost({ id, saved }) {
  const navigate = useNavigate();
  
  const { Post, loading } = saved ? GetsavedPosts(id) : GetPosts(id);

  const [images, setimages] = useState([]);

  useEffect(() => {
    console.log(saved)
    if (Post && Array.isArray(Post)) {
      const allimages = Post.map((post) => ({
        url: post.img[0],
        likes: post.likes.length,
        id: post._id,
      }));
      console.log(allimages); 
      setimages(allimages); 
    }
  }, [Post, saved]);
  if(loading){
    return "Loading"
  }
  return (
    <>
      {Post.length>0 ? images?.map((img) => (
        <div
          className="relative w-full h-20 p-0 m-0 mb-8 md:mb-44 lg:mb-0 lg:h-72"
          key={img.id} // Use unique keys instead of `i`
          onClick={() => navigate(`/post/${img.id}`)}
        >
          <img
            src={img.url}
            className="w-24 h-28 lg:w-[18rem] transition-all md:h-64 border-2 border-black peer hover:opacity-50 hover:cursor-pointer"
          />
          <div className="flex justify-center">
            <p className="absolute top-0 transition-all opacity-100 text peer-hover:block">
              {img.likes}
            </p>
          </div>
        </div>
      )):"No posts"}
    </>
  );
}
