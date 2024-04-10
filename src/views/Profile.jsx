import Avatar from '../components/Avatar'; // Importa el componente Avatar
import Card from '../components/Card'; // Importa el componente Card
import { Link } from 'react-router-dom'; // Importa la función Link
import useGetShops from '../hooks/useShops';

function Profile() {
  const { shops } = useGetShops();
  //console.log(cards);

  const loggedUser = localStorage.getItem('id');
  //console.log(loggedUser);

  const userShops = shops.filter((shop) => shop.user_id === loggedUser);
  //console.log(userShops);

  return (
    <>
      <div className="p-5">
        {' '}
        {/* Contenedor de Avatar con padding */}
        <Avatar>
          {' '}
          {/* Renderiza el componente Avatar */}
          <div></div>
        </Avatar>
      </div>
      <div className="flex flex-col items-center">
        {' '}
        {/* Contenedor principal de las cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 p-10">
          {userShops.map((shop) => (
            <Link to={`/local/${shop.shop_id}`} key={shop.shop_id}>
              {/* Enlace a la tienda */}
              <Card
                key={shop.shop_id}
                id={shop.shop_id}
                title={shop.shop_name}
                img={shop.image}
                rating={shop.rating}
                category={shop.category_id}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
