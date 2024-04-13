import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';
import { useNavigate } from 'react-router-dom';

function Post() {
  const [userId] = useState(localStorage.getItem('id'));
  const [profileImage, setProfileImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = async () => {
    setIsLoading(true);

    try {
      let imageUrl = '';
      if (
        profileImage &&
        (profileImage.type === 'image/png' ||
          profileImage.type === 'image/jpg' ||
          profileImage.type === 'image/jpeg')
      ) {
        const image = new FormData();
        image.append('file', profileImage);
        image.append('cloud_name', 'drh8hh5qb');
        image.append('upload_preset', 'oznokdwk');

        const response = await fetch(
          'https://api.cloudinary.com/v1_1/drh8hh5qb/image/upload',
          {
            method: 'post',
            body: image,
          },
        );
        const imgData = await response.json();
        imageUrl = imgData.url.toString();
        setImagePreview(null);
      }
      return imageUrl;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      setIsLoading(true);

      const imageUrl = await uploadImage();

      const formattedTitle = data.name.toUpperCase();

      const formData = {
        name: formattedTitle,
        address: data.address,
        category_id: parseInt(data.category_id),
        image: imageUrl,
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
        console.log('Local creado exitosamente');
        navigate('/profile');
      }
    } catch (error) {
      if (error.status === 409) {
        localStorage.clear();
        navigate('/login');
      } else {
        console.error('Error:', error);
        setErrorMessage(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
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
      <div className="flex flex-col md:flex-row mb-6 md:justify-center ">
        <form
          onSubmit={handleSubmit(isSubmit)}
          className="flex flex-col w-full md:w-2/3 max-w-lg mx-auto gap-5 mt-10"
        >
          <label>Nombre del Local</label>
          <input
            {...register('name', { required: true })}
            className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
            placeholder="Ejemplo Bar nacional"
          />
          {errors.name && <span>Campo obligatorio</span>}

          <label>Direccion</label>
          <input
            {...register('address', { required: true })}
            className="w-full  pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
            placeholder="Ejemplo Calle 1 #123"
          />
          {errors.address && <span>Campo obligatorio</span>}

          <label>Categoría</label>
          <select
            {...register('category_id', { required: true })}
            className="w-full pr-12 pl-3 py-2 bg-black outline-none border focus:border-porange shadow-sm rounded-lg text-white"
          >
            <option value="">Seleccione una categoría</option>
            <option value={1}>Bar</option>
            <option value={2}>Restaurant</option>
          </select>
          {errors.category_id && <span>Seleccione una categoría</span>}

          <label>Foto: Subir una foto</label>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
            className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
          />
          {isLoading && <span>Cargando imagen...</span>}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-[100px]" />
          )}
          <label>Sitio Web : Opcional</label>
          <input
            {...register('web', { required: false })}
            type="text"
            className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
            placeholder='Ejemplo: "https://www.facebook.com/"'
          />
          <label>facebook: Opcional</label>
          <input
            {...register('facebook', { required: false })}
            type="text"
            className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
            placeholder='Ejemplo: "La ratoneria'
          />

          <label>instagram: opcional</label>
          <input
            {...register('instagram', { required: false })}
            type="text"
            className="w-full pr-12 pl-3 py-2 bg-transparent outline-none border focus:border-porange shadow-sm rounded-lg text-white"
            placeholder='Ejemplo: "La ratoneriaIG'
          />
          <input
            type="submit"
            className="font-bold bg-porange mx-auto  w-[30%] text-[18px] rounded-sm p-2"
          />
        </form>
      </div>
    </div>
  );
}

export default Post;
