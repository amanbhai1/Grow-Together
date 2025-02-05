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
  const [role, setRole] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin role

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
          startResendTimer();
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
    const role = isAdmin ? 'admin' : 'user'; // Determine the role dynamically
  
    axios
      .post('http://localhost:5000/api/signup', { name, email, password, roll, role })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {  // Check for any success status (200-299)
          toast.success('User registered successfully!');
          
          // Reset input fields
          setName('');
          setEmail('');
          setPassword('');
          setRPassword('');
          setRoll(''); // Ensure 'roll' exists in your state or remove it if unnecessary
  
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

  function handleResendOtp() {
    setIsResendDisabled(true);
    axios
      .post('http://localhost:5000/api/generateOTP', { email })
      .then((res) => {
        if (res.status === 200) {
          toast.success('OTP resent to email!');
          startResendTimer();
        } else {
          toast.error('Failed to resend OTP. Please try again.');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Something went wrong!');
      });
  }

  function startResendTimer() {
    let timer = 30;
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          setIsResendDisabled(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="isAdmin" className="text-gray-700">
                  Sign up as Admin
                </label>
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
              <p className="text-center text-gray-600">
                OTP sent to <span className="font-semibold">{email}</span>
              </p>
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
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResendDisabled}
                  className={`text-sm text-teal-600 hover:underline ${
                    isResendDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Resend OTP {isResendDisabled && `(${resendTimer}s)`}
                </button>
              </div>
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