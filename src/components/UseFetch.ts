import { useState, useEffect } from 'react';
import AuthStore from '../stores/AuthStore';
import axios from 'axios';

const useFetch = (url: string) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [init, Refresh] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${AuthStore.accessToken}`,
                    }
                });
                const data = await response.data.data;
                setData(data);
                setLoading(false);
            } catch (e: any) {
                if (e.response) {
                    setError(e.response.data.message);
                } else {
                    setError(e.message);
                }
                setLoading(false);
            }
        }
        
        fetchData();

    }, [url, init]);

    const update = () => {
        Refresh(!init);
    }

    return { data, loading, error, update };
};

export default useFetch;