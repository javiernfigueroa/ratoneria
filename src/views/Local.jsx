import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetShops from '../hooks/useShops.js';
import Chat from '../components/Chat.jsx';
import SocialLinks from '../components/ui/Rrss.jsx';
import Tabs from '../components/Tabs.jsx';
import Star from '../components/Star.jsx';

function Local() {
  const { shops } = useGetShops();
  const { id } = useParams();
  const [local, setLocal] = useState(() => {
    const storedLocal = localStorage.getItem('local');
    return storedLocal ? JSON.parse(storedLocal) : null;
  });

  useEffect(() => {
    const foundLocal = shops.find(
      (shop) => shop.shop_id.toString() === id.toString(),
    );
    setLocal(foundLocal);
    //localStorage.setItem('local', JSON.stringify(foundLocal));
  }, [id, shops]);

  if (!local) {
    return <div>Loading...</div>;
  }
  return (
    <div className="lg:w-[1024px] xl:w-[1280px] w-full mx-auto relative mb-10 mt-10">
      <div className="bg-pdark-grey inline-block w-full h-full align-top mx-auto px-10 py-10">
        <h1 className="text-3xl md:text-2xl font-bold mb-4 mt-2 text-center text-slate-100">
          {local.shop_name}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center md:justify-evenly  mt-10">
        <div className="w-full md:w-1/2  flex flex-col items-center">
          <div className="h-60 md:h-96 w-60 md:w-96">
            <img
              className="mx-auto h-full rounded-md"
              src={local.image}
              alt=""
            />
          </div>
          <Star paramRating={local.rating} localId={id} enableHover={true}></Star>
          <div className="mt-10 w-11/12 md:w-5/6 ">
            <Tabs localId={id} view="Shop" />
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 mt-5 md:mt-0 ">
          <div
            className=" h-60 md:h-96 p-1 rounded-md w-full md:w-5/6 ml-auto  flex flex-col"
            id="chat"
          >
            <Chat local={local.shop_id.toString()} />
          </div>
          <div className="w-full c mt-10 bg-pdark-grey p-10 rounded-md mx-auto md:w-1/2 text-center">
            <Link to="/">
              <h1 className="text-slate-100">URL DEL LOCAL</h1>
            </Link>
          </div>
          <div className="mt-5 text-lg mx-auto   ">
            <SocialLinks urlig="#" urltw="#" urlfb="#" urlyou="#" size="25px" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Local;
