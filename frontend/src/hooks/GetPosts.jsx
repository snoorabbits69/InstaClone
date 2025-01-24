import  { useEffect, useState } from 'react';
import { GetPostRoute } from '../../utils/ApiRoutes';
import apiRequest from '../Components/axios';

export default function GetPosts( id ) {
    const [Post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
          
                const  data  = await apiRequest('GET',GetPostRoute(id))
                console.log()
                if (data.status) {
                    setPost(data);
                    setLoading(false);
                }
            
        };

        getPost();
    }, [id]); 
    return { Post, loading };
}
