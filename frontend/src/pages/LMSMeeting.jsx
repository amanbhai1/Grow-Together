import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Excalidraw } from '@excalidraw/excalidraw';

const LMSMeeting = () => {
  // State for Live Chat
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Screen Share state
  const [stream, setStream] = useState(null);
  const videoRef = useRef();

  // Fetch messages from MongoDB backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  // Send message to MongoDB backend
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      try {
        await axios.post('http://localhost:5000/api/messages', {
          user: 'User Name', // Replace with logged-in user
          message: newMessage,
        });
        setNewMessage('');
        const response = await axios.get('http://localhost:5000/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // Screen Sharing Functionality
  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      setStream(screenStream);
      videoRef.current.srcObject = screenStream;
    } catch (err) {
      console.error('Error sharing screen: ', err);
    }
  };

  const stopScreenShare = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="space-y-8 mx-auto p-4 max-w-5xl">
      {/* Live Chat Section */}
      <div className="bg-white shadow-md p-4 rounded-md">
        <h2 className="mb-4 font-semibold text-xl">Live Chat</h2>
        <div className="bg-gray-100 mb-4 p-2 border rounded-md h-64 overflow-auto">
          {messages.map((msg, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span className="font-semibold">{msg.user}</span>: <span>{msg.message}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="p-2 border rounded-l-md w-full"
          />
          <button type="submit" className="bg-blue-500 px-4 rounded-r-md text-white">Send</button>
        </form>
      </div>

      {/* Whiteboard Section */}
      <div className="bg-white shadow-md p-4 rounded-md">
        <h2 className="mb-4 font-semibold text-xl">Whiteboard</h2>
        <div className="bg-gray-100 shadow-md p-4 rounded-md w-full h-[500px]">
          <Excalidraw />
        </div>
      </div>

      {/* Screen Sharing Section */}
      <div className="bg-white shadow-md p-4 rounded-md">
        <h2 className="mb-4 font-semibold text-xl">Screen Sharing</h2>
        <video ref={videoRef} autoPlay muted className="mb-4 border rounded-md w-full h-64" />
        <div className="flex space-x-4">
          {!stream ? (
            <button onClick={startScreenShare} className="bg-green-500 px-4 py-2 rounded-md text-white">Start Screen Share</button>
          ) : (
            <button onClick={stopScreenShare} className="bg-red-500 px-4 py-2 rounded-md text-white">Stop Screen Share</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LMSMeeting;
