import Card from './Card';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import useShopsPaginated from '../hooks/useShopsPaginated';

const Gallery = () => {
  const { filters, updateFilters } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { shops } = useShopsPaginated(8, currentPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredCards = shops.filter((shop) => {
    const passesCategoryFilter =
      filters.category === '' || shop.category_name === filters.category;
    const passesRatingFilter =
      filters.rating === '' ||
      parseFloat(shop.rating) === parseFloat(filters.rating);
    return passesCategoryFilter && passesRatingFilter;
  });

  const isLastPage = shops.length < 8;

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[95%] text-white justify-center space-x-4 bg-porange p-2 rounded-md ">
        <select
          className="px-4 py-2 bg-pgrey border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-white"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">Categorias</option>
          <option value="bar">Bar</option>
          <option value="restaurant">Restaurant</option>
        </select>
        <select
          className="px-4 py-2 bg-pgrey border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-white"
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
        >
          <option value="">Valoracion</option>
          <option value="5">5 Estrellas</option>
          <option value="4">4 Estrellas</option>
          <option value="3">3 Estrellas</option>
          <option value="2">2 Estrellas</option>
          <option value="1">1 Estrellas</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 p-10">
        {filteredCards.map((shop) => (
          <Card
            key={shop.shop_id}
            id={shop.shop_id}
            title={shop.shop_name}
            img={shop.image}
            rating={shop.rating}
            category={shop.category_id}
          />
        ))}
      </div>
      <div className="flex justify-center mb-10">
        {currentPage > 1 && (
          <button
            className="font-bold bg-porange text-[18px] rounded-sm p-2 mr-4"
            onClick={handlePreviousPage}
          >
            Anterior
          </button>
        )}
        {!isLastPage && (
          <button
            className="font-bold bg-porange text-[18px] rounded-sm p-2"
            onClick={handleNextPage}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};

export default Gallery;
