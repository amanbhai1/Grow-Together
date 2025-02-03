import React from "react";
import { NavLink } from "react-router-dom";
import { CiLocationOn } from "react-icons/ci";
import { motion } from "framer-motion";

const MentorCard = ({ mentor }) => {
    return (
        <motion.div
            key={mentor.id}
            className="group bg-teal-100 shadow-lg mt-6 p-4 rounded-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="relative">
                {/* Mentor Image */}
                <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="mx-auto rounded-xl w-4/5 h-64 object-cover"
                />
                <div className="bottom-0 left-0 absolute bg-gradient-to-t from-teal-100 to-transparent p-4 w-full">
                    <h3 className="mt-20 font-semibold text-xl">{mentor.name}</h3>
                    <span className="text-red-400 text-sm">{mentor.category}</span>
                </div>
            </div>

            <div className="mt-4">
                {/* Mentor Location */}
                <h6 className="flex items-center font-medium text-base">
                    <CiLocationOn /> {mentor.location}
                </h6>
            </div>

            <div className="mt-6">
                {/* Message Mentor Button */}
                <NavLink to={`/mentor/${mentor.id}`}>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="bg-gray-800 hover:from-green-500 hover:to-green-700 px-4 py-2 rounded-lg w-full font-medium text-white focus:outline-none"
                    >
                        Message Mentor
                    </motion.button>
                </NavLink>
            </div>
        </motion.div>
    );
};

export default MentorCard;
