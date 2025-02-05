import React, { useEffect, useState } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Play = (item) => {
  const user = useSelector((state) => state.user.user);
  const [video, setVideo] = useState(item.videoDetails);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/playVideo', { filename: video.videoId }, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        if (response.data.videoUrl) {
          setVideoUrl(response.data.videoUrl);
        } else {
          toast.error('Failed to fetch video');
        }
      } catch (error) {
        toast.error('Error fetching video');
      }
    };

    fetchVideo();
  }, [video.videoId, user.token]);

  useEffect(() => {
    if (videoUrl) {
      const player = videojs('my-video', {
        controls: true,
        autoplay: true,
        preload: 'auto'
      });

      player.src({
        src: videoUrl,
        type: 'video/mp4' // Update the type to 'video/mp4'
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [videoUrl]);

  return (
    <div className='play'>
      <div><Toaster /></div>
      <div className='play-box'>
        {videoUrl ? (
          <video id="my-video" className="video-js vjs-default-skin" width="600" controls>
            <source src={videoUrl} type="video/mp4" /> {/* Update the type to 'video/mp4' */}
            Your browser does not support the video tag.
          </video>
        ) : (
          <p>Loading video...</p>
        )}
      </div>
    </div>
  );
};

export default Play;