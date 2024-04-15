import { useState, useEffect } from 'react';
import Button from './Button';
import useAskQuestion from '../../hooks/useAskQuestions';

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

  useEffect(() => {
    if (answer) {
      const typeResponse = () => {
        let currentLength = 0;
        const interval = setInterval(() => {
          setTypingResponse(answer.substring(0, currentLength));
          currentLength++;
          if (currentLength > answer.length) {
            clearInterval(interval);
            // Borra la respuesta después de 3 segundos
            setTimeout(() => {
              setTypingResponse('');
            }, 3000);
          }
        }, 30);
      };
      typeResponse();
    }
  }, [answer]);

  return (
    <div className="w-[95%] mx-auto mt-12">
      <div className="fixed top-1/3 left-0 right-0 z-50 mt-4">
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
