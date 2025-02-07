import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

const SearchFilter = () => {
    const [searchQuery, setSearchQuery] = useState(""); // State to store search input
    const [isFocused, setIsFocused] = useState(false); // State to manage focus effect
    const navigate = useNavigate(); // Hook to navigate

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            // Navigate to /search/{query}
            navigate(`/search/${searchQuery}`);
        }
    };

    return (
        <div
            className={`text-center py-12 bg-gray-50 md:py-32 relative transition-all duration-300 ${isFocused ? "bg-gray-100 shadow-lg scale-105" : ""
                }`}
        >
            <div className="absolute left-72 top-10 hidden md:block">
                <div className="size-16 animate-[bounce_2s_infinite] flex items-center justify-center shadow rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src="https://www.perfocal.com/blog/content/images/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg"
                        alt=""
                    />
                </div>
            </div>
            <div className="absolute right-52 top-32 hidden md:block">
                <div className="size-24 animate-[bounce_2s_infinite] flex items-center justify-center shadow rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src="https://media.istockphoto.com/id/1303206558/photo/headshot-portrait-of-smiling-businessman-talk-on-video-call.jpg?s=612x612&w=0&k=20&c=hMJhVHKeTIznZgOKhtlPQEdZqb0lJ5Nekz1A9f8sPV8=    "
                        alt=""
                    />
                </div>
            </div>
            <div className="absolute left-1/3 transform hidden md:block -translate-x-1/2 top-[500px]">
                <div className="size-16 animate-[bounce_2s_infinite] flex items-center justify-center shadow rounded-full overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src="https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/004.webp"
                        alt=""
                    />
                </div>
            </div>

            <div className="absolute top-32 left-52 w-6 h-6 z-2 hidden md:block rounded-full bg-green-400"></div>
            <div className="absolute top-20 right-96 w-10 h-10 z-2 hidden md:block rounded-full bg-slate-400 z-2"></div>
            <div className="absolute top-60 right-20 w-8 h-8  z-2 hidden md:block rounded-full bg-purple-400"></div>
            <div className="absolute top-80 left-32 w-12 h-12 z-2 hidden md:block rounded-full bg-blue-400"></div>
            <div className="absolute top-10 right-10 w-4 h-4 z-2 hidden md:block rounded-full bg-yellow-400"></div>
            <div className="absolute top-80 right-32 w-6 h-6 z-2 hidden md:block rounded-full bg-red-400"></div>
            <h1 className="text-3xl md:text-6xl font-bold text-gray-800 z-4">
                Everyone needs a <span className="text-teal-600">Mentor</span>
            </h1>
            <NavLink to="/mentee">
                <button className="px-8 py-2 rounded-2xl mt-8 text-white bg-red-300 border hover:bg-white hover:border border-red-300 hover:text-red-300 transition duration-300 ease-in-out">
                    Join Now, It's Free
                </button>
            </NavLink>

            <p className="text-gray-600 md:text-2xl w-3/6 mx-auto mt-6 z-10 text-lg">
                Search amazing individuals around the globe, find a mentor, expand your network, and learn from incredible people!
            </p>
            <div className="mt-6 flex flex-col justify-center items-center gap-3 w-5/6 mx-auto md:flex-row">
                <div className="flex items-center gap-4">
                    <IoSearchSharp className="text-teal-600 text-xl" />
                    <input
                        type="text"
                        placeholder="Search Mentor"
                        className="p-3 border-t border-b border-r md:w-96 bg-white rounded-lg outline-none focus:ring-2 focus:ring-teal-500 w-56"
                        value={searchQuery}
                        onFocus={() => setIsFocused(true)} // Focus effect
                        onBlur={() => setIsFocused(false)} // Remove focus effect
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button
                    className="mt-2 md:mt-0 bg-teal-600 text-white rounded-lg py-3 px-8 transition duration-300 ease-in-out hover:bg-teal-700"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
                Tip: Search by skills, location, or name
            </p>
        </div>
    );
};

export default SearchFilter;
