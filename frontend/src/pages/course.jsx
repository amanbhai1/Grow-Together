import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Discussion from '../components/discussion';
import Play from '../components/play.jsx';
import { IoCheckmark } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import StarRatings from 'react-star-ratings';
import Timestamp from '../components/timestamp'; 
import toast, { Toaster } from 'react-hot-toast';

const Course = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showPlay, setShowPlay] = useState(false);
  const [videoDetails, setVideoDetails] = useState([]);
  const [courseDetails, setCourseDetails] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [slotPopup, setSlotPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [reload, setReload] = useState(false);
  const [slots, setSlots] = useState('');
  const user = useSelector((state) => state.user.user);

  function playVideo(item) {
    setVideoDetails(item)
    setShowPlay(true)
  }

  function goBack() {
    navigate(-1);
  }

  function handleEnroll() {
    axios.post('http://localhost:5000/api/enroll', {email:user.email, courseId},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    .then(res=>{
        if(res.status===200) 
        {
            toast.success('Successfully enrolled!'),
            setIsEnrolled(!isEnrolled)
        }
        else
        {
            toast.error("Server error")
        }
    })
    .catch(err=>{
        toast.error("Something went wrong!")
    })
  }

  useEffect(() => {
    async function getRating() {
      axios.post('http://localhost:5000/api/getRating', {userId:user.id, courseId:courseId},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
      .then(res=>{
          if(res.status===200) 
          {
              setRating(res.data.rating)
          }
          else
          {
              toast.error("Server error")
          }
      })
      .catch(err=>{
          toast.error("Something went wrong!")
    })
    };
    getRating();
  }, [reload]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  function rateCourse() {
    axios.post('http://localhost:5000/api/rate', {userId:user.id, courseId:courseId, rating:rating},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    .then(res=>{
        if(res.status===200) 
        {
            setShowPopup(!showPopup)
            setReload(prev => !prev);
            toast.success('Successfully rated!')
        }
        else
        {
            toast.error('Server error')
        }
    })
    .catch(err=>{
        toast.error('Somwthing went wrong!')
    })
  }

  function bookSlot() {
    axios.post('http://localhost:5000/api/bookSlot', {userId:user.id, courseId:courseId, slots:slots},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    .then(res=>{
        if(res.status===200) 
        {
            setSlotPopup(!slotPopup)
            setSlots('')
            toast.success('Request sent!')
        }
        else
        {
            toast.error('Server error')
        }
    })
    .catch(err=>{
        toast.error('Something went wrong!')
    })
  }

  function handleUnenroll() {
    axios.post('http://localhost:5000/api/unEnroll', {email:user.email, courseId},
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    .then(res=>{
        if(res.status===200) 
        {
            toast.success('Successfully unenrolled!')
            setIsEnrolled(!isEnrolled)
        }
        else
        {
            toast.error('Server error')
        }
    })
    .catch(err=>{
        toast.error('Something went wrong!')
    })
  }

  useEffect(() => {
    async function checkEnrollment() {
      axios.post('http://localhost:5000/api/isEnrolled', {email:user.email, courseId:courseId},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
      .then(res=>{
          if(res.status===200) 
          {
              setIsEnrolled(res.data.isEnrolled)
          }
          else
          {
              toast.error('Server error')
          }
      })
      .catch(err=>{
          toast.error('Something went wrong!')
  })
  };
  checkEnrollment();
  }, [isEnrolled]);

  useEffect(() => {
    async function getVideoList() {
        axios.post('http://localhost:5000/api/getVideoList', {courseId:courseId},
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          })
        .then(res=>{
            if(res.status===200) 
            {
                setVideos(res.data.videos)
            }
            else
            {
                toast.error('Server error')
            }
        })
        .catch(err=>{
            toast.error('Something went wrong!')
    })
    };
    getVideoList();
  }, []);

  useEffect(() => {
    async function getCourseDetails() {
        axios.post('http://localhost:5000/api/getCourseDetails', {courseId:courseId},{
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        })
        .then(res=>{
            if(res.status===200) 
            {
              setCourseDetails(res.data.course)
            }
            else
            {
                toast.error('Server error')
            }
        })
        .catch(err=>{
            toast.error('Something went wrong!')
    })
    };
    getCourseDetails();
  }, []);


  return (
    <div className="mx-auto px-4 py-8 container">
      <div><Toaster/></div>
      <div className="flex justify-between items-center mb-8">
        <div className="font-semibold text-2xl">{courseDetails.courseName} Videos</div>
        <div className="flex space-x-4">
          {isEnrolled ? (
              <button className="flex items-center space-x-2 bg-green-500 px-4 py-2 rounded-full text-white" onClick={() => handleUnenroll()}>
                <IoCheckmark className="text-lg" />
                <span>Enrolled</span>
              </button>
            ) : (
              <button className="bg-blue-500 px-4 py-2 rounded-full text-white" onClick={() => handleEnroll()}>Enroll</button>
            )}
          <button className="bg-yellow-500 px-4 py-2 rounded-full text-white" onClick={() => setShowPopup(!showPopup)}>Rate</button>
          <button className="bg-purple-500 px-4 py-2 rounded-full text-white" onClick={() => setSlotPopup(!slotPopup)}>Appointment</button>
        </div>
      </div>

      <div className="mb-8">
        <button className="bg-gray-700 px-4 py-2 rounded-full text-white" onClick={goBack}>Go Back 🡭</button>
      </div>

      <div className="flex space-x-8">
        <div className="flex-1">
          <ul className="space-y-4">
            {videos.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-4 rounded-md cursor-pointer" onClick={() => playVideo(item)}>
                  <div>
                    <p className="font-semibold text-lg">{item.videoName}</p>
                    <Timestamp timestamp={item.createdAt} />
                  </div>
                  <div className="text-sm">{item.videoSequence}</div>
                </li>
            ))}
          </ul>
          {showPlay && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-3xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-2xl">{videoDetails.videoName} now playing...</h2>
                  <AiFillCloseCircle className="text-2xl cursor-pointer" onClick={() => setShowPlay(!showPlay)} />
                </div>
                <Play videoDetails={videoDetails}/>
              </div>
            </div>
          )}
        </div>

        <div className="w-1/3">
          <Discussion courseId={courseId} course={courseDetails} senderId={user.id}/>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-2xl">Rate this course</h2>
              <AiFillCloseCircle className="text-2xl cursor-pointer" onClick={() => setShowPopup(!showPopup)} />
            </div>
            <StarRatings
              rating={rating}
              starRatedColor="gold" 
              changeRating={handleRatingChange} 
              numberOfStars={5} 
              name="rating"
            />
            <button className="bg-blue-500 mt-4 px-4 py-2 rounded-full text-white" onClick={() => rateCourse()}>Submit</button>
          </div>
        </div>
      )}

      {slotPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-2xl">Enter your preferred slots</h2>
              <AiFillCloseCircle className="text-2xl cursor-pointer" onClick={() => setSlotPopup(!slotPopup)} />
            </div>
            <input 
              className="mb-4 p-2 border rounded-md w-full"
              type="text"
              placeholder="List your preferred date and time"
              value={slots}
              onChange={(e) => setSlots(e.target.value)}
            />
            <button className="bg-purple-500 px-4 py-2 rounded-full text-white" onClick={() => bookSlot()}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
