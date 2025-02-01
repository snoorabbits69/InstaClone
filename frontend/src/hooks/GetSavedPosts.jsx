import  { useEffect, useState } from 'react';
import {  GetSavedPostsRoute } from '../../utils/ApiRoutes';
import apiRequest from '../Components/axios';

export default function GetsavedPosts( id ) {
    const [Post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
          
                const  data  = await apiRequest('GET',GetSavedPostsRoute)
                if (data.status) {
                    setPost(()=>{
                        return data.posts?data.posts.map((post)=>{
                            return post.savedPost
                        }):[]
                    })
                    console.log(Post)
                    setLoading(false);
                }
            
        };

        getPost();
    }, [id]); 
    return { Post, loading };
}
