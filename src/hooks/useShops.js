import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';

const useGetShops = (data) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (data) {
          setShops(data);
        } else {
          const response = await axios.get(ENDPOINT.shops);
          setShops(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cancela una request si es necesario.
    };
  }, []);

  return { shops, loading, error };
};

export default useGetShops;
