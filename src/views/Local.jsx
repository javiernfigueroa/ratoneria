import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Chat from '../components/Chat.jsx';
import SocialLinks from '../components/ui/Rrss.jsx';
import Tabs from '../components/Tabs.jsx';
import Star from '../components/Star.jsx';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/Modal.jsx';
import { useForm } from 'react-hook-form';

import axios from 'axios';

function Local() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isSubmit = (data) => {
    enviarComentario(data);
    enviarPrecios(data);
  };

  const { cards } = useContext(AppContext);
  const { id } = useParams();
  const [local, setLocal] = useState(() => {
    const storedLocal = localStorage.getItem('local');
    return storedLocal ? JSON.parse(storedLocal) : null;
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    const foundLocal = cards.find(
      (card) => card.shop_id.toString() === id.toString(),
    );
    setLocal(foundLocal);
    //localStorage.setItem('local', JSON.stringify(foundLocal));
  }, [id, cards]);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  if (!local) {
    return <div>Loading...</div>;
  }

  const enviarComentario = async (data) => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const comentario = {
        user_id: userId,
        shop_id: id,
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
  };

  const enviarPrecios = async (data) => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const producto = {
        user_id: userId,
        shop_id: id,
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
  };
  return (
    <div className="lg:w-[1280px] w-full  mx-auto relative mb-10 mt-10">
      <div className="bg-pdark-grey inline-block w-full h-full align-top  mx-auto px-10 py-10 ">
        <h1 className="text-3xl sm:text-2xl font-bold mb-4 mt-2 text-center text-slate-100">
          {local.shop_name}
        </h1>
      </div>
      <div className="flex flex-row justify-evenly  mt-10">
        <div className="w-[50%] flex flex-col  items-center">
          <div className="h-[600px] w-[600px]">
            <img
              className="mx-auto h-full rounded-md"
              src={local.image}
              alt=""
            />
          </div>
          <Star paramRating={local.rating}></Star>
          <div className="mt-10 w-[90%] ">
            <Tabs localId={id} />
            <div className="flex gap-3">
              <Button onClick={() => handleOpenModal('Comentarios')}>
                Comentar
              </Button>
              <Button onClick={() => handleOpenModal('Precios')}>
                Agregar Producto
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[600px] ">
          <div
            className=" bg-pdark-grey h-[600px] p-1 rounded-md  w-full flex flex-col"
            id="chat"
          >
            <Chat local={local.shop_id.toString()} />
          </div>
          <div className=" w-[400px] mt-10 bg-pdark-grey p-10  rounded-md mx-auto border text-center">
            <Link to="/">
              <h1 className="text-slate-100">URL DEL LOCAL</h1>
            </Link>
          </div>
          <div className="mt-5 text-lg mx-auto   ">
            <SocialLinks urlig="#" urltw="#" urlfb="#" urlyou="#" size="25px" />
          </div>
        </div>
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
                  className="p-1"
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
                  className="p-1"
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
                  className="p-1"
                  defaultValue=""
                  placeholder="Ingresa el precio "
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

export default Local;
