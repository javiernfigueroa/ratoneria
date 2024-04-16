import { useState } from 'react';
import { URLBASE } from '../config/constans';
import axios from 'axios';

const useAskQuestion = () => {
  const [answer, setAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const askQuestion = async (question) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${URLBASE}/ask?question=${encodeURIComponent(question)}`,
      );
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
