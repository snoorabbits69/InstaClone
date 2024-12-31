import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetPostRoute } from '../../utils/ApiRoutes';

export default function GetPosts( id ) {
    const [Post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            try {
                const { data } = await axios.get(GetPostRoute(id));
                if (data.status) {
                    setPost(data);
                    setLoading(false);
                }
            } catch (e) {
                setLoading(false); // Set loading to false in case of an error as well
            }
        };

        getPost();
    }, [id]); 
    return { Post, loading };
}
