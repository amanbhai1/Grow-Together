import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Timestamp from '../components/timestamp';
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [roll, setRoll] = useState('');
    const [mobile, setMobile] = useState('');
    const [language, setLanguage] = useState('');
    const [created, setCreated] = useState('');
    const [updated, setUpdated] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRpassword] = useState('');
    const [enr, setEnr] = useState([]);
    const [off, setOff] = useState([]);
    const enrCount = enr.length;
    const offCount = off.length;
    const user = useSelector((state) => state.user.user);


    function handleChange() {
        axios.post('http://localhost:5000/api/updateProfile', {
            userId: user.id,
            fname,
            lname,
            email,
            roll,
            mobile,
            language,
            password,
            rpassword
        }, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                toast.success('Profile updated');
                setPassword('');
                setRpassword('');
            } else if (res.status === 201) {
                toast.error('Wrong password');
                setPassword('');
                setRpassword('');
            }
        })
        .catch(() => {
            toast.error('Something went wrong!');
        });
    }

    useEffect(() => {
        async function getProfile() {
            axios.post('http://localhost:5000/api/getProfile', { userId: user.id }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            .then(res => {
                if (res.status === 200) {
                    setFname(res.data.profile.fname);
                    setLname(res.data.profile.lname);
                    setEmail(res.data.profile.email);
                    setRoll(res.data.profile.roll);
                    setMobile(res.data.profile.mobile);
                    setLanguage(res.data.profile.language);
                    setCreated(res.data.profile.createdAt);
                    setUpdated(res.data.profile.updatedAt);
                    setEnr(res.data.profile.enrolledCourses);
                    setOff(res.data.profile.teachingCourses);
                } else {
                    toast.error('Server error');
                }
            })
            .catch(() => {
                toast.error('Something went wrong!');
            });
        }
        getProfile();
    }, []);

    return (
        <div className="flex justify-center items-center my-10">
            <Toaster />
            <div className="relative flex flex-col bg-white shadow-lg p-6 rounded-lg w-full max-w-4xl">
            <div className="right-10 left absolute flex flex-col mt-1 text-gray-500">
                        <p>Created: <Timestamp timestamp={created} /></p>
                        <p>Updated: <Timestamp timestamp={updated} /></p>
                    </div>
                <div className="relative flex items-center gap-6 w-1/2">
                {/* <div className='right-0 absolute bg-[#0D9488] rounded-full w-[20px] h-[20px] editBtn'/> */}
                    <img className="border-2 border-gray-300 rounded-full w-24 h-24" src="./resources/dp.jpg" alt="Profile" />
                    <h2 className="mt-2 font-semibold text-3xl">{fname} {lname}</h2>
                </div>
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-6">
                    <div className="space-y-3">
                        <label className="block font-medium text-sm">First Name</label>
                        <input className="p-2 border rounded w-full" type="text" value={fname} onChange={(e) => setFname(e.target.value)} />
                        
                        <label className="block font-medium text-sm">Last Name</label>
                        <input className="p-2 border rounded w-full" type="text" value={lname} onChange={(e) => setLname(e.target.value)} />
                        
                        <label className="block font-medium text-sm">Email</label>
                        <input className="p-2 border rounded w-full" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-3">
                        <label className="block font-medium text-sm">Roll Number</label>
                        <input className="p-2 border rounded w-full" type="text" value={roll} onChange={(e) => setRoll(e.target.value)} />

                        <label className="block font-medium text-sm">Mobile</label>
                        <input className="p-2 border rounded w-full" type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />

                        <label className="block font-medium text-sm">Language</label>
                        <input className="p-2 border rounded w-full" type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
                    </div>
                </div>
                
                <div className="flex md:flex-row flex-col gap-4 mt-6">
                    <div className="w-full">
                        <label className="block font-medium text-sm">Old Password</label>
                        <input className="p-2 border rounded w-full" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
                    </div>
                    <div className="w-full">
                        <label className="block font-medium text-sm">New Password</label>
                        <input className="p-2 border rounded w-full" type="password" value={rpassword} onChange={(e) => setRpassword(e.target.value)} autoComplete="new-password" />
                    </div>
                </div>
                <div className='flex justify-end items-center w-full'>
                <button onClick={handleChange} className="justify-font-semibold bg-[#0D9488] hover:bg-[#1f837b] hover:shadow-xl mt-6 px-4 py-2 rounded-3xl w-1/4 text-white transition-all hover:translate-x-1 hover:-translate-y-1 delay-100">Update Profile</button>
                </div>
            </div>
        </div>
    );
}

export default Profile;
