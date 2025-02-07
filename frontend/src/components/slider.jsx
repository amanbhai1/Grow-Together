import React, { useState, useEffect } from 'react';
import { MdOutlineStar, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Slider = ({ trending = [] }) => {
  if (!trending.length) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  function handleTry(item) {
    navigate(`/course/${item}`);
  }

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % trending.length);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? trending.length - 1 : prevIndex - 1
    );
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Track */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 1s ease-in-out' : 'none',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {trending.map((item, index) => (
          <div
            key={index}
            className="min-w-full flex-shrink-0 relative p-4"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={`/images/${item?.category}.jpg`}
                alt={item?.category || 'default'}
                className="w-full h-48 md:h-64 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{item?.courseName}</h3>
                <p className="text-gray-600 mb-4">{item?.courseDesc}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500">by {item?.courseTutor}</p>
                  <p className="flex items-center text-yellow-500">
                    {item?.rating} <MdOutlineStar className="ml-1" /> /5
                  </p>
                </div>
                <button
                  onClick={() => handleTry(item.courseId)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Try this
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <MdChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <MdChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Slider;