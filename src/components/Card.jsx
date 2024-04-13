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
    <div className="flex flex-col h-[500px]">
      <div
        className="flex flex-col w-full h-1/2 rounded gap-5 items-center self-center cursor-pointer"
        onMouseDown={handleMouseDown}
      >
        <Link
          to={`/local/${id}`}
          className="flex flex-col w-full h-full rounded gap-5 items-center self-center cursor-pointer"
          onMouseDown={handleMouseDown}
        >
          <img
            className="w-full h-full flex rounded"
            src={img}
            alt="imagen de un local"
          />
        </Link>
      </div>
      <div className="bg-pdark-grey h-[250px]">
        <p className="flex-auto text-center text-2xl text-white m-2 h-1/5">{title}</p>
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
