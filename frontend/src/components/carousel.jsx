import React, { useState, useEffect } from 'react';
import { MdOutlineStar } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { GrCaretPrevious } from "react-icons/gr";
import { GrCaretNext } from "react-icons/gr";

const Carousel = ({ trending = [] }) => {
  if (!trending || !trending.length) return null;

  const tr = [trending[trending.length - 1], ...trending, trending[0]];
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  function handleTry(item) {
    navigate(`/course/${item}`);
  }

  useEffect(() => {
    if (isHovered) return;
    handleNext();

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => {
    if (isTransitioning || currentIndex === tr.length - 1) return;  // Prevent next if at the last item
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    if (isTransitioning || currentIndex === 0) return;  // Prevent previous if at the first item
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex === 0) {
      setCurrentIndex(trending.length);
    } else if (currentIndex === tr.length - 1) {
      setCurrentIndex(1);
    }
  };

  return (
    <div
      className="relative w-5/6 mx-auto overflow-hidden shadow-lg h-auto rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex transition-transform ease-in-out duration-1000`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 1s ease-in-out' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {tr.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex flex-col items-center justify-center text-center bg-white  w-full h-full relative z-20"
          >
            <div className="absolute bottom-0 left-4 z-30 p-4 flex flex-col items-start bg-transparent">
              <h3 className="text-xl text-white font-bold md:text-3xl">{item?.courseName}</h3>
              <button
                onClick={() => handleTry(item.courseId)}
                className="mt-3 h-10 px-6 rounded-full bg-teal-300 text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Try this
              </button>
            </div>
            <img
              src={`/images/${item?.category}.jpg`}
              alt={item?.category || 'default'}
              className="w-full h-[230px] md:h-full object-cover "
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800 to-teal-900 opacity-80"></div>
            <div className="absolute bottom-0 right-0 p-4 flex flex-col items-end text-white">
              {/* <p>{item?.courseDesc}</p> */}
              <p>by {item?.courseTutor}</p>
              <p className="flex items-center">
                {item?.rating}
                <MdOutlineStar className="text-yellow-500 ml-1" /> /5
              </p>
            </div>
          </div>
        ))}
      </div>
      <button
        className={`absolute top-1/2 left-3 transform -translate-y-1/2 bg-gray-700 text-gray-400 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handlePrev}
        disabled={currentIndex === 0 || isTransitioning}
      >
        <GrCaretPrevious />
      </button>
      <button
        className={`absolute top-1/2 right-3 transform -translate-y-1/2 bg-gray-700 text-gray-400 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 ${currentIndex === tr.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleNext}
        disabled={currentIndex === tr.length - 1 || isTransitioning}
      >
        <GrCaretNext />
      </button>
    </div>
  );
};

export default Carousel;
