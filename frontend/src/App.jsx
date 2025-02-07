// Main App Component
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from './redux/store';
import Contactus from "./pages/Contactus.jsx";
import Slider from './components/slider.jsx';
import Aboutus from "./pages/Aboutus.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import Layout from "./components/layouts/Layout";
import AuthLayout from "./components/layouts/AuthLayout";
import CreateMeeting from "./pages/createmeeting.jsx";
import Home from "./pages/Home.jsx";
import Password from "./pages/forgotPassword.jsx";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";
import Profile from "./pages/profile.jsx";
import Learner from "./pages/learner.jsx";
import Tutor from "./pages/tutor.jsx";
import Course from "./pages/course.jsx";
import Manage from "./pages/manage.jsx";
import Notification from "./pages/notification.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Search from "./pages/search.jsx";
import MentorCategory from "./pages/mentors/MentorCategory.jsx";
import Meeting from "./pages/Meeting.jsx";
import Room from "./pages/Room.jsx";
import AiFeedback from "./pages/AiFeedback.jsx";
import MentorDashboard from "./pages/MentorDashboard.jsx";
import GiveFeedback from "./pages/Feedback.jsx"
import Whiteboard from "./pages/Whiteboard.jsx";
import StdDash from "./pages/StdDash.jsx";


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            {/* Main Layout */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/manage/:courseId" element={<Manage />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/course/:courseId" element={<Course />} />
              <Route path="/learner" element={<ProtectedRoute element={Learner} />} />
              <Route path="/tutor" element={<ProtectedRoute element={Tutor} />} />
              <Route path="/mentor/dashboard" element={<MentorDashboard />} />
              <Route path="/mentor-category" element={<MentorCategory />} />
              <Route path="/contactus" element={<Contactus />} />
              <Route path="/ai-feedback" element={<AiFeedback />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/whiteboard" element={<Whiteboard/>} />
              <Route path="/create-meeting" element={<CreateMeeting />} />
              <Route path="/meeting" element={<Meeting />} />
              <Route path="/feedback" element={<GiveFeedback />} />
              <Route path="/room/:roomid" element={<Room/>}/>
              <Route path="/stdash" element={<StdDash/>}/>
              <Route path="/slider" element={<Slider/>}/>
              <Route path="/mentor/createMeeting" element={<CreateMeeting/>}/>
            </Route>

            {/* Auth Layout */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<Password />} />
            </Route>
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
