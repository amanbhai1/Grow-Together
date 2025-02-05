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
  const [videoDetails, setVideoDetails] = useState({});
  const [courseDetails, setCourseDetails] = useState({});
  const [videoName, setVideoName] = useState('');
  const [videoSequence, setVideoSequence] = useState(1);
  const user = useSelector((state) => state.user.user);

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setVideoName(e.target.value);
  };

  const handleSequenceChange = (e) => {
    setVideoSequence(e.target.value);
  };

  const goBack = () => {
    navigate(-1);
  };

  const playVideo = (item) => {
    setVideoDetails(item);
    setShowPlay(true);
  };

  const addVideo = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('courseId', courseId);
    formData.append('videoName', videoName);
    formData.append('videoSequence', videoSequence);

    axios
      .post('http://localhost:5000/api/addVideo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setReload((prev) => !prev);
          setVideoFile(null);
          setVideoName('');
          setVideoSequence('');
          setShowPopup(false);
          toast.success('Video added successfully!');
        } else {
          toast.error('Server error');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      });
  };

  const deleteVideo = (item) => {
    axios
      .post(
        'http://localhost:5000/api/deleteVideo',
        { videoId: item },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setReload((prev) => !prev);
          toast.success('Video deleted!');
        } else {
          toast.error('Server error');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      });
  };

  useEffect(() => {
    const getVideoList = () => {
      axios
        .post(
          'http://localhost:5000/api/getVideoList',
          { courseId: courseId },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setVideos(res.data.videos);
          } else {
            toast.error('Server error');
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!');
        });
    };
    getVideoList();
  }, [reload, courseId, user.token]);

  useEffect(() => {
    const getCourseDetails = () => {
      axios
        .post(
          'http://localhost:5000/api/getCourseDetails',
          { courseId: courseId },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setCourseDetails(res.data.course);
          } else {
            toast.error('Server error');
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!');
        });
    };
    getCourseDetails();
  }, [courseId, user.token]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{courseDetails.courseName}</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowPopup(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all"
          >
            Add Video
          </button>
          <button
            onClick={goBack}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all"
          >
            Go Back 🡭
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Video List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Videos</h2>
          <ul className="space-y-4">
            {videos.map((item, index) => (
              <li
                key={index}
                onClick={() => playVideo(item)}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Thumb</span>
                  </div>
                  <div>
                    <p className="text-lg font-medium">{item.videoName}</p>
                    <Timestamp timestamp={item.createdAt} />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-gray-500">#{item.videoSequence}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteVideo(item.videoId);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <MdOutlineDeleteOutline className="w-6 h-6" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Discussion Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Discussion courseId={courseId} course={courseDetails} senderId={user.id} />
        </div>
      </div>

      {/* Video Popup */}
      {showPlay && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{videoDetails.videoName}</h2>
              <button
                onClick={() => setShowPlay(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <AiFillCloseCircle className="w-8 h-8" />
              </button>
            </div>
            <Play videoDetails={videoDetails} />
          </div>
        </div>
      )}

      {/* Add Video Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-6">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Add a New Video</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <AiFillCloseCircle className="w-8 h-8" />
              </button>
            </div>
            <form onSubmit={addVideo} className="space-y-4">
              <input
                type="text"
                placeholder="Video Name"
                value={videoName}
                onChange={handleNameChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <input
                type="number"
                placeholder="Sequence Number"
                value={videoSequence}
                onChange={handleSequenceChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;