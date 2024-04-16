import { useState, useEffect } from 'react';
import Button from './Button';
import useAskQuestion from '../../hooks/useAskQuestions';
import axios from 'axios';
import { URLBASE } from '../../config/constans';

function Searchbar() {
  const [inputValue, setInputValue] = useState('');
  const [typingResponse, setTypingResponse] = useState('');
  const { answer, askQuestion } = useAskQuestion();
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleCloseAlert = () => {
    setErrorMessage('');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() !== '') {
      try {
        await askQuestion(inputValue.trim());
        console.log('esta es la pregunta en el front', inputValue.trim());
        setInputValue('');
      } catch (error) {
        console.error('Error al enviar la pregunta:', error);
      }
    } else {
      setErrorMessage('Debes escribir una pregunta valida');
    }
  };
  /* TRAE LOS LOCALES QUE MENCIONA LA RESPUESTA DE LA IA */
  const getShopAnswer = async () => {
    if (answer) {
      const matches = answer.match(/\b[A-ZÁÉÍÓÚÜÑ]{4,}\b/g);
      const responseMatches = await axios({
        method: 'post',
        url: `${URLBASE}/shops_by_name`,
        data: {
          shopName: matches,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(responseMatches.data);
    }
  };
  useEffect(() => {
    if (answer) {
      const typeResponse = () => {
        let currentLength = 0;
        const interval = setInterval(() => {
          setTypingResponse(answer.substring(0, currentLength));
          currentLength++;
          if (currentLength > answer.length) {
            clearInterval(interval);
            setTimeout(() => {
              setTypingResponse('');
            }, 3000);
          }
        }, 30);
      };
      typeResponse();
      getShopAnswer();
    }
  }, [answer]);

  return (
    <div className="w-[95%] mx-auto mt-12">
      <div className="fixed left-0 right-0 z-50 mt-4 sm:top-52 lg:top-72 lg:w-[40%] sm:w-[60%] mx-auto">
        {errorMessage && (
          <div className="mx-auto bg-gray-500 bg-opacity-70 text-white font-bold p-2 rounded-md shadow-md w-full">
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
      <div className="flex gap-2">
        {/* Input para ingresar la pregunta */}
        <input
          value={inputValue}
          onChange={handleInputChange}
          type="text"
          placeholder="Preguntame algo..."
          className="w-full py-3 pl-5 pr-4 text-[#fff] text-3xl rounded-md outline-none bg-pgrey focus:bg-pgrey"
        />
        {/* Botón para enviar la pregunta */}
        <Button onClick={handleSubmit}>Enviar</Button>
      </div>

      {/* Contenedor para mostrar la respuesta */}
      <div
        className="feed-container mt-3 mb-3"
        style={{ maxHeight: '200px', overflowY: 'auto' }}
      >
        <ul className="feed">
          {/* Muestra la respuesta */}
          <li className="text-porange font-extrabold text-2xl p-2">
            {typingResponse}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Searchbar;
