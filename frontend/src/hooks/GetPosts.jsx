import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetPostRoute } from '../../utils/ApiRoutes';
import apiRequest from '../Components/axios';

export default function GetPosts( id ) {
    const [Post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
          
                const { data } = await apiRequest('GET',GetPostRoute)
                if (data.status) {
                    setPost(data);
                    setLoading(false);
                }
            
        };

        getPost();
    }, [id]); 
    return { Post, loading };
}
