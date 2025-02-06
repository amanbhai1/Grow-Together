import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser, FiBookOpen, FiClock, FiCalendar } from "react-icons/fi";
import ProgressBar from "../components/progressBar"; // For progress bars (optional)
import { BookOpen, CheckCircle, Users, Layers , Video} from 'lucide-react';
import Profile from "./profile";
import DetailCard from "../components/detailCard";
import toast, { Toaster } from 'react-hot-toast';

function Dashboard() {
    const navigate = useNavigate();
    const [enrolled, setEnrolled] = useState([]);
    const user = useSelector((state) => state.user?.user);
    useEffect(() => {
        async function getOfferedList() {
            axios.post('http://localhost:5000/api/getCourseList', { email: user.email }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setEnrolled(res.data.enrolled);
                        setTrending(res.data.trending);
                    } else {
                        toast.error('Server error');
                    }
                })
                .catch(() => {
                    toast.error('Something went wrong!');
                });
        }
        getOfferedList();
        
    }, []);
    // const [imageUrl, setImageUrl] = useState('');
    // const handleImageUrlChange = (url) => {
    //     console.log('Image URL:', url); // Add this line
    //     setImageUrl(url);
    // };
    const [userData, setUserData] = useState(null);
    const [students, setStudents] = useState([
        { name: 'Common English', progress: 95 },
        { name: 'Business English', progress: 75 },
        { name: 'Spanish Grammar', progress: 60 },
    ]);

    const [courses, setCourses] = useState([
        { name: 'Common English', description: 'Cambridge advanced.pdf', members: 48, size: '28 MB' },
        { name: 'Business English', description: 'English Dictionary.wav', members: 30, size: '60 MB' },
        { name: 'Spanish Grammar', description: 'Easy Learning Book.zip', members: 68, size: '48 MB' },
    ]);

    const [settings, setSettings] = useState(<Profile />);  

    const [completedTasks, setCompletedTasks] = useState([
        { name: 'English Grammar Test', icon: <BookOpen /> },
        { name: 'Irregular Verbs', icon: <CheckCircle /> },
        { name: 'Spanish', icon: <Layers /> },
    ]);

    const [selectedItem, setSelectedItem] = useState('students');

    const sidebarItems = [
        {
            label: `${userData?.fname} ${userData?.lname}`
            , key: 'students', icon: <Users />
        },
        { label: 'Courses', key: 'courses', icon: <BookOpen /> },
        {label: 'Live Classes', key: 'liveclass', icon: <Video />},
        { label: 'Settings', key: 'settings', icon: <Layers /> },
        { label: 'Completed Tasks', key: 'completedTasks', icon: <CheckCircle /> },
    ];
    useEffect(() => {
        if (selectedItem === 'liveclass') {
          navigate('/meeting'); // Redirect to the live classes route
        }
      }, [selectedItem, navigate]);

    useEffect(() => {
        if (!user) return; // Prevent API call if user is undefined

        async function getUserData() {
            try {
                const res = await axios.post(
                    "http://localhost:5000/api/getUserDetails",
                    { email: user.email },
                    {
                        headers: { Authorization: `Bearer ${user.token}` },
                    }
                );
                if (res.status === 200) {
                    setUserData(res.data);
                    setEnrolledCourses(res.data.enrolledCourses || []);
                    setCompletedCourses(res.data.completedCourses || []);
                    setHoursSpent(res.data.hoursSpent || 0);
                } else {
                    console.error("Server error");
                }
            } catch (error) {
                console.error("Error fetching user details", error);
            }
        }

        getUserData();
    }, [user]); // Added user as dependency

    if (!userData) return <div className="mt-10 text-center">Loading...</div>;
    function handleEnrolled(item) {
        navigate(`/course/${item}`);
    }
    return (
        <div className="flex bg-gray-100 h-full">
            {/* Sidebar */}
            <div className="bg-gray-900 shadow-lg p-6 w-1/4 text-white">
                <h2 className="mb-6 font-bold text-center text-xl">Dashboard</h2>
                <ul>
                    {sidebarItems.map((item) => (
                        <li
                            key={item.key}
                            className={`flex items-center gap-3 p-3 mb-2 rounded-lg cursor-pointer transition-all hover:bg-gray-700 ${selectedItem === item.key ? 'bg-gray-800' : ''
                                }`}
                            onClick={() => setSelectedItem(item.key)}
                        >
                            {item.icon}
                            {item.label}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div className="p-6 w-3/4">
                {selectedItem === 'students' && (
                    <div className="w-full">
                        {/* UserDetails */}
                        <div className="mx-auto py-6 w-full">
                            {/* <div className="flex items-center bg-white shadow-lg p-6 rounded-lg">
                                <div className="flex justify-center items-center bg-gray-300 rounded-full w-20 h-20 font-bold text-2xl">
                                    <FiUser size={40} />
                                </div>
                                <div className="ml-4">
                                <h2 className="mb-4 font-semibold text-2xl">{userData?.fname} {userData?.lname}</h2>
                                    <p className="text-gray-600">📧 Email: {userData?.email}</p>
                                    <p className="text-gray-600">🎓 Roll Number: {userData?.roll || "Not available"}</p>
                                    <p className="text-gray-600">📞 Mobile Number: {userData?.mobile}</p>
                                    <p className="text-gray-600">
                                        🌎 Language: {userData?.language || "Not specified"}
                                    </p>
                                    <p className="font-semibold text-gray-600">🛡 Role: {userData?.role || "Not specified"}</p>
                                </div>
                            </div> */}
                        <DetailCard fname={userData?.fname} lname={userData?.lname} rollno={userData?.roll || "Not available"} mobile={userData?.mobile} role={userData?.role || "Not specified"} email={userData?.email} />
                        </div>
                        <div className="flex justify-evenly">
                            {students.map((student, index) => (
                                <div key={index} className="bg-white shadow-lg p-4 rounded-xl">
                                    <h3 className="font-semibold text-lg">{student.name}</h3>
                                    <ProgressBar progress={student.progress} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedItem === 'courses' && (
                    <div>
                        <h2 className="mb-4 font-semibold text-2xl">Courses</h2>
                        <div className="gap-4 grid">
                            {courses.map((course, index) => (
                                <div key={index} className="bg-white shadow-lg p-4 rounded-xl">
                                    <h3 className="font-semibold text-lg">{course.name}</h3>
                                    <p>{course.description}</p>
                                    <p className="text-gray-600 text-sm">Members: {course.members}</p>
                                    <p className="text-gray-600 text-sm">Size: {course.size}</p>
                                </div>
                            ))}
                        </div>
                        <div className='bg-white shadow-md p-6 rounded-lg'>
                            <h2 className='mb-4 font-bold text-xl'>Enrolled Courses</h2>
                            <ul>
                                {enrolled.map((item, index) => (
                                    <li key={index} className='hover:bg-gray-200 p-2 rounded cursor-pointer' onClick={() => handleEnrolled(item.courseId)}>
                                        {item.courseName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {selectedItem === 'settings' && (
                    <Profile />
                )}
                {selectedItem === 'completedTasks' && (
                    <div>
                        <h2 className="mb-4 font-semibold text-2xl">Completed Tasks</h2>
                        <div className="gap-4 grid">
                            {completedTasks.map((task, index) => (
                                <div key={index} className="flex items-center gap-3 bg-white shadow-lg p-4 rounded-xl">
                                    {task.icon}
                                    <h3 className="font-semibold text-lg">{task.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
