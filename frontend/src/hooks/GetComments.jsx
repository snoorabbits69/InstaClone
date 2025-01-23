import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetcommentRoute } from '../../utils/ApiRoutes';
import apiRequest from './../Components/axios';

export default function GetComments(postid, page) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiroute = GetcommentRoute(postid, page);
        const fetchComments = async () => {
      
                const { data } = await apiRequest('GET',apiroute);
                if(data.status){
                setComments(data.comment);
            setLoading(false);    
            }
            
        };

        fetchComments();
    }, [postid, page]);

    return { comments, loading };
}
