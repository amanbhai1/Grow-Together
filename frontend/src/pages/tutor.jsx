import '../style/clist.css';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineStar, MdOutlineDeleteSweep } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';

function Tutor() {
    const user = useSelector((state) => state.user.user);
    const [offered, setOffered] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseDesc, setNewCourseDesc] = useState('');
    const [newCourseCat, setNewCourseCat] = useState('');
    const [reload, setReload] = useState(false);

    const navigate = useNavigate();

    function handleOffered(item) {
        navigate(`/manage/${item}`);
    }

    function addOffered(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/addOffered', {
            email: user.email,
            name: user.name,
            tutorId: user.id,
            courseName: newCourseName,
            courseDesc: newCourseDesc,
            courseCat: newCourseCat
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                setReload(prev => !prev);
                setNewCourseName('');
                setNewCourseDesc('');
                setNewCourseCat('');
                setShowPopup(false);
                toast.success('Course added successfully!');
            } else {
                toast.error('Server error');
            }
        })
        .catch(() => {
            toast.error('Something went wrong!');
        });
    }

    function handleDelete(item) {
        axios.post('http://localhost:5000/api/deleteCourse', { courseId: item }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                setReload(prev => !prev);
                toast.success('Course deleted!');
            } else {
                toast.error('Server error');
            }
        })
        .catch(() => {
            toast.error('Something went wrong!');
        });
    }

    useEffect(() => {
        async function getOfferedList() {
            axios.post('http://localhost:5000/api/getCourseList', { email: user.email }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            .then(res => {
                if (res.status === 200) {
                    setOffered(res.data.offered);
                } else {
                    toast.error('Server error');
                }
            })
            .catch(() => {
                toast.error('Something went wrong!');
            });
        };
        getOfferedList();
    }, [reload]);

    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            <Toaster />
            <div className="bg-white shadow-lg mx-auto p-6 rounded-lg max-w-5xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-2xl text-gray-700">Offered Courses</h2>
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white" 
                        onClick={() => setShowPopup(true)}>
                        Add Course
                    </button>
                </div>

                <ul className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {offered.map((item, index) => (
                        <li key={index} className="bg-white shadow-md rounded-lg transform transition duration-300 overflow-hidden hover:scale-105">
                            <div className="relative cursor-pointer" onClick={() => handleOffered(item.courseId)}>
                                <img src={`/images/${item.category}.jpg`} alt="Course" className="w-full h-40 object-cover" loading="lazy" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg">{item.courseName}</h3>
                                    <p className="text-gray-500 text-sm">By {item.courseTutor}</p>
                                    <p className="flex items-center text-yellow-500">
                                        {item.rating} <MdOutlineStar className="ml-1" />
                                    </p>
                                </div>
                            </div>
                            <button className="top-2 right-2 absolute bg-red-500 hover:bg-red-600 p-2 rounded-full text-white transition"
                                onClick={(e) => { e.stopPropagation(); handleDelete(item.courseId); }}>
                                <MdOutlineDeleteSweep size={20} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-lg p-6 rounded-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-xl">Add a New Course</h2>
                            <AiFillCloseCircle className="text-2xl text-gray-500 cursor-pointer" onClick={() => setShowPopup(false)} />
                        </div>
                        <input type="text" placeholder="Course Name" className="mb-2 p-2 border rounded w-full" 
                            value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} required />
                        <input type="text" placeholder="Course Description" className="mb-2 p-2 border rounded w-full" 
                            value={newCourseDesc} onChange={(e) => setNewCourseDesc(e.target.value)} required />
                        <select id="course" className="mb-4 p-2 border rounded w-full" value={newCourseCat} 
                            onChange={(e) => setNewCourseCat(e.target.value)} required>
                            <option value="">--Select a Category--</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Programming">Programming</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science</option>
                            <option value="Sports">Sports</option>
                            <option value="Music">Music</option>
                            <option value="Art">Art</option>
                            <option value="Business">Business</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Photography">Photography</option>
                        </select>
                        <button className="bg-blue-600 hover:bg-blue-700 p-2 rounded w-full text-white transition" 
                            onClick={addOffered}>
                            Add Course
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Tutor;
