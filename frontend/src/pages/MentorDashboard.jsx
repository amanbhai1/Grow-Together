import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
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
    "Sessions",
    "Payments",
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
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-6">Mentor Dashboard</h1>
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
          <h2 className="text-2xl font-bold">{currentPage}</h2>
          <FaBell
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-2xl text-gray-400 hover:text-white cursor-pointer"
          />
        </div>

        {/* Dashboard Content */}
        {currentPage === "Dashboard" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Weekly Enrollments</h3>
                <div className="h-64">
                  <Bar data={barData} options={chartOptions} />
                </div>
              </div>
              <div className="bg-gray-800 p-4 rounded shadow">
                <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
                <div className="h-64">
                  <Line data={lineData} options={chartOptions} />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Recent Notifications</h3>
              <ul className="bg-gray-800 p-4 rounded shadow">
                {notifications.map((notification, index) => (
                  <li key={index} className="bg-gray-700 p-3 rounded mb-2">
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
          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Student Progress Tracking</h3>
            <div className="h-64">
              <Bar data={studentChartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Sessions Page */}
        {currentPage === "Sessions" && (
          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Sessions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingSessions.map((session, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded shadow">
                  <h4 className="font-bold text-lg">{session.course}</h4>
                  <p className="text-gray-400">Date & Time: {new Date(session.dateTime).toLocaleString()}</p>
                  <button className="bg-blue-600 text-white p-2 rounded mt-2 flex items-center">
                    <FaVideo className="mr-2" /> Join Meeting
                  </button>
                  <p className="text-gray-400 mt-2">Meeting Link: <a href={session.link} className="text-blue-400" target="_blank" rel="noopener noreferrer">{session.link}</a></p>
                </div>
              ))}
            </div>
          </div>
        )}



        {/* Certificates Page */}
        {currentPage === "Certificates" && (
          <div className="bg-gray-950 p-4 rounded shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate, index) => (
                <div key={index} className="bg-gray-900 border border-teal-600 p-4 rounded shadow">
                  <img src={certificate.image} alt={`${certificate.course} Certificate`} className="w-full h-40 object-contain mb-2" />
                  <h4 className="font-bold text-lg">{certificate.course}</h4>
                  <p className="text-gray-400">Awarded to: {certificate.student}</p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Profile & Settings Content */}
        {currentPage === "Profile & Settings" && (
          <div className="bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Profile Settings</h3>
            <button className="bg-red-600 text-white p-3 rounded flex items-center w-[100px] justify-center hover:bg-red-700 transition duration-300 ease-in-out">
              <FaSignOutAlt className="mr-2" size={20} /> Logout
            </button>
          </div>
        )}

        {/* {Revies} */}
        {currentPage === "Feedback" && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Student Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded shadow flex">
                  <FaUser className="text-4xl text-gray-500 mr-4" />
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="text-gray-400 mb-2">{review.message}</p>
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
        <div className="fixed top-0 right-0 mt-12 mr-6 bg-gray-800 p-4 rounded shadow-lg w-80 max-h-96 overflow-auto z-10">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
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