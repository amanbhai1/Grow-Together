import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "../../redux/mentorSlice"; // Redux action
import { motion, AnimatePresence } from "framer-motion";
import { Pagination } from "@mui/material";
import MentorCard from "./MentorCard";  // Import MentorCard component

const categories = ["All", "Frontend", "AIML", "Backend", "Design"];

const mentors = [
    { id: 1, name: "John Doe", category: "Frontend", location: "New York", image: "https://franchisematch.com/wp-content/uploads/2015/02/john-doe.jpg" },
    { id: 2, name: "Jane Smith", category: "AIML", location: "San Francisco", image: "https://photos.psychologytoday.com/c24de5d8-33ab-4612-a41f-e42835ed447b/1/320x400.jpeg" },
    { id: 3, name: "Samuel Lee", category: "Backend", location: "London", image: "https://www.procopio.com/static/d025e65c6f0f1a43cf10991c4a123f2c/ce71e/Procopio_Lee-S.-Samuel_Bio-Photo-6032.jpg" },
    { id: 4, name: "Alice Walker", category: "Frontend", location: "Toronto", image: "https://cdn.britannica.com/07/220907-050-F5304E05/Alice-Walker.jpg" },
    { id: 5, name: "Mark Johnson", category: "Design", location: "Berlin", image: "https://researchers.mq.edu.au/files-asset/20015470/MJ.jpg/" },
    { id: 6, name: "Sara White", category: "AIML", location: "Sydney", image: "https://photos.psychologytoday.com/2ea8ec23-8c66-46a2-b116-00062e5e0df4/4/320x400.jpeg" },
    // Add more mentor data as needed
];

const MentorCategory = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQueryState] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const mentorsPerPage = 6;

    // Filter mentors based on the active category and search query
    const filteredMentors = mentors.filter(
        (mentor) =>
            (activeCategory === "All" || mentor.category === activeCategory) &&
            mentor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalMentors = filteredMentors.length;
    const pageCount = Math.ceil(totalMentors / mentorsPerPage);
    const indexOfLastMentor = currentPage * mentorsPerPage;
    const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
    const currentMentors = filteredMentors.slice(indexOfFirstMentor, indexOfLastMentor);

    const handleChangePage = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search mentors..."
                    className="w-full p-3 border rounded-lg"
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQueryState(e.target.value);
                        setCurrentPage(1); // Reset to the first page
                    }}
                />
            </div>

            {/* Responsive Layout */}
            <div className="flex flex-col md:flex-row gap-8 border w-full justify-between rounded-md p-4 sm:p-6">
                {/* Category Buttons */}
                <div className="flex md:flex-col flex-wrap justify-center gap-4 md:gap-6">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => {
                                setActiveCategory(category);
                                setCurrentPage(1); // Reset pagination on category change
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`px-4 py-2 md:px-6 w-auto md:w-32 text-sm md:text-lg rounded-lg border ${
                                activeCategory === category
                                    ? "bg-teal-300 text-white"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                {/* Mentor Cards */}
                <div className="w-full px-4 sm:px-6 md:px-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {currentMentors.map((mentor) => (
                                <MentorCard key={mentor.id} mentor={mentor} />
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-8">
                        <Pagination
                            count={pageCount}
                            page={currentPage}
                            onChange={handleChangePage}
                            color="primary"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorCategory;
