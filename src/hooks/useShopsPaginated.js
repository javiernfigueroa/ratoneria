import { useState, useEffect } from 'react';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';

const useShopsPaginated = (itemsPerPage, page) => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${ENDPOINT.shops_paginated}?items=${itemsPerPage}&page=${page}`
        );

        const results = response.data.results;
        setShops(results);

        setLoading(false);
      } catch (error) {
        console.error('Error en la solicitud:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      // Cancelar cualquier solicitud en curso o realizar limpieza si es necesario
    };
  }, [itemsPerPage, page]);

  return { shops, loading, error };
};

export default useShopsPaginated;
