import { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
//coment/
function Tabs({ localId, view }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [consumedData, setConsumedData] = useState();
  const [reviewData, setReviewData] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/consumed/${localId}`,
      );
      setConsumedData(response.data.consumed);
      //console.log(consumedData)

      const resReview = await axios.get(
        `http://localhost:3000/api/v1/reviews/${localId}`,
      );
      setReviewData(resReview.data.reviews);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [0]);
  const isSubmit = (data) => {
    if(data.comment === '') {
      sendPrice(data);
    }else {
      sendComment(data);
    }
    
  };

  const sendComment = async (data) => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const comentario = {
        user_id: userId,
        shop_id: localId,
        comment: data.comment,
        calification: null,
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
        comentario,
        config,
      );

      // Opcional: Puedes manejar alguna acción después de enviar los comentarios, como cerrar el modal
      setShowModal(false);
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      // Manejar el error según tus necesidades
    }
    fetchData();
  };

  const sendPrice = async (data) => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const producto = {
        user_id: userId,
        shop_id: localId,
        product: data.product,
        price_paid: parseInt(data.price_paid),
      };

      console.log(producto);

      // Configurar el encabezado de la solicitud con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Realizar la solicitud POST al backend con el encabezado configurado
      await axios.post(
        'http://localhost:3000/api/v1/consumed',
        producto,
        config,
      );

      // Opcional: Puedes manejar alguna acción después de enviar los comentarios, como cerrar el modal
      setShowModal(false);
      
    } catch (error) {
      console.error('Error al enviar comentario:', error);
      // Manejar el error según tus necesidades
    }
    fetchData();
  };

  const tabsData = [
    {
      label: 'Precios',
      content:
        consumedData && consumedData.length > 0
          ? consumedData.map((consumed, index) => (
              <li className="flex flex-col" key={index}>
                {`${consumed.product.toUpperCase()}: ${consumed.price_paid}`}
              </li>
            ))
          : 'No se agregado precios',
    },
    {
      label: 'Comentarios',
      content:
        reviewData && reviewData.length > 0
          ? reviewData.map((review, index) => (
              <li className="flex flex-col" key={index}>
                {`${review.nickname.toUpperCase()}: ${review.comment}`}
              </li>
            ))
          : 'Sin comentarios',
    },
  ];

  return (
    <div className="ml-5 text-white">
      <div className="flex gap-3 ml-4 ">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-b-4 transition-colors duration-300 ${
                idx === activeTabIndex
                  ? 'border-porange'
                  : 'border-transparent hover:border-porange'
              }`}
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="py-4 ml-4">
      {view !== 'gallery' ?
        <ul className="overflow-y-scroll h-40">
          {tabsData[activeTabIndex].content || 'Loading...'}
        </ul>: <ul className="overflow-y-scroll h-10">
          {tabsData[activeTabIndex].content || 'Loading...'}
        </ul>}
        {view !== 'gallery' ?
     tabsData[activeTabIndex].label === "Precios"
        ? <button className="bg-porange p-2 rounded-sm mt-4" onClick={() => handleOpenModal('Precios')}>Agregar</button>
        : <button className="bg-porange p-2 rounded-sm mt-4" onClick={() => handleOpenModal('Comentarios')}>Comentar</button>   : null} 
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          {modalContent === 'Comentarios' ? (
            <>
              <form
                onSubmit={handleSubmit(isSubmit)}
                className="flex flex-col gap-5"
              >
                <h3 className="text-white p-0 m-0">Deja tu comentario</h3>
                <input
                  className="p-1 text-black"
                  defaultValue=""
                  placeholder="Ingresa tu comentario"
                  {...register('comment', { required: true })}
                />
                {errors.comment && (
                  <span className="text-white bg-red-500 p-2">
                    Debes ingresar un comentario
                  </span>
                )}
                {/* Verificar si el usuario está logueado antes de mostrar el botón de enviar */}
                {localStorage.getItem('id') && localStorage.getItem('token') ? (
                  <input type="submit" className=" bg-porange rounded-lg" />
                ) : (
                  <span className="text-white bg-red-500 p-2">
                    Para enviar un comentario debes estar logueado.
                  </span>
                )}
              </form>
            </>
          ) : (
            <>
              <form
                onSubmit={handleSubmit(isSubmit)}
                className="flex flex-col gap-5"
              >
                <h3 className="text-white p-0 m-0">Crea tu producto</h3>
                <input
                  className="p-1 text-black"
                  defaultValue=""
                  placeholder="Ingresa tu producto"
                  {...register('product', { required: true })}
                />
                {errors.product && (
                  <span className="text-white bg-red-500 p-2">
                    Debes ingresar un producto
                  </span>
                )}
                <input
                  className="p-1 text-black"
                  defaultValue=""
                  placeholder="Ingresa el precio"
                  {...register('price_paid', { required: true })}
                />
                {errors.price_paid && (
                  <span className="text-white bg-red-500 p-2">
                    Debes ingresar un precio
                  </span>
                )}
                {/* Verificar si el usuario está logueado antes de mostrar el botón de enviar */}
                {localStorage.getItem('id') && localStorage.getItem('token') ? (
                  <input type="submit" className=" bg-porange rounded-lg" />
                ) : (
                  <span className="text-white bg-red-500 p-2">
                    Para agregar un producto debes estar logueado.
                  </span>
                )}
              </form>
            </>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Tabs;
