import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dash() {
    const user = useSelector((state) => state.user.user);
    const [offered, setOffered] = useState([]);
    const [enrolled, setEnrolled] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [newCourseName, setNewCourseName] = useState('');
    const [newCourseDesc, setNewCourseDesc] = useState('');

    const navigate = useNavigate();

    function handleOffered(item) {
        navigate(`/teacher/${item}`);
    }

    function handleEnrolled(item) {
        navigate(`/course/${item}`);
    }

    function addOffered(e) {
        e.preventDefault();
        axios.post('http://localhost:5000/api/addOffered', { courseName: newCourseName, courseDesc: newCourseDesc })
            .then(res => {
                if (res.status === 200) {
                    setNewCourseName('');
                    setNewCourseDesc('');
                    setShowPopup(false);
                } else {
                    alert('Server error');
                }
            })
            .catch(() => {
                alert('Error');
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

    return (
        <div className='bg-gray-100 min-h-screen'>
            <div className='max-w-4xl mx-auto py-10'>
                <div className='bg-white shadow-md rounded-lg p-6 mb-6'>
                    <div className='flex items-center space-x-4'>
                        <div className='bg-gray-300 h-16 w-16 flex items-center justify-center rounded-full text-xl font-bold'>DP</div>
                        <div>
                            <p className='text-lg font-semibold'>Name: {user.name}</p>
                            <p className='text-gray-600'>Age: {user.age}</p>
                            <p className='text-gray-600'>Email: {user.email}</p>
                            <p className='text-gray-600'>Phone: {user.mobile}</p>
                        </div>
                    </div>
                </div>
                
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='bg-white shadow-md rounded-lg p-6'>
                        <div className='flex justify-between items-center mb-4'>
                            <h2 className='text-xl font-bold'>Offered Courses</h2>
                            <button className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600' onClick={() => setShowPopup(true)}>+</button>
                        </div>
                        <ul>
                            {offered.map((item, index) => (
                                <li key={index} className='p-2 cursor-pointer hover:bg-gray-200 rounded' onClick={() => handleOffered(item.courseId)}>
                                    {item.courseName}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <div className='bg-white shadow-md rounded-lg p-6'>
                        <h2 className='text-xl font-bold mb-4'>Enrolled Courses</h2>
                        <ul>
                            {enrolled.map((item, index) => (
                                <li key={index} className='p-2 cursor-pointer hover:bg-gray-200 rounded' onClick={() => handleEnrolled(item.courseId)}>
                                    {item.courseName}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            
            {showPopup && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-lg shadow-md w-80'>
                        <h2 className='text-xl font-bold mb-4'>Add a New Course</h2>
                        <input type='text' placeholder='Course Name' value={newCourseName} onChange={(e) => setNewCourseName(e.target.value)} className='w-full p-2 border border-gray-300 rounded-lg mb-3' required />
                        <input type='text' placeholder='Course Description' value={newCourseDesc} onChange={(e) => setNewCourseDesc(e.target.value)} className='w-full p-2 border border-gray-300 rounded-lg mb-3' required />
                        <div className='flex justify-between'>
                            <button onClick={addOffered} className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'>Add</button>
                            <button onClick={() => setShowPopup(false)} className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600'>X</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dash;
