// Profile.jsx
import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import Sidebar from "../components/Sidebar/Sidebar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid JWT:", error);
      }
    }
    setLoading(false);
  }, []);

  const connectLinkedIn = () => {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
      redirect_uri: "http://localhost:8000/api/v1/auth/linkedin/loginUser",
      scope: "openid email profile",
    });
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No session found</h2>
          <a 
            href="/login" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  return (
   
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 flex">
       <Sidebar/>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl">
              <span className="text-3xl font-bold text-white">
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent mb-2">
              Welcome back, {user.name}!
            </h1>
            <p className="text-xl text-gray-600">{user.email}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-green-900 mb-2">Authenticated</h3>
              <p className="text-green-800">JWT token active</p>
            </div>

            <div className={`border-2 rounded-2xl p-6 text-center ${user.provider === 'linkedin' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${user.provider === 'linkedin' ? 'bg-blue-500' : 'bg-gray-400'}`}>
                <svg className={`w-8 h-8 ${user.provider === 'linkedin' ? 'text-white' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 01-1.548-1.549c0-.847.7-1.549 1.548-1.549a1.548 1.548 0 011.548 1.549c0 .847-.7 1.549-1.548 1.549zm1.336 9.763H3.596v-8.59H6.34v8.59zM16.338 16.338L16.338 16.338z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {user.provider === 'linkedin' ? 'LinkedIn Connected' : 'Connect LinkedIn'}
              </h3>
              {user.provider !== 'linkedin' && (
                <button
                  onClick={connectLinkedIn}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Connect for Posts
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;