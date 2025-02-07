import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Timestamp from '../components/timestamp';

const Notification = () => {
  const user = useSelector((state) => state.user.user);
  const [noti, setNoti] = useState([]);

  const approve = (item) => {
    axios
      .post(
        'http://localhost:5000/api/approve',
        { senderId: item.receiverId, receiverId: item.senderId, context: item.content },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success('Approved');
        } else if (res.status === 201) {
          toast.error('Error');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong!');
      });
  };

  useEffect(() => {
    const getNotification = async () => {
      axios
        .post(
          'http://localhost:5000/api/getNotification',
          { userId: user.id },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setNoti(res.data.notifications);
          } else {
            setNoti([]);
          }
        })
        .catch((err) => {
          toast.error('Something went wrong!');
        });
    };
    getNotification();
  }, [user.id, user.token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div>
        <Toaster />
      </div>
      {/* <Navbar page={'notification'} /> */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h2>
            <div className="space-y-4">
              {noti.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                >
                  <div className="flex-1">
                    <p className="text-gray-700">{item.content}</p>
                    <Timestamp timestamp={item.createdAt} />
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      approve(item);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    Approve
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Welcome to The Code Sneaker's</h2>
            <p className="text-gray-700 mb-4">
              Thank you for being a part of The Code Sneaker's! We are excited to have you on this journey of
              skill-sharing and peer learning. Whether you're teaching, learning, or both, we believe that everyone has
              something valuable to offer. With our features like video tutorials, discussion forums, AI-powered Gemini
              bot, and one-on-one session bookings, we're here to support you every step of the way. Keep exploring, keep
              growing, and remember—you have the power to both teach and learn with The Code Sneaker's.
            </p>
            <br />
            <p className="text-gray-700">Happy learning,</p>
            <p className="text-gray-700 font-bold">The Code Sneaker's Team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;