import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { ENDPOINT } from '../config/constans';
//import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
//import { jwtDecode } from 'jwt-decode';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [isPasswordHidden, setPasswordHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCloseAlert = () => {
    setErrorMessage('');
  };
  // const clientID =
  //   '959939122893-efhseqnnogj59ivjcicdkhah0k3r49dk.apps.googleusercontent.com';

  // const onSuccess = (res) => {
  //   login();
  //   const { name, email, picture } = jwtDecode(res.credential);
  //   localStorage.setItem('name', name);
  //   localStorage.setItem('email', email);
  //   localStorage.setItem('avatar', picture);
  //   navigate('/');
  // };
  // const onFailure = (res) => {
  //   console.log('Login failed: res:', res);
  // };

  // const saveSessionData = (userData) => {
  //   localStorage.setItem('userData', JSON.stringify(userData));
  // };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(ENDPOINT.auth_user, {
        email: data.username,
        password: data.password,
      });

      const { token, user } = response.data;
      const name = user.last_name
        ? `${user.first_name} ${user.last_name}`
        : user.first_name;

      login();
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      localStorage.setItem('nickname', user.nickname);
      localStorage.setItem('id', user.id);
      localStorage.setItem('avatar', '../rat-king.png');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('La contraseña o el correo son incorrectos!!');
    }
  };

  return (
    <div className="flex h-screen">
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
      <section
        className="hidden lg:flex lg:w-1/2 items-stretch justify-center"
        style={{
          backgroundImage: "url('/bg_ratoneriac.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Link className="w-full" to="/"></Link>
      </section>

      <section className="mx-auto flex items-center ">
        <div className="max-w-md mt-6">
          <picture className="bg-porange mb-4 w-28 h-30 flex rounded-xl m-auto">
            <Link to="/" className="p-2 m-auto">
              <img
                src="https://i.ibb.co/chKMvGK/image.jpg"
                width={120}
                height={50}
                alt="Logo La RatonerIA"
              />
            </Link>
          </picture>

          <h1 className="text-3xl sm:text-2xl font-bold mb-4 mt-2 text-center hidden sm:block">
            Inicia sesión en La RatonerIA
          </h1>

          {/* <div className="w-h-full flex justify-center">
            <GoogleOAuthProvider clientId={clientID}>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  onSuccess(credentialResponse);
                  console.log(credentialResponse);
                }}
                onError={() => {
                  onFailure();
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div> */}
          <div className="flex justify-center gap-4 mt-2">
            <div className="text-1 font-bold mb-4 mt-2 text-center hidden sm:block">
              -------------
            </div>
            <h1 className="text-1 font-bold mb-4 mt-2 text-center hidden sm:block">
              O
            </h1>
            <div className="text-1 font-bold mb-4 mt-2 text-center hidden sm:block">
              -------------
            </div>
          </div>
          <form
            className="flex-col w-2/3 m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative max-w-xs">
              <input
                type="text"
                {...register('username', {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                placeholder="Ingresa tu email"
                className={`w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                  errors.username ? 'border-red-500' : ''
                }`}
              />
            </div>
            {errors.username && errors.username.type === 'required' && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            {errors.username && errors.username.type === 'pattern' && (
              <span className="text-red-500">Formato no valido</span>
            )}
            <div>
              <div className="relative max-w-xs mt-2">
                <span
                  className="text-gray-400 absolute right-3 inset-y-2 my-auto active:text-gray-600"
                  onClick={() => setPasswordHidden(!isPasswordHidden)}
                >
                  {isPasswordHidden ? (
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type={isPasswordHidden ? 'password' : 'text'}
                  {...register('password', { required: true })}
                  placeholder="Ingresa tu contraseña"
                  className={`w-full pr-12 pl-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500">Este campo es requerido</span>
            )}
            <div className="w-h-full flex justify-center mt-4">
              <button className="px-7 py-3.5 text-white bg-porange hover:bg-porange-600 rounded-lg shadow-md focus:shadow-none duration-100 ring-offset-2 ring-indigo-600 focus:ring-2">
                Entrar
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Login;
