import { useState, useEffect } from 'react';
import axios from 'axios';
//coment/
function Tabs({ localId }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [consumedData, setConsumedData] = useState();
  const [reviewData, setReviewData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/consumed/${localId}`,
        );
        setConsumedData(response.data.consumed);
        //console.log(consumedData)

        const resReview = await axios.get(
          `http://localhost:3000/api/v1/reviews/${localId}`,
        );
        setReviewData(resReview.data.reviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [localId]);

  const tabsData = [
    {
      label: 'Precios',
      content:
        consumedData && consumedData.length > 0
          ? consumedData.map((consumed, index) => (
              <li className="flex flex-col" key={index}>
                {`${consumed.product.toUpperCase()}: ${consumed.price_paid}`}
              </li>
            ))
          : 'No se agregado precios',
    },
    {
      label: 'Comentarios',
      content:
        reviewData && reviewData.length > 0
          ? reviewData.map((review, index) => (
              <li className="flex flex-col" key={index}>
                {`${review.nickname.toUpperCase()}: ${review.comment}`}
              </li>
            ))
          : 'Sin comentarios',
    },
  ];

  return (
    <div className="ml-5 text-white">
      <div className="flex gap-3 ml-4 ">
        {tabsData.map((tab, idx) => {
          return (
            <button
              key={idx}
              className={`py-2 border-b-4 transition-colors duration-300 ${
                idx === activeTabIndex
                  ? 'border-porange'
                  : 'border-transparent hover:border-porange'
              }`}
              onClick={() => setActiveTabIndex(idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="py-4 ml-4">
        <ul className="overflow-y-scroll h-28 ">
          {tabsData[activeTabIndex].content || 'Loading...'}
        </ul>
        {/* {tabsData[activeTabIndex].label === "Precios"
        ? <Button>Agregar</Button>
        : <Button>Comentar</Button>}   */}
      </div>
      {/* <Modal/> */}
    </div>
  );
}

export default Tabs;
