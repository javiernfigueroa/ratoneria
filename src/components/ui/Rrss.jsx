import {FaInstagram, FaFacebook, FaLink } from 'react-icons/fa';

const SocialLinks = ({ urlig, urlfb, urlweb, size }) => {
  return (
    <div className="flex w-1/2">
      { urlig != null ?
      <a
        href={urlig}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white mx-1"
      >
        <FaInstagram size={size} />
      </a> : null }
      { urlfb != null ?
      <a
        href={urlfb}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white mx-1"
      >
        <FaFacebook size={size} />
      </a>: null }
      { urlweb != null ?
      <a
        href={urlweb}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white mx-1"
      >
        <FaLink size={size} />
      </a>: null }
    </div>
  );
};

export default SocialLinks;
