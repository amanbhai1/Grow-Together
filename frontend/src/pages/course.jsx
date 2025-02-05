import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Discussion from '../components/discussion';
import Play from '../components/play.jsx';
import { IoCheckmark } from 'react-icons/io5';
import { AiFillCloseCircle } from 'react-icons/ai';
import StarRatings from 'react-star-ratings';
import Timestamp from '../components/timestamp';
import toast, { Toaster } from 'react-hot-toast';

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [videoDetails, setVideoDetails] = useState({});
  const [courseDetails, setCourseDetails] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [slotPopup, setSlotPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [reload, setReload] = useState(false);
  const [slots, setSlots] = useState('');
  const user = useSelector((state) => state.user.user);

  const playVideo = (item) => {
    setVideoDetails(item);
    setShowPlay(true);
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleEnroll = () => {
    axios
      .post(
        'http://localhost:5000/api/enroll',
        { email: user.email, courseId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success('Successfully enrolled!');
          setIsEnrolled(!isEnrolled);
        } else {
          toast.error('Server error');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      });
  };

  const handleUnenroll = () => {
    axios
      .post(
        'http://localhost:5000/api/unEnroll',
        { email: user.email, courseId },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success('Successfully unenrolled!');
          setIsEnrolled(!isEnrolled);
        } else {
          toast.error('Server error');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const rateCourse = () => {
    axios
      .post(
        'http://localhost:5000/api/rate',
        { userId: user.id, courseId, rating },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setShowPopup(false);
          setReload((prev) => !prev);
          toast.success('Successfully rated!');
        } else {
          toast.error('Server error');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      });
  };

  const bookSlot = () => {
    axios
      .post(
        'http://localhost:5000/api/bookSlot',
        { userId: user.id, courseId, slots },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setSlotPopup(false);
          setSlots('');
          toast.success('Request sent!');
        } else {
          toast.error('Server error');
        }
      })
      .catch((err) => {
        toast.error('Something went wrong!');
      });
  };

  useEffect(() => {
    const getRating = () => {
      axios
        .post(
          'http://localhost:5000/api/getRating',
          { userId: user.id, courseId },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setRating(res.data.rating);
          } else {
            toast.error('Server error');
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!');
        });
    };
    getRating();
  }, [reload, courseId, user.id, user.token]);

  useEffect(() => {
    const checkEnrollment = () => {
      axios
        .post(
          'http://localhost:5000/api/isEnrolled',
          { email: user.email, courseId },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setIsEnrolled(res.data.isEnrolled);
          } else {
            toast.error('Server error');
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!');
        });
    };
    checkEnrollment();
  }, [isEnrolled, courseId, user.email, user.token]);

  useEffect(() => {
    const getVideoList = () => {
      axios
        .post(
          'http://localhost:5000/api/getVideoList',
          { courseId },
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
  }, [courseId, user.token]);

  useEffect(() => {
    const getCourseDetails = () => {
      axios
        .post(
          'http://localhost:5000/api/getCourseDetails',
          { courseId },
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{courseDetails.courseName} Videos</h1>
        <div className="flex space-x-4">
          {isEnrolled ? (
            <button
              onClick={handleUnenroll}
              className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-full text-white hover:bg-green-600 transition-all"
            >
              <IoCheckmark className="text-lg" />
              <span>Enrolled</span>
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              className="bg-blue-500 px-4 py-2 rounded-full text-white hover:bg-blue-600 transition-all"
            >
              Enroll
            </button>
          )}
          <button
            onClick={() => setShowPopup(true)}
            className="bg-yellow-500 px-4 py-2 rounded-full text-white hover:bg-yellow-600 transition-all"
          >
            Rate
          </button>
          <button
            onClick={() => setSlotPopup(true)}
            className="bg-purple-500 px-4 py-2 rounded-full text-white hover:bg-purple-600 transition-all"
          >
            Appointment
          </button>
        </div>
      </div>

      {/* Go Back Button */}
      <div className="mb-8">
        <button
          onClick={goBack}
          className="bg-gray-700 px-4 py-2 rounded-full text-white hover:bg-gray-800 transition-all"
        >
          Go Back 🡭
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Video List */}
        <div className="flex-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Videos</h2>
          <ul className="space-y-4">
            {videos.map((item, index) => (
              <li
                key={index}
                onClick={() => playVideo(item)}
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-all"
              >
                <div>
                  <p className="font-semibold text-lg">{item.videoName}</p>
                  <Timestamp timestamp={item.createdAt} />
                </div>
                <div className="text-sm text-gray-500">#{item.videoSequence}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* Discussion Section */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-md p-6">
          <Discussion courseId={courseId} course={courseDetails} senderId={user.id} />
        </div>
      </div>

      {/* Video Popup */}
      {showPlay && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-6 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{videoDetails.videoName} now playing...</h2>
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

      {/* Rate Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-6 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Rate this course</h2>
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <AiFillCloseCircle className="w-8 h-8" />
              </button>
            </div>
            <StarRatings
              rating={rating}
              starRatedColor="gold"
              changeRating={handleRatingChange}
              numberOfStars={5}
              name="rating"
            />
            <button
              onClick={rateCourse}
              className="mt-4 bg-blue-500 px-4 py-2 rounded-full text-white hover:bg-blue-600 transition-all"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Slot Popup */}
      {slotPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-6 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Enter your preferred slots</h2>
              <button
                onClick={() => setSlotPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <AiFillCloseCircle className="w-8 h-8" />
              </button>
            </div>
            <input
              type="text"
              placeholder="List your preferred date and time"
              value={slots}
              onChange={(e) => setSlots(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
            />
            <button
              onClick={bookSlot}
              className="bg-purple-500 px-4 py-2 rounded-full text-white hover:bg-purple-600 transition-all"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;