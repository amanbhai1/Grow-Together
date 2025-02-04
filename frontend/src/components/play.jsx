import React, { useEffect, useState, useRef } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';

const Play = ({ videoDetails }) => {
  const user = useSelector((state) => state.user.user);
  const [video, setVideo] = useState(videoDetails);
  const [videoUrl, setVideoUrl] = useState('');
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!video.videoId) return;
      try {
        const response = await axios.post(
          'http://localhost:5000/api/playVideo',
          { filename: video.videoId },
          {
            headers: { Authorization: `Bearer ${user?.token}` },
          }
        );
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
  }, [video.videoId, user?.token]);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      if (!playerRef.current) {
        playerRef.current = videojs(videoRef.current, {
          controls: true,
          autoplay: true,
          preload: 'auto',
        });
      }

      playerRef.current.src({ src: videoUrl, type: 'video/mp4' });

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [videoUrl]);

  return (
    <div className='play'>
      <Toaster />
      <div className='play-box'>
        {videoUrl ? (
          <video ref={videoRef} id="my-video" className="video-js vjs-default-skin" width="600" controls>
            <source src={videoUrl} type="video/mp4" />
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
