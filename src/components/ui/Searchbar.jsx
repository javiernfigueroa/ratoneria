import { useState, useEffect } from 'react';
import Button from './Button';
import useAskQuestion from '../../hooks/useAskQuestions';

function Searchbar() {
  const [inputValue, setInputValue] = useState('');
  const [typingResponse, setTypingResponse] = useState('');
  const { answer, askQuestion } = useAskQuestion();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const typeResponse = () => {
    let currentLength = 0;
    const interval = setInterval(() => {
      setTypingResponse(answer.substring(0, currentLength));
      currentLength++;
      if (currentLength > answer.length) {
        clearInterval(interval);
      }
    }, 30);
  };

  const handleSubmit = async () => {
    if (inputValue.trim() !== '') {
      try {
        await askQuestion(inputValue.trim()); // Llama a askQuestion con la pregunta
        setInputValue(''); // Limpiar el input después de enviar la pregunta
      } catch (error) {
        console.error('Error al enviar la pregunta:', error);
      }
    } else {
      alert('Por favor, ingresa una pregunta antes de enviar.');
    }
  };

  useEffect(() => {
    if (answer) {
      typeResponse();
    }
  }, [answer]);

  return (
    <div className="w-[95%] mx-auto mt-12">
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
