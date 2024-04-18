import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialLinks = {
    instagram: 'https://www.instagram.com/laratoneria1/',
    twitter: 'https://twitter.com/tu_cuenta',
    facebook: 'https://www.facebook.com/tu_cuenta',
    youtube: 'https://www.youtube.com/tu_cuenta',
  };
  return (
    <footer className="flex justify-center gap-16 bg-pdark-grey text-white font-sans text-xs sm:text-sm py-1 px-4 border-b border-gray-400">
      <div className="flex flex-col">
        <div className="max-w-lg mx-auto flex justify-center items-center">
          <div className="flex items-center">
            <img
              src="https://i.ibb.co/Qf7cfXH/image.jpg"
              className="w-10 mr-2"
              alt="Logo La RatonerIA"
            />
            <p className="leading-relaxed text-[12px] sm:text-xs lg:text-sm max-w-xs sm:max-w-none mt-5">
              ¿Buscas calidad? nosotros buscamos precios ratones.
            </p>
          </div>
        </div>
        <div className="mt-2 flex justify-center items-center">

          <div className="flex">
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-1"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-1"
            >
              <FaTwitter size={16} />
            </a>
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-1"
            >
              <FaFacebook size={16} />
            </a>
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white mx-1"
            >
              <FaYoutube size={16} />
            </a>
          </div>
        </div>
        <div className="flex gap-5 justify-center items-center float-left">
          <div>
            <Link to="/terms" className="text-center">
              <span className="text-porange text-[10px] hover:text-white">
                Terminos y Condiciones
              </span>
            </Link>
          </div>
          <div>
            <Link to="/privacy" className="text-center">
              <span className="text-porange text-[10px] hover:text-white">
                Politica de privacidad
              </span>
            </Link>
          </div>
        </div>
        <p className="text-center mr-2  sm:text-sm lg:text-[12px]">
            &copy; 2024 La RatonerIA all rights reserved.
          </p>
      </div>
    </footer>
  );
};

export default Footer;
