import React, { useState, useEffect } from 'react'
import '../style/disc.css'
import axios from 'axios';
import Timestamp from './timestamp';
import { useSelector } from 'react-redux';
import { IoIosSend } from "react-icons/io";
import ClipLoader from 'react-spinners/ClipLoader';
import toast, { Toaster } from 'react-hot-toast';

const Discussion = (item) => {
    const [message, setMessage] = useState('');
    const [direct, setDirect] = useState('');
    const [chats, setChats] = useState([]);
    const [reload, setReload] = useState(false);
    const [toggle, setToggle] = useState(true);
    const [loader, setLoader] = useState(false);
    const [ai, setAi] = useState([{sender:'Bot', message:"Hello there! 👋 I'm your personal assistant powered by Google Gemini. How can I assist you today? "}]);
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        async function getMessages() {
            axios.post('http://localhost:5000/api/getMessages', {courseId: item.courseId, userId: user.id} , {
                headers: {
                  Authorization: `Bearer ${user.token}`
                }
            })
            .then(res => {
                if(res.status === 200) {
                    setChats(res.data.chats.reverse());
                } else {
                    toast.error('Server error');
                }
            })
            .catch(err => {
                toast.error('Something went wrong!');
            });
        };
        getMessages();
    }, [reload]);

    function handleSend() {
        axios.post('http://localhost:5000/api/sendMessage', {courseId: item.courseId, senderId:item.senderId, message:message}, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            if(res.status === 200) {
                setReload(prev => !prev);
                setMessage('');
                toast.success('Comment added!');
            } else {
                toast.error('Server error');
            }
        })
        .catch(err => {
            toast.error('Something went wrong!');
        });
    };

    function handleAi() {
        const updatedAi = [{ sender: 'You', message: direct }, ...ai];
        setAi(updatedAi);
        setDirect('');
        axios.post('http://localhost:5000/api/sendAi', { courseId : item.courseId, message: direct }, {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            if(res.status === 200) {
                setReload(prev => !prev);
                setAi(prevAi => [{ sender: 'Bot', message: res.data.message }, ...prevAi]); 
                setLoader(false);
            } else {
                toast.error('Server error');
            }
        })
        .catch(err => {
            toast.error('Something went wrong!');
        });
    };

    const toggleComponent = () => {
        setToggle(prev => !prev); 
    };

    return (
        <div className="bg-gray-100 shadow-lg mx-auto p-6 rounded-lg max-w-4xl">
            <div><Toaster /></div>
            <button className="bg-blue-500 hover:bg-blue-600 shadow-md mb-4 px-6 py-2 rounded-lg font-semibold text-lg text-white focus:outline-none" onClick={toggleComponent}>
                {toggle ? 'Ask AI' : 'Switch to Discussion'}
            </button>

            {toggle ? (
                <div className="space-y-4 bg-white shadow-md p-4 rounded-lg">
                    <div className="h-80 overflow-y-auto">
                        <ul className="space-y-4">
                            {chats.map((chat, index) => (
                                <li className="flex flex-col space-y-2" key={index}>
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-blue-600">{chat.senderName}</p>
                                        <Timestamp timestamp={chat.createdAt} />
                                    </div>
                                    <p className="text-gray-700">{chat.message}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex space-x-2">
                        <textarea
                            className="flex-grow border-gray-300 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Write a message..."
                        />
                        <button 
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white focus:outline-none"
                            onClick={handleSend}
                        >
                            <IoIosSend className="text-2xl" />
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4 bg-white shadow-md p-4 rounded-lg">
                    <div className="h-80 overflow-y-auto">
                        <ul className="space-y-4">
                            {ai.map((item, index) => (
                                <li className="flex flex-col space-y-2" key={index}>
                                    <div className="flex justify-start items-center">
                                        <p className="font-semibold text-green-600">{item.sender}</p>
                                    </div>
                                    <p className="text-gray-700">{item.message}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex space-x-2 item">
                        <textarea
                            className="flex-grow border-gray-300 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            value={direct}
                            onChange={(e) => setDirect(e.target.value)}
                            placeholder="Ask AI a question..."
                        />
                        <button 
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white focus:outline-none"
                            onClick={() => { handleAi(); setLoader(true); }}
                        >
                            {loader ? (
                                <ClipLoader color="#ffffff" loading={loader} size={20} />
                            ) : (
                                <IoIosSend className="text-2xl" />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Discussion;
