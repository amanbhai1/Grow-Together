import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions.js';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  function goBack() {
    navigate('/');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const loginEndpoint = 'http://localhost:5000/api/login';

      const response = await axios.post(loginEndpoint, { email, password });

      if (response.status === 200) {
        const { user, token } = response.data;

        // Dispatch login action with user data
        dispatch(
          login({
            name: user.fname,
            id: user.userId,
            email: user.email,
            token: token,
            isAdmin: user.role === 'admin', // Set isAdmin based on role
          })
        );

        setEmail('');
        setPassword('');

        // Navigate based on role
        if (user.role === 'admin') {
          navigate('/mentor/dashboard');
        } else {
          navigate('/dash');
        }

        toast.success('Login successful!');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Invalid credentials');
      } else {
        toast.error('Something went wrong!');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg">
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

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8 bg-gray-100 rounded-r-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl text-gray-700 font-semibold text-center mb-6">Login to your account</h2>

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

            <div className="text-right text-sm">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-teal-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className={`w-full bg-teal-300 hover:bg-teal-100 py-2 rounded-lg shadow-lg transition transform hover:scale-95 ${
                loading && 'opacity-50 cursor-not-allowed'
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="flex items-center justify-center space-x-2 my-4">
            <div className="w-1/4 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">or login with</span>
            <div className="w-1/3 h-px bg-gray-300"></div>
          </div>

          <button className="w-full flex items-center justify-center space-x-2 py-2 border border-gray-300 text-gray-700 rounded-lg shadow-lg hover:bg-gray-200 transition">
            <FcGoogle size={20} />
            <span>Google</span>
          </button>

          <div className="text-center mt-6 text-sm">
            <span className="text-gray-500">Don't have an account? </span>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="text-teal-600 hover:underline"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;