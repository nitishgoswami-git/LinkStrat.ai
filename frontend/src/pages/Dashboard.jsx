// Dashboard.jsx - COMPLETE FIXED VERSION
import React, { useState, useEffect } from 'react';
import useUserStore from "../store/User.store";
import Sidebar from '../components/Sidebar/Sidebar';

const Dashboard = () => {
  // ✅ FIXED: Destructure loadUser (exact Profile pattern)
  const { user, loading: userLoading, loadUser } = useUserStore();
  
  // Mock campaigns data (replace with Zustand store later)
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'AI Trends 2025',
      topic: 'Latest AI developments and trends',
      frequency: 'daily',
      time: '10:00 AM',
      useTrends: true,
      isActive: true,
      nextPost: 'Dec 26, 2025 10:00 AM',
      totalPosts: 12
    },
    {
      id: 2,
      name: 'SEO Tips',
      topic: 'Search engine optimization strategies',
      frequency: 'weekly',
      time: 'Monday 9:00 AM',
      useTrends: false,
      isActive: false,
      nextPost: 'Paused',
      totalPosts: 8
    }
  ]);
  
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    topic: '',
    frequency: 'daily',
    time: '10:00',
    useTrends: true
  });

  // ✅ FIXED: Correct loadUser call (exact Profile pattern)
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const frequencies = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'custom', label: 'Custom' }
  ];

  const times = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // ✅ Loading state (exact Profile pattern)
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 flex">
      <Sidebar /> {/* ✅ Shows user name via Zustand */}
      
      {/* ✅ FIXED: Removed flex-1 - perfect layout */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Campaigns
              </h1>
              <p className="text-xl text-gray-600">
                {campaigns.length} active schedules • {campaigns.reduce((sum, c) => sum + c.totalPosts, 0)} posts sent
              </p>
            </div>
            <button
              onClick={() => setShowNewCampaign(true)}
              className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-emerald-700 hover:to-green-700 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200"
            >
              + New Campaign
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{campaigns.length}</div>
              <p className="text-sm text-blue-700 font-medium">Active Campaigns</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {campaigns.filter(c => c.isActive).length}
              </div>
              <p className="text-sm text-emerald-700 font-medium">Running</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {campaigns.reduce((sum, c) => sum + c.totalPosts, 0)}
              </div>
              <p className="text-sm text-orange-700 font-medium">Total Posts</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-100 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {campaigns.filter(c => c.nextPost !== 'Paused').length}
              </div>
              <p className="text-sm text-purple-700 font-medium">Next Posts</p>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-200 hover:-translate-y-1">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${campaign.isActive ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
                  <h3 className="font-bold text-xl text-gray-900">{campaign.name}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  campaign.isActive 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {campaign.isActive ? 'Active' : 'Paused'}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  {campaign.topic}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{campaign.frequency} • {campaign.time}</span>
                  {campaign.useTrends && (
                    <span className="flex items-center text-emerald-600 text-xs">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Trends
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Next: <span className="font-semibold text-gray-900">{campaign.nextPost}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-blue-600 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200">
                  Preview
                </button>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all duration-200">
                  Edit
                </button>
                {campaign.isActive ? (
                  <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-xl text-sm font-medium hover:bg-orange-200 transition-all duration-200">
                    Pause
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-medium hover:bg-emerald-200 transition-all duration-200">
                    Resume
                  </button>
                )}
                <button className="px-4 py-2 text-red-500 rounded-xl text-sm font-medium hover:bg-red-50 transition-all duration-200">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* New Campaign Form */}
        {showNewCampaign && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">New Campaign</h2>
              <button
                onClick={() => setShowNewCampaign(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Campaign Name</label>
                <input
                  type="text"
                  placeholder="AI Trends 2025"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Topic</label>
                <input
                  type="text"
                  placeholder="Latest AI developments"
                  value={newCampaign.topic}
                  onChange={(e) => setNewCampaign({...newCampaign, topic: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Frequency</label>
                <select
                  value={newCampaign.frequency}
                  onChange={(e) => setNewCampaign({...newCampaign, frequency: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {frequencies.map(freq => (
                    <option key={freq.value} value={freq.value}>{freq.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                <select
                  value={newCampaign.time}
                  onChange={(e) => setNewCampaign({...newCampaign, time: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {times.map(time => <option key={time}>{time}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-2">
                  <input
                    type="checkbox"
                    checked={newCampaign.useTrends}
                    onChange={(e) => setNewCampaign({...newCampaign, useTrends: e.target.checked})}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>Use Latest Trends</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-gradient-to-r from-emerald-600 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-emerald-700 hover:to-green-700 shadow-xl hover:shadow-2xl transition-all duration-200">
                Generate Preview & Schedule
              </button>
              <button 
                onClick={() => setShowNewCampaign(false)}
                className="px-8 py-4 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
