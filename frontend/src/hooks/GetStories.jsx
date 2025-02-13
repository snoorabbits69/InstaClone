import { useEffect, useState } from 'react';
import apiRequest from './../Components/axios';
import { getStoriesRoute } from '../../utils/ApiRoutes';

export default function GetStories() { 
    const [Stories, setStories] = useState([]);
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStories() {
            try {
                const data = await apiRequest('GET', getStoriesRoute);
                if (data?.status) {
                    setStories(data.stories);
                }
            } catch (error) {
                console.error("Error fetching stories:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStories();
    }, []);

    return { Stories, Loading };
}
