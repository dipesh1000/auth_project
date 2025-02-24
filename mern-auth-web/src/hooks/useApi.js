import { useCallback, useEffect, useState } from 'react';
import axiosInstance from '../utils/AxiosInstance';

const useApi = (url, method, body = null, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  console.log(url, body, 'from body outside fetch data');

  const fetchData = useCallback(async () => {
    console.log(body, 'from body');
    setLoading(true);
    try {
      const response = await axiosInstance({
        url,
        method,
        data: body,
        ...options,
      });
      setData(response);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, method, body, options]);
  useEffect(() => {
    //     if (method === 'GET') {
    fetchData();
    //     }
  }, [fetchData, method]);

  const execute = () => {
    fetchData();
  };

  return { data, loading, error, execute };
};

export default useApi;
