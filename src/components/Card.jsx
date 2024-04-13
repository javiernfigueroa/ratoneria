import { Link } from 'react-router-dom';
import Tabs from '../components/Tabs';
import Star from './Star';

function Card({ id, img, title, rating, category }) {
  const handleMouseDown = (event) => {
    if (event.button === 1) {
      event.preventDefault();
      window.open(`/local/${id}`, '_blank');
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <Link
        to={`/local/${id}`}
        className="flex flex-col w-full h-1/2 rounded gap-5 items-center self-center cursor-pointer"
      >
        <div
          className="w-full h-full flex rounded shadow-2xl"
          onMouseDown={handleMouseDown}
        >
          <img src={img} alt="imagen" />
        </div>
      </Link>
      <div className="bg-pdark-grey h-auto">
        <p className="flex-auto text-center text-2xl text-white m-2">{title}</p>
        <p className="text-white text-center p-2">{category}</p>
        <div>
          <Star paramRating={rating}></Star>
        </div>
        <div>
          <Tabs localId={id} view={'gallery'}></Tabs>
        </div>
      </div>
    </div>
  );
}

export default Card;
