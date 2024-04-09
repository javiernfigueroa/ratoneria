import { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios'



function Star({ paramRating,localId }) {
  const [rating, setRating] = useState(paramRating);
  const [hover, setHover] = useState(null);
  const [isCalificated, setIsCalificated] = useState(false);

  const compareUser = async () =>{
    const userId = localStorage.getItem('id');
    const response = await axios.get(
      `http://localhost:3000/api/v1/reviews_user_calification?shop=${localId}&user=${userId}`)
      if (response.data !== ""){
        setIsCalificated(true)}
  }

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
      await axios.post(
        'http://localhost:3000/api/v1/reviews',
        data,
        config,
      );

    } catch (error) {
      console.error('Error al enviar comentario:', error);
      // Manejar el error según tus necesidades
    }
  };

  const handleClick = (newRating) => {
    if(!isCalificated){
    setRating(newRating);
    sendCalification(newRating);
  }};

  return (
    <div className="flex flex-row justify-center mb-3">
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
              color={currentRating <= (hover || rating) ? '#ffa31a' : '#808080'}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default Star;
