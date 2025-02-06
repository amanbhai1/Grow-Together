import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "../../redux/mentorSlice";
import { useNavigate } from "react-router-dom";

const categories = [
    { name: "Frontend Developer", mentorsAvailable: 12, image: "https://abbtech.az/storage/uploads/files/1687508692_1615533694-frontendd.svg" },
    { name: "Backend Developer", mentorsAvailable: 8, image: "https://ddi-dev.com/uploads/backend-is.png" },
    { name: "Data Science", mentorsAvailable: 15, image: "https://community.nasscom.in/sites/default/files/styles/960_x_600/public/media/images/DATA%20SCIENCE%20MODEL.jpg?itok=Uw9IQgUd" },
    { name: "Graphic Designer", mentorsAvailable: 10, image: "https://img.freepik.com/free-photo/people-working-together-animation-studio_23-2149207990.jpg?semt=ais_hybrid" },
    { name: "FullStack Developer", mentorsAvailable: 5, image: "https://www.thinknexttraining.com/images/Full-Stack-Development-Course-in-Chandigargh-mob-min.jpg" },
    { name: "AI/ML", mentorsAvailable: 7, image: "https://s3-ap-south-1.amazonaws.com/ricedigitals3bucket/AUPortalContent/2022/09/29160306/Number-Theory4.png" },
    { name: "UI/UX", mentorsAvailable: 20, image: "https://www.addwebsolution.com/app/uploads/2024/04/difference-between-ui-ux-design.webp" },
    { name: "App Developer", mentorsAvailable: 13, image: "https://ideausher.com/wp-content/uploads/2022/07/covr-image-50_result.webp" },
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const carouselRef = useRef(null);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleCategoryClick = (category) => {
        dispatch(setSelectedCategory(category.name));
        navigate("/mentor-category");
    };

    const handleKeyPress = (e) => {
        if (e.key === "ArrowRight") {
            setCurrentIndex((prev) => Math.min(prev + 1, Math.ceil(categories.length / 4) - 1));
        } else if (e.key === "ArrowLeft") {
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        startX.current = e.pageX - carouselRef.current.offsetLeft;
        scrollLeft.current = carouselRef.current.scrollLeft;
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = x - startX.current;
        carouselRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            className="w-full lg:w-5/6 mx-auto mb-32"
            tabIndex={0}
            onKeyDown={handleKeyPress} // Keyboard scrolling
        >
            <div
                className="relative overflow-x-hidden"
                ref={carouselRef}
                onMouseDown={handleMouseDown} // Dragging
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div
                    className="flex transition-transform duration-500"
                    style={{
                        transform: `translateX(-${currentIndex * 10}%)`,
                    }}
                >
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full md:w-2/3 md:p-12 lg:w-1/4 px-2 py-12"
                        >
                            <div
                                className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer"
                                onClick={() => handleCategoryClick(category)}
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold">{category.name}</h3>
                                    <p className="text-sm text-gray-500">{category.mentorsAvailable} Mentors Available</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons (visible only on lg and above) */}
            <div className="hidden lg:block relative">
                <button
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    className="absolute -left-20 -top-40 transform -translate-y-1/2 bg-white text-3xl p-8 rounded-full z-10 hover:bg-gray-700 hover:text-white border"
                >
                    &#8249;
                </button>
                <button
                    onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, Math.ceil(categories.length / 4) - 1))}
                    className="absolute -right-20 -top-40 transform -translate-y-1/2 bg-white text-3xl p-8 rounded-full z-10 hover:bg-gray-700 hover:text-white border"
                >
                    &#8250;
                </button>
            </div>
        </div>
    );
};

export default CategoryCarousel;