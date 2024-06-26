import { useState, useEffect } from 'react';
import { ENDPOINT } from '../config/constans.js';
import io from 'socket.io-client';

const socket = io(ENDPOINT.chat, {
  transports: ['websocket'],
  auth: {
    token: localStorage.getItem('token'),
  },
});

export default function Chat({ local }) {
  const [nickname, setNickname] = useState(localStorage.getItem('nickname'));
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [isFlashing, setIsFlashing] = useState(false);

  useEffect(() => {
    if (!nickname) {
      const random = Math.floor(Math.random() * 1000);
      setNickname('Rata-Anonima-' + random);
    }
    if (!localStorage.getItem('room')) {
      localStorage.setItem('room', local);
    } else {
      if (localStorage.getItem('room') !== local) {
        socket.emit('leave', {
          room: localStorage.getItem('room'),
          name: nickname,
        });
        localStorage.setItem('room', local);
      }
    }
    socket.emit('join', { room: local, name: nickname });
  }, [local]);

  useEffect(() => {
    socket.on('message', ({ body, from }) => {
      const msg = { body, from };
      setAllMessages((previousMessages) => [...previousMessages, msg]);
    });
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  // Animacion Titulo CHAT
  useEffect(() => {
    const interval1 = setInterval(() => {
      setIsFlashing((prevIsFlashing) => !prevIsFlashing);
    }, 1000);

    const interval2 = setInterval(() => {
      setIsFlashing((prevIsFlashing) => !prevIsFlashing);
    }, 5000);

    const interval3 = setInterval(() => {
      setIsFlashing((prevIsFlashing) => !prevIsFlashing);
    }, 10000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  //PROCEDIMIENTO PARA HACER UN SCROLL AL FINAL
  const scrollToBottom = () => {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (!message) return;
    const newMessage = {
      body: message,
      from: nickname,
    };
    socket.emit('message', { room: local, msg: newMessage });
    setMessage('');
  };

  return (
    <section className="text-zinc-100  h-[90%]  pt-10 pr-1 pb-10 pl-1 rounded-md relative">
      <img
        src="https://i.ibb.co/rd2wT5d/Chat.png"
        alt="Chat Icon"
        className="absolute top-0 right-100 w-20 h-auto z-10"
        style={{
          filter: isFlashing
            ? 'drop-shadow(0 0 10px #ff6ac1) drop-shadow(0 0 20px #ff6ac1) drop-shadow(0 0 30px #ff6ac1)'
            : '',
        }}
      />
      <ul
        className="lg:min-h-[35em] sm:max-h-44 list-none h-full overflow-y-scroll p-2 w-[90%] mx-auto mt-5 scrollbar-thin scrollbar-thumb-[#151515] scrollbar-track-gray-200 hover:scrollbar-thumb-gray-600"
        id="chat-messages"
      >
        {allMessages.map((msg, index) => (
          <li
            key={index}
            className={`my-2 p-2 table text-sm rounded-md max-w-sm ${
              msg.from === nickname ? 'bg-black ml-auto' : 'bg-pgrey'
            }`}
          >
            <b>{msg.from}</b>: {msg.body}
          </li>
        ))}
      </ul>
      <form
        className="w-[90%] mx-auto mt-10"
        onSubmit={(e) => handleSendMessage(e)}
      >
        {localStorage.getItem('id') && localStorage.getItem('token') ? (
          <>
            <input
              className="w-9/12 h-[30px] mr-5 p-2 text-black"
              type="text"
              name="message"
              id="input"
              placeholder={
                localStorage.getItem('id')
                  ? 'Escribe un mensaje...'
                  : 'Regístrate para enviar mensajes...'
              }
              onChange={(e) => handleMessageChange(e)}
              value={message}
              autoComplete="off"
              maxLength={100}
            />
            {/* Verificar si el usuario está logueado antes de mostrar el botón de enviar */}

            <button className="bg-porange rounded-md px-3 py-1">Enviar</button>
          </>
        ) : (
          <span className="text-red-600 font-bold text-lg">
            Para chatear debes estar logueado
          </span>
        )}
      </form>
    </section>
  );
}
