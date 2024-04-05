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

  console.log(reviewData)
  const tabsData = [
    {
      label: 'Precios',
      content:
        consumedData && consumedData[0]
          ? `${consumedData[0].product}: ${consumedData[0].price_paid}`
          : 'Loading...',
    },
    {
      label: 'Comentarios',
      content: 
        reviewData && reviewData[0]
          ?  ` ${reviewData[1].nickname.toUpperCase()}: ${reviewData[1].comment} `
          : "sin comentarios",
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
        <p>{tabsData[activeTabIndex].content || 'Loading...'}</p>
      </div>
    </div>
  );
}

export default Tabs;
