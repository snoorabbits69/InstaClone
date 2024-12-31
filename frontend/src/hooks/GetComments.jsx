import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetcommentRoute } from '../../utils/ApiRoutes';

export default function GetComments(postid, page) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiroute = GetcommentRoute(postid, page);
        const fetchComments = async () => {
            try {
                const { data } = await axios.get(apiroute);
                console.log(data);
                setComments(data.comment);
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [postid, page]);

    return { comments, loading };
}
