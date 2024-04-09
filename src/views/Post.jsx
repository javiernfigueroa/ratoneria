import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';
import { useNavigate } from 'react-router-dom';

function Post() {
  const [userId] = useState(localStorage.getItem('id'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorMessage, setErrorMessage] = useState('');
  const handleCloseAlert = () => {
    setErrorMessage('');
  };
  const isSubmit = async (data) => {
    try {
      const formData = {
        name: data.name,
        address: data.address,
        category_id: parseInt(data.category_id),
        image: data.image,
        user_id: userId,
      };

      console.log(formData);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.post(ENDPOINT.shops, formData, config);

      if (response.status === 201) {
        // Manejar la respuesta exitosa
        console.log('Local creado exitosamente');
        navigate('/profile');
      }
    } catch (error) {
      // Manejar errores de red u otros errores
      if (error.status === 409) {
        localStorage.clear();
        navigate('/login');
        
      }else{
        console.error('Error:', error);
        setErrorMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="flex flex-col w-[50%] text-white mx-auto">
      <div className="fixed top-0 left-0 right-0 z-50 mt-4">
        {errorMessage && (
          <div className="mx-auto w-1/3 bg-gray-500 bg-opacity-50 text-white font-bold p-2 rounded-md shadow-md">
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
      <div className="flex ">
        <form
          onSubmit={handleSubmit(isSubmit)}
          className="flex flex-col w-2/3 m-auto gap-5 mt-10 self-center"
        >
          <label>Nombre del Local</label>
          <input
            {...register('name', { required: true })}
            className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
          />
          {errors.name && <span>Campo obligatorio</span>}

          <label>Direccion</label>
          <input
            {...register('address', { required: true })}
            className="w-full  pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
          />
          {errors.address && <span>Campo obligatorio</span>}

          <label>Categoría</label>
          <select
            {...register('category_id', { required: true })}
            className="w-[50%] pr-12 pl-3 py-2 bg-black outline-none border focus:border-porange shadow-sm rounded-lg text-white"
          >
            <option value="">Seleccione una categoría</option>
            <option value={1}>Bar</option>
            <option value={2}>Restaurant</option>
          </select>
          {errors.category_id && <span>Seleccione una categoría</span>}

          <label>Foto: Ingresar URL de una foto</label>
          <input
            {...register('image', { required: true })}
            type="text"
            className="w-[50%] pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
          />
          {errors.image && <span>Debe subir una foto</span>}

          <label>Sitio Web : Opcional</label>
          <input
            {...register('web', { required: false })}
            type="text"
            className="w-[50%] pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
          />

          <label>facebook: Opcional</label>
          <input
            {...register('facebook', { required: false })}
            type="text"
            className="w-[50%] pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
          />

          <label>instagram: opcional</label>
          <input
            {...register('instagram', { required: false })}
            type="text"
            className="w-[50%] pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
          />
          <div>
            <input
              type="submit"
              className="font-bold bg-porange text-[18px] rounded-sm p-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Post;
