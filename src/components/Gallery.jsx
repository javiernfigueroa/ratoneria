import { useState, useEffect, useContext } from 'react';
import Card from './Card';
import { AppContext } from '../context/AppContext';
import useGetShops from '../hooks/useShops';

const Gallery = () => {
  const { filters, updateFilters, shopsData } = useContext(AppContext);
  const { shops } = useGetShops();

  const [loadedShops, setLoadedShops] = useState([]);
  const [loadedCount, setLoadedCount] = useState(8);

  useEffect(() => {
    const activeShops = shopsData.length > 0 ? shopsData : shops;
    const filteredShops = activeShops.filter((shop) => {
      const passesCategoryFilter =
        filters.category === '' || shop.category_name === filters.category;
      const passesRatingFilter =
        filters.rating === '' ||
        parseFloat(shop.rating) === parseFloat(filters.rating);
      return passesCategoryFilter && passesRatingFilter;
    });
    setLoadedShops(filteredShops.slice(0, loadedCount));
  }, [shops, shopsData, loadedCount, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ ...filters, [name]: value });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    const newCount = loadedCount + 8;
    setLoadedCount(newCount);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadedCount]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[95%] gap-4 text-white justify-center space-x-4 bg-porange p-2 rounded-md ">
        <div className="flex flex-col items-center">
          <label htmlFor="category" className="font-bold">
            Categoría
          </label>
          <select
            className="px-4 py-2 bg-pgrey border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-white"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
            <option value="bar">Bar</option>
            <option value="restaurant">Restaurant</option>
          </select>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="rating" className="font-bold">
            Valoración
          </label>
          <select
            className="px-4 py-2 bg-pgrey border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-white"
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
            <option value="5">5 Estrellas</option>
            <option value="4">4 Estrellas</option>
            <option value="3">3 Estrellas</option>
            <option value="2">2 Estrellas</option>
            <option value="1">1 Estrellas</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 lg:p-8 md:p-6 sm:p-3">
        {loadedShops.map((shop) => (
          <Card
            key={shop.shop_id}
            id={shop.shop_id}
            title={shop.shop_name}
            img={shop.image}
            rating={shop.rating}
            totalRating={shop.total_rating}
            category={shop.category_id}
          />
        ))}
      </div>
      <button
        className="fixed bottom-5 right-5 bg-porange hover:bg-pgrey text-white font-bold py-2 px-4 rounded"
        onClick={scrollToTop}
      >
        Ir arriba
      </button>
    </div>
  );
};

export default Gallery;