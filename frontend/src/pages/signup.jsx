import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [roll, setRoll] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  function goBack() {
    navigate('/');
  }

  function handleSignup(e) {
    e.preventDefault();
    if (password !== rpassword) {
      toast.error('Passwords do not match!');
      return;
    }

    axios
      .post('http://localhost:5000/api/generateOTP', { email })
      .then((res) => {
        if (res.status === 200) {
          toast.success('OTP sent to email!');
          setIsOtpSent(true);
        } else {
          toast.error('Failed to send OTP. Please check your email.');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong!');
      });
  }

  function handleVerifyOtp(e) {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/verifyOTP', { email, otp })
      .then((res) => {
        if (res.status === 200) {
          toast.success('OTP verified successfully!');
          setIsOtpVerified(true);
          handleRegister();
        } else {
          toast.error('Invalid OTP. Please try again.');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong!');
      });
  }

  function handleRegister() {
    axios
      .post('http://localhost:5000/api/signup', { name, email, password, roll })
      .then((res) => {
        if (res.status === 200) {
          toast.success('User registered successfully!');
          setName('');
          setEmail('');
          setPassword('');
          setRPassword('');
          setRoll('');
          navigate('/login'); // Redirect to login after successful signup
        } else {
          toast.error('Failed to register. Please check your details.');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong!');
      });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="flex w-full max-w-7xl bg-white rounded-lg shadow-lg">
        {/* Left Panel */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-b from-teal-300 to-teal-400 rounded-l-lg text-white text-center p-8">
          <div>
            <span className="text-4xl font-bold text-teal-600">
              Grow<span className="text-red-300">Together</span>
            </span>
            <p className="text-lg text-black mb-8">Learn. Connect. Thrive.</p>
            <button
              onClick={goBack}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-full shadow-lg transition transform hover:scale-95"
            >
              Go Back 🡭
            </button>
          </div>
        </div>

        {/* Signup Form */}
        <div className="w-full md:w-1/2 p-8 bg-gray-100 rounded-r-lg">
          {!isOtpSent ? (
            <form onSubmit={handleSignup} className="space-y-6">
              <h2 className="text-2xl text-gray-700 font-semibold text-center mb-6">Create your account</h2>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Enter your roll number"
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={rpassword}
                  onChange={(e) => setRPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-300 hover:bg-teal-100 py-2 rounded-lg shadow-lg transition transform hover:scale-95"
              >
                Register
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <h2 className="text-2xl text-gray-700 font-semibold text-center mb-6">Verify OTP</h2>
              <div>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-teal-300 hover:bg-teal-100 py-2 rounded-lg shadow-lg transition transform hover:scale-95"
              >
                Verify OTP
              </button>
            </form>
          )}

          <div className="text-center mt-6 text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-teal-600 hover:underline"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;