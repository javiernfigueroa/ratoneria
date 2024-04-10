import { useState } from 'react';

import axios from 'axios';

const useAskQuestion = () => {
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const askQuestion = async (question) => {
    setLoading(true);
    try {
        const response = await axios({
          method: 'get',
          url: `${import.meta.env.VITE_BACKEND_URL}/ask`,
          data: { question }  // Los datos van aquí en el cuerpo de la solicitud
        });
        setAnswer(response.data.answer);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
  };

  return { answer, error, loading, askQuestion };
};

export default useAskQuestion;
