import React, { useState } from "react";
import { FaVideo, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateMeeting = () => {
  const [joinCode, setJoinCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle joining a room
  const handleJoinRoom = () => {
    if (joinCode.length !== 4) {
      setError("Invalid join code! It must be exactly 4 characters.");
    } else {
      setError("");
      navigate(`/room/${joinCode}`);
    }
  };

  // Handle creating a new room
  const handleCreateRoom = () => {
    const roomId = generateRoomId(); // Generate a random 4-character room ID
    navigate(`/room/${roomId}`);
  };

  // Generate a random 4-character room ID
  const generateRoomId = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black pr-5 pl-5 min-h-screen text-white">
      <motion.div
        className="bg-gray-800 bg-opacity-90 shadow-2xl backdrop-blur-md p-8 rounded-3xl w-full max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="bg-blue-600 shadow-lg p-4 rounded-full animate-pulse"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.4,
            }}
          >
            <FaVideo className="text-3xl text-white" />
          </motion.div>
          <motion.h1
            className="mt-4 font-extrabold text-3xl text-center tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Video Conference
          </motion.h1>
        </motion.div>

        {/* Form Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleJoinRoom();
          }}
          className="space-y-6"
        >
          {/* Input Field */}
          <div className="relative">
            <label htmlFor="joinCode" className="block mb-2 font-medium text-lg">
              Join Code
            </label>
            <motion.input
              type="text"
              id="joinCode"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.trim())}
              placeholder="Enter Meeting Code"
              maxLength={4}
              className="border-gray-600 bg-gray-700 px-6 py-4 border rounded-md focus:ring-2 focus:ring-blue-500 w-full text-white focus:outline-none text-xl transform transition-transform hover:scale-105"
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                delay: 0.6,
              }}
            />
            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
          </div>

          {/* Join Meeting Button */}
          <motion.button
            type="submit"
            className="flex justify-center items-center space-x-2 bg-gradient-to-r from-blue-500 hover:from-purple-600 to-purple-600 hover:to-blue-500 shadow-lg py-4 rounded-full w-full font-bold text-lg text-white transform transition-transform hover:scale-105"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.8,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaVideo className="text-xl" />
            <span>Join Meeting</span>
          </motion.button>
        </form>

        {/* Create Meeting Button */}
        <motion.button
          onClick={handleCreateRoom}
          className="flex justify-center items-center space-x-2 bg-gradient-to-r from-green-500 hover:from-teal-600 to-teal-600 hover:to-green-500 shadow-lg mt-6 py-4 rounded-full w-full font-bold text-lg text-white transform transition-transform hover:scale-105"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 1,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus className="text-xl" />
          <span>Create Meeting</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CreateMeeting;