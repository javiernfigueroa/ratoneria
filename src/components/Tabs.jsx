import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ENDPOINT } from '../config/constans.js';
import axios from 'axios';

function Tabs({ localId, view }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [consumedData, setConsumedData] = useState();
  const [reviewData, setReviewData] = useState();
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`${ENDPOINT.consumed}/${localId}`);
      setConsumedData(response.data.consumed);

      const resReview = await axios.get(`${ENDPOINT.reviews}/${localId}`);
      setReviewData(resReview.data.reviews);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [localId]);

  const isSubmit = (data) => {
    if (formType === 'comment') {
      sendComment(data);
    } else if (formType === 'price') {
      sendPrice(data);
    }
  };

  const handleOpenForm = (type) => {
    setFormType(type);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    reset();
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

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(ENDPOINT.reviews, comentario, config);

      setShowForm(false);
      reset();
      fetchData();
    } catch (error) {
      console.error('Error al enviar comentario:', error);
    }
  };

  const sendPrice = async (data) => {
    try {
      const userId = localStorage.getItem('id');
      const token = localStorage.getItem('token');
      const producto = {
        user_id: userId,
        shop_id: localId,
        product: data.product,
        price_paid: parseFloat(data.price_paid),
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(ENDPOINT.consumed, producto, config);

      setShowForm(false);
      reset();
      fetchData();
    } catch (error) {
      console.error('Error al enviar precio:', error);
    }
  };

  const tabsData = [
    {
      label: 'Precios',
      content:
        consumedData && consumedData.length > 0
          ? consumedData.map((consumed, index) => (
              <li className="flex flex-col" key={index}>
                {`${consumed.product.toUpperCase()}: $${parseFloat(consumed.price_paid).toFixed(0)}`}
              </li>
            ))
          : 'No se han agregado precios',
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
        {tabsData.map((tab, idx) => (
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
        ))}
      </div>
      <div className="py-4 ml-4">
        {view !== 'gallery' ? (
          <ul className="overflow-y-scroll h-40">
            {tabsData[activeTabIndex].content || 'Loading...'}
          </ul>
        ) : (
          <ul className="overflow-y-scroll h-10">
            {tabsData[activeTabIndex].content || 'Loading...'}
          </ul>
        )}
        {view !== 'gallery' && (
          <button
            className="bg-porange p-2 rounded-sm mt-4"
            onClick={() =>
              handleOpenForm(
                tabsData[activeTabIndex].label === 'Precios'
                  ? 'price'
                  : 'comment',
              )
            }
          >
            {tabsData[activeTabIndex].label === 'Precios'
              ? 'Agregar precio'
              : 'Comentar'}
          </button>
        )}
      </div>
      {showForm && (
        <div className="absolute w-full lg:w-[500px] h-[600px] md:w-[400px] md:h-[500px] sm:w-[290px] sm:h-auto z-10 bg-transparent top-1/4 left-1/2 transform -translate-x-1/2 ">
          <div className="h-full bg-pgrey rounded-xl">
            <div className="flex justify-between p-5">
              <h3 className="text-white">
                Hola {localStorage.getItem('nickname')}{' '}
              </h3>
              <button className="text-white" onClick={handleCloseForm}>
                X
              </button>
            </div>
            <div className="flex flex-col p-5">
              {formType === 'price' ? (
                <form
                  onSubmit={handleSubmit(isSubmit)}
                  className="flex flex-col gap-5"
                >
                  <h3 className="text-white p-0 m-0">Agregar precio</h3>
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
                    {...register('price_paid', {
                      required: true,
                      validate: {
                        mustBeNumber: (value) => !isNaN(parseFloat(value)),
                      },
                    })}
                  />
                  {errors.price_paid?.type === 'required' && (
                    <span className="text-white bg-red-500 p-2">
                      Debes ingresar un precio
                    </span>
                  )}
                  {errors.price_paid?.type === 'mustBeNumber' && (
                    <span className="text-white bg-red-500 p-2">
                      El precio debe ser un número
                    </span>
                  )}
                  {localStorage.getItem('id') &&
                  localStorage.getItem('token') ? (
                    <input type="submit" className=" bg-porange rounded-lg" />
                  ) : (
                    <span className="text-white bg-red-500 p-2">
                      Para agregar un producto debes estar logueado.
                    </span>
                  )}
                </form>
              ) : (
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
                  {localStorage.getItem('id') &&
                  localStorage.getItem('token') ? (
                    <input type="submit" className=" bg-porange rounded-lg" />
                  ) : (
                    <span className="text-white bg-red-500 p-2">
                      Para enviar un comentario debes estar logueado.
                    </span>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tabs;
