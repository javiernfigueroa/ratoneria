import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

function NotFound() {
  return (
    <section
      className="w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/bg_black.jpeg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <img
        className="lg:w-[35%] w-[80%] "
        src="./bg_not_found_2.png"
        alt="not found pic"
      />
        <div className="absolute inset-0 flex items-end justify-center mb-20">
          <Link to="/">
            <Button> Volver al Inicio</Button>
          </Link>
        </div>
    </section>
  );
}

export default NotFound;
