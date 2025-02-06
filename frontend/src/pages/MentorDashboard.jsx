import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

import "react-calendar/dist/Calendar.css";
import {
  FaUsers,
  FaBookOpen,
  FaClipboardList,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaVideo,
  FaStar,
  FaUser,
} from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Tutor from "./tutor";
import dummyData from './dummy.json'; // Import the dummy data
import Whiteboard from "./Whiteboard";

// Registering chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MentorDashboard = () => {
  const [currentPage, setCurrentPage] = useState("Dashboard");
  const [showNotifications, setShowNotifications] = useState(false);
  const [studentProgress, setStudentProgress] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    setStudentProgress(dummyData);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
          if (currentPage === 'Create Meeting') {
            navigate('/mentor/createMeeting'); // Redirect to the live classes route
          }
        }, [currentPage, navigate]);

  // Sample Data for Dashboard
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Enrollments",
        data: [12, 19, 10, 15, 22, 30, 25],
        backgroundColor: "#6366F1",
        borderRadius: 8,
      },
    ],
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Performance",
        data: [65, 59, 80, 81, 56, 55, 70],
        borderColor: "#22C55E",
        tension: 0.4,
        fill: false,
        pointBackgroundColor: "#22C55E",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "#ffffff", font: { size: 14 } },
      },
    },
    scales: {
      x: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.1)" } },
      y: { ticks: { color: "#ffffff" }, grid: { color: "rgba(255,255,255,0.1)" } },
    },
  };

  // Notifications Data
  const notifications = [
    { text: "New student enrolled." },
    { text: "Course 'React Basics' has been published." },
    { text: "New assignment submitted by John." },
  ];

  // Pages for Sidebar
  const pages = [
    "Dashboard",
    "Course Management",
    "Student Progress",
    "Create Meeting",
    "Whiteboard",
    // "Sessions",
    // "Payments",
    "Certificates",
    "Profile & Settings",
    "Feedback",
  ];

  // Prepare data for the Student Progress chart
  const studentChartData = {
    labels: studentProgress.map(student => student.name),
    datasets: [
      {
        label: "React Basics",
        data: studentProgress.map(student => {
          const course = student.courses.find(course => course.title === "React Basics");
          return course ? course.completed : 0;
        }),
        backgroundColor: "#6366F1",
      },
      {
        label: "JavaScript Fundamentals",
        data: studentProgress.map(student => {
          const course = student.courses.find(course => course.title === "JavaScript Fundamentals");
          return course ? course.completed : 0;
        }),
        backgroundColor: "#22C55E",
      },
      {
        label: "Node.js Essentials",
        data: studentProgress.map(student => {
          const course = student.courses.find(course => course.title === "Node.js Essentials");
          return course ? course.completed : 0;
        }),
        backgroundColor: "#FBBF24",
      },
      {
        label: "CSS Mastery",
        data: studentProgress.map(student => {
          const course = student.courses.find(course => course.title === "CSS Mastery");
          return course ? course.completed : 0;
        }),
        backgroundColor: "#F87171",
      },
    ],
  };


  // Sample upcoming sessions data
  const upcomingSessions = [
    {
      course: "React Basics",
      dateTime: "2023-10-15T15:00:00",
      link: "https://zoom.us/j/123456789",
    },
    {
      course: "JavaScript Fundamentals",
      dateTime: "2023-10-16T17:00:00",
      link: "https://zoom.us/j/987654321",
    },
    {
      course: "Node.js Essentials",
      dateTime: "2023-10-17T14:00:00",
      link: "https://zoom.us/j/456789123",
    },
  ];


  const certificates = [
    {
      course: "React Basics",
      student: "John Doe",
      image: "https://imgs.search.brave.com/_MVY7owKyLpeATZG1sfb0vHmpxEFg9h4Ew8nEiOryvg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9yZWFjdC9pbWdf/Y2VydF9yZWFjdC5q/cGc",
    },
    {
      course: "JavaScript Fundamentals",
      student: "Jane Smith",
      image: "https://imgs.search.brave.com/qpy4K1y6gAYSAbLzpoUdBlA9XIXZ_RtRWvkzfeE2F_Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jYW1w/dXMudzNzY2hvb2xz/LmNvbS9jZG4vc2hv/cC9maWxlcy9jZXJ0/aWZpY2F0ZV9vZl9j/b21wbGV0aW9uX2ph/dmFzY3JpcHRfcHJv/ZmVzc2lvbmFsX2Zj/NjgxODU4LTE5ZTIt/NGJmZi05YWIzLTMz/NmQ1OWM3NmExNl85/OTV4Nzg2LmpwZz92/PTE3MTIxNzAwNTA",
    },
    {
      course: "Node.js Essentials",
      student: "Bob Johnson",
      image: "https://imgs.search.brave.com/NndAK986AIuS7hZHsuUyHA57RF2UoOVZ9gygx6r6Mmc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jYW1w/dXMudzNzY2hvb2xz/LmNvbS9jZG4vc2hv/cC9maWxlcy9jZXJ0/aWZpY2F0ZV9vZl9j/b21wbGV0aW9uX25v/ZGUuanNfcHJvZmVz/c2lvbmFsXzBhMzYx/Y2VhLTIzNzctNGU1/Mi1hYjliLThlNGE5/MTQyYTFkMl85OTV4/Nzg2LmpwZz92PTE3/MTA5MzYzMTY",
    },
  ];



  const reviews = [
    { name: "Alice", message: "Amazing mentorship session!", stars: 5 },
    { name: "Bob", message: "Learned a lot, thank you!", stars: 4 },
    { name: "Charlie", message: "Could improve clarity.", stars: 3 },
    { name: "Diana", message: "Very helpful session.", stars: 5 },
    { name: "Eve", message: "Good guidance overall.", stars: 4 },
    { name: "Frank", message: "Not what I expected.", stars: 2 },
    { name: "Grace", message: "Excellent tips shared!", stars: 5 },
    { name: "Hank", message: "Average session.", stars: 3 },
    { name: "Ivy", message: "Helpful advice.", stars: 4 },
    { name: "Jake", message: "Would recommend!", stars: 5 },
  ];
  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      {/* Sidebar */}
      <aside className="flex flex-col bg-gray-800 p-6 w-64">
        <h1 className="mb-6 font-bold text-xl">Mentor Dashboard</h1>
        <nav className="space-y-4">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`p-2 rounded block w-full text-left ${currentPage === page ? "bg-gray-700" : "hover:bg-gray-700"}`}
            >
              {page}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-2xl">{currentPage}</h2>
          <FaBell
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-2xl text-gray-400 hover:text-white cursor-pointer"
          />
        </div>

        {/* Dashboard Content */}
        {currentPage === "Dashboard" && (
          <>
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-gray-800 shadow p-4 rounded">
                <h3 className="mb-4 font-semibold text-lg">Weekly Enrollments</h3>
                <div className="h-64">
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-gray-800 shadow p-4 rounded">
                <h3 className="mb-4 font-semibold text-lg">Performance Overview</h3>
                <div className="h-64">
                  <Line data={lineData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="mt-6">
              <h3 className="mb-4 font-semibold text-xl">Recent Notifications</h3>
              <ul className="bg-gray-800 shadow p-4 rounded">
                {notifications.map((notification, index) => (
                  <li key={index} className="bg-gray-700 mb-2 p-3 rounded">
                    {notification.text}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Course Management Page */}
        {currentPage === "Course Management" && (
          <Tutor />
        )}

        {/* Student Progress Tracking */}
        {currentPage === "Student Progress" && (
          <div className="bg-gray-800 shadow p-4 rounded">
            <h3 className="mb-4 font-semibold text-lg">Student Progress Tracking</h3>
            <div className="h-64">
              <Bar data={studentChartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Sessions Page */}
        {/* {currentPage === "Sessions" && (
          <div className="bg-gray-800 shadow p-4 rounded">
            <h3 className="mb-4 font-semibold text-lg">Sessions</h3>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="bg-gray-700 shadow p-4 rounded">
                  <h4 className="font-bold text-lg">{session.course}</h4>
                  <p className="text-gray-400">Date & Time: {new Date(session.dateTime).toLocaleString()}</p>
                  <button className="flex items-center bg-blue-600 mt-2 p-2 rounded text-white">
                    <FaVideo className="mr-2" /> Join Meeting
                  </button>
                  <p className="mt-2 text-gray-400">Meeting Link: <a href={session.link} className="text-blue-400" target="_blank" rel="noopener noreferrer">{session.link}</a></p>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Whiteboard */}
        {currentPage === "Whiteboard" && (
          <Whiteboard />
        )}



        {/* Certificates Page */}
        {currentPage === "Certificates" && (
          <div className="bg-gray-950 shadow p-4 rounded">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate, index) => (
                <div key={index} className="bg-gray-900 shadow p-4 border border-teal-600 rounded">
                  <img src={certificate.image} alt={`${certificate.course} Certificate`} className="mb-2 w-full h-40 object-contain" />
                  <h4 className="font-bold text-lg">{certificate.course}</h4>
                  <p className="text-gray-400">Awarded to: {certificate.student}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Profile & Settings Content */}
        {currentPage === "Profile & Settings" && (
          <div className="bg-gray-800 shadow p-4 rounded">
            <h3 className="mb-4 font-semibold text-lg">Profile Settings</h3>
            <button className="flex justify-center items-center bg-red-600 hover:bg-red-700 p-3 rounded w-[100px] text-white transition duration-300 ease-in-out">
              <FaSignOutAlt className="mr-2" size={20} /> Logout
            </button>
          </div>
        )}

        {/* {Revies} */}
        {currentPage === "Feedback" && (
          <div className="mt-6">
            <h3 className="mb-4 font-semibold text-xl">Student Reviews</h3>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <div key={index} className="flex bg-gray-800 shadow p-4 rounded">
                  <FaUser className="mr-4 text-4xl text-gray-500" />
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="mb-2 text-gray-400">{review.message}</p>
                    <div className="flex">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <FaStar
                            key={i}
                            className={`${i < review.stars ? "text-yellow-400" : "text-gray-400"
                              }`}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notifications Popup */}
      {showNotifications && (
        <div className="top-0 right-0 z-10 fixed bg-gray-800 shadow-lg mt-12 mr-6 p-4 rounded w-80 max-h-96 overflow-auto">
          <h3 className="mb-4 font-semibold text-lg">Notifications</h3>
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div key={index} className="flex items-center space-x-4">
                <p>{notification.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;