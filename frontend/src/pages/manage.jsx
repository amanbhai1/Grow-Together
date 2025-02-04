import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Discussion from '../components/discussion';
import Play from '../components/play.jsx';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { AiFillCloseCircle } from 'react-icons/ai';
import Timestamp from '../components/timestamp';
import toast, { Toaster } from 'react-hot-toast';

const Manage = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [videos, setVideos] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [reload, setReload] = useState(false);
    const [showPlay, setShowPlay] = useState(false);
    const [videoDetails, setVideoDetails] = useState([]);
    const [courseDetails, setCourseDetails] = useState([]);
    const [videoName, setVideoName] = useState('');
    const [videoSequence, setVideoSequence] = useState(1);
    const user = useSelector((state) => state.user.user);

    const handleVideoChange = (e) => setVideoFile(e.target.files[0]);
    const handleNameChange = (e) => setVideoName(e.target.value);
    const handleSequenceChange = (e) => setVideoSequence(e.target.value);
    const goBack = () => navigate(-1);
    const playVideo = (item) => {
        setVideoDetails(item);
        setShowPlay(true);
    };

    const addVideo = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('courseId', courseId);
        formData.append('videoName', videoName);
        formData.append('videoSequence', videoSequence);

        try {
            const res = await axios.post('http://localhost:5000/api/addVideo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`
                }
            });
            if (res.status === 200) {
                setReload(prev => !prev);
                setShowPopup(false);
                toast.success('Video added successfully!');
            }
        } catch {
            toast.error('Something went wrong!');
        }
    };

    const deleteVideo = async (videoId) => {
        try {
            const res = await axios.post('http://localhost:5000/api/deleteVideo', { videoId }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (res.status === 200) {
                setReload(prev => !prev);
                toast.success('Video deleted!');
            }
        } catch {
            toast.error('Something went wrong!');
        }
    };

    useEffect(() => {
        axios.post('http://localhost:5000/api/getVideoList', { courseId }, {
            headers: { Authorization: `Bearer ${user.token}` }
        }).then(res => {
            if (res.status === 200) setVideos(res.data.videos);
        }).catch(() => toast.error('Something went wrong!'));
    }, [reload]);

    useEffect(() => {
        axios.post('http://localhost:5000/api/getCourseDetails', { courseId }, {
            headers: { Authorization: `Bearer ${user.token}` }
        }).then(res => {
            if (res.status === 200) setCourseDetails(res.data.course);
        }).catch(() => toast.error('Something went wrong!'));
    }, []);

    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            <Toaster />
            <div className="bg-white shadow-lg mx-auto p-6 rounded-lg max-w-5xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-2xl text-gray-700">{courseDetails.courseName}</h2>
                    <div className="flex gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white" onClick={() => setShowPopup(true)}>Add Video</button>
                        <button className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white" onClick={goBack}>Go Back</button>
                    </div>
                </div>

                <ul className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {videos.map((item, index) => (
                        <li key={index} className="relative bg-white shadow-md rounded-lg transform transition duration-300 overflow-hidden hover:scale-105">
                            <div className="p-4" onClick={() => playVideo(item)}>
                                <h3 className="font-semibold text-lg">{item.videoName}</h3>
                                <Timestamp timestamp={item.createdAt} />
                                <p className="text-gray-500 text-sm">Sequence: {item.videoSequence}</p>
                            </div>
                            <button className="top-2 right-2 absolute bg-red-500 hover:bg-red-600 p-2 rounded-full text-white transition" onClick={(e) => { e.stopPropagation(); deleteVideo(item.videoId); }}>
                                <MdOutlineDeleteOutline size={20} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {showPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-lg p-6 rounded-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-xl">Add a New Video</h2>
                            <AiFillCloseCircle className="text-2xl text-gray-500 cursor-pointer" onClick={() => setShowPopup(false)} />
                        </div>
                        <form onSubmit={addVideo} className="space-y-4">
                            <input type="text" placeholder="Video Name" className="p-2 border rounded w-full" value={videoName} onChange={handleNameChange} required />
                            <input type="number" placeholder="Sequence Number" className="p-2 border rounded w-full" value={videoSequence} onChange={handleSequenceChange} required />
                            <input type="file" accept="video/*" className="p-2 border rounded w-full" onChange={handleVideoChange} required />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 p-2 rounded w-full text-white">Upload</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Manage;
