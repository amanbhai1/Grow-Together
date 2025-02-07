import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const AiFeedback = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user?.user);

  useEffect(() => {
    if (!user?.email) {
      setError("User not found. Please log in.");
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/getUserDetails",
          { email: user.email },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        if (response.status === 200) {
          setUserDetails(response.data);
        } else {
          throw new Error("Failed to fetch user details.");
        }
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Could not load user details. Please try again later.");
      }
    };

    fetchUserDetails();
  }, [user]);

  const fetchFeedback = async () => {
    if (!userDetails?.email) {
      setError("Email not found. Unable to fetch AI feedback.");
      return;
    }

    setLoading(true);
    setError(null);
    setFeedback("");

    try {
      const response = await axios.get(
        `http://localhost:5000/ai/ask-ai/${userDetails.email}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      if (response.status === 200) {
        setFeedback(
          response.data.feedback.replace(/\*\*(.*?)\*\*/g, '<span class="bg-yellow-200 px-1 rounded-md">$1</span>') || "No feedback received."
        );
      } else {
        throw new Error("Failed to fetch AI feedback.");
      }
    } catch (err) {
      console.error("Error fetching AI feedback:", err);
      setError("Could not retrieve AI feedback. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">AI Mentor Feedback</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {userDetails && (
          <div className="p-4 bg-gray-50 rounded-lg shadow-md mb-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">User Details</h2>
            <p><strong>Name:</strong> {userDetails.fname} {userDetails.lname}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Enrolled Courses:</strong> {userDetails.enrolledCourses?.join(", ") || "None"}</p>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            onClick={fetchFeedback}
            className={`px-8 py-3 rounded-lg shadow-md transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Analyzing...
              </div>
            ) : (
              "Ask AI"
            )}
          </button>
        </div>

        {feedback && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">AI Feedback</h2>
            <p
              className="whitespace-pre-line text-gray-800"
              dangerouslySetInnerHTML={{ __html: feedback }}
            ></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiFeedback;
