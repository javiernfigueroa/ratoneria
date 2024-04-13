import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../config/constans';

function Star({ paramRating, paramTotalRating, localId, enableHover }) {
  const [rating, setRating] = useState(paramRating);
  const [hover, setHover] = useState(null);
  const [isCalificated, setIsCalificated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCloseAlert = () => {
    setErrorMessage('');
  };

  const compareUser = async () => {
    const userId = localStorage.getItem('id');
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/reviews_user_calification?shop=${localId}&user=${userId}`,
    );
    if (response.data !== '') {
      setIsCalificated(true);
    }
  };

  useEffect(() => {
    setRating(paramRating);
    compareUser();
  }, [paramRating]);

  const sendCalification = async (calification) => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const data = {
        user_id: userId,
        shop_id: localId,
        comment: null,
        calification: calification,
      };

      // Configurar el encabezado de la solicitud con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Realizar la solicitud POST al backend con el encabezado configurado
      await axios.post(ENDPOINT.reviews, data, config);
      setIsCalificated(true);
    } catch (error) {
      if (error.response.data.error === 'el token no es valido') {
        if (localStorage.getItem('id')) {
          localStorage.clear();
          navigate('/login');
        }
        localStorage.clear();
        setErrorMessage('Debes iniciar sesion para calificar');
      }
      // Manejar el error según tus necesidades
    }
  };

  const handleClick = (newRating) => {
    if (isCalificated && enableHover === true) {
      setRating(newRating);
      sendCalification(newRating);
    }
  };

  return (
    <div className="flex flex-row justify-center mb-3">
      <div className="fixed top-0 left-0 right-0 z-50 mt-4">
        {errorMessage && (
          <div className="mx-auto w-1/3 bg-gray-500 bg-opacity-70 text-white font-bold p-2 rounded-md shadow-md">
            <div className="text-center mb-4">{errorMessage}</div>
            <div className="flex justify-center mt-2">
              <button
                onClick={handleCloseAlert}
                className="bg-porange px-4 py-1 rounded-lg text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => handleClick(currentRating)}
            />
            <FaStar
              className="cursor-pointer"
              size={35}
              color={
                currentRating <= (enableHover ? hover || rating : rating)
                  ? '#ffa31a'
                  : '#808080'
              }
              onMouseEnter={() => enableHover && setHover(currentRating)}
              onMouseLeave={() => enableHover && setHover(null)}
            />
          </label>
        );
      })}
      <span className='text-white'>({paramTotalRating ? paramTotalRating : "0"})</span>
    </div>
  );
}

export default Star;
