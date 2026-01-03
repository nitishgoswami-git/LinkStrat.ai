import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import SidebarCollapsed from '../Components/Sidebar/SidebarCollapsed';
import MainLayout from '../Layouts/MainLayout';

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  const user = {
    name: 'Nitish Goswami',
    email: 'nitish@linkstart.ai',
    provider: 'LinkedIn'
  };

  return (
    <MainLayout
      component1={
        isCollapsed ? (
          <SidebarCollapsed 
            user={user} 
            isCollapsed={isCollapsed}
            isHovered={isHovered}
            onToggle={() => setIsCollapsed(false)} // ✅ Expand to full sidebar
            onHover={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          />
        ) : (
          <Sidebar 
            user={user}
            isOpen={true}
            onClose={() => setIsCollapsed(true)} // ✅ Collapse back
          />
        )
      }
      component2={
        <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-8 overflow-auto">
          {/* Hero Header */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8 mb-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-5xl pb-1.5 font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight">
                  Your Campaigns
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 font-semibold">Manage your automated LinkedIn posts</p>
              </div>
              <button className="px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-base sm:text-lg font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 border border-emerald-200 whitespace-nowrap">
                + New Campaign
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-2xl sm:text-3xl font-black text-gray-900">4</p>
                  <p className="text-gray-600 font-semibold text-sm sm:text-base truncate">Active Campaigns</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm">●</span>
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-2xl sm:text-3xl font-black text-gray-900">3</p>
                  <p className="text-gray-600 font-semibold text-sm sm:text-base truncate">Running</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-xl sm:text-2xl text-white font-bold">📊</span>
                </div>
                <div className="min-w-0">
                  <p className="text-2xl sm:text-3xl font-black text-gray-900">127</p>
                  <p className="text-gray-600 font-semibold text-sm sm:text-base truncate">Posts Sent</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <span className="text-2xl sm:text-3xl text-white font-bold">↑</span>
                </div>
                <div className="min-w-0">
                  <p className="text-2xl sm:text-3xl font-black text-gray-900">Today</p>
                  <p className="text-gray-600 font-semibold text-sm sm:text-base truncate">Next Post</p>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {/* Campaign Card 1 */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-white/50 hover:shadow-2xl transition-all hover:-translate-y-3 group">
              <div className="flex items-start justify-between mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></div>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 group-hover:text-indigo-600 truncate pr-2">AI Trends 2025</h3>
                </div>
                <span className="px-3 py-1 sm:px-4 sm:py-2 bg-emerald-100 text-emerald-800 text-xs sm:text-sm font-bold rounded-2xl whitespace-nowrap flex-shrink-0">Active</span>
              </div>
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base line-clamp-2">"Latest AI developments, LLM agents, and automation trends"</p>
                <div className="flex items-center justify-between text-base sm:text-lg font-semibold text-sm sm:text-base">
                  <span className="truncate">Daily • 10AM</span>
                  <span className="text-emerald-600 flex items-center gap-1 text-xs sm:text-sm">📈 Trends</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-3 sm:px-4 py-2 rounded-xl">
                  Next: <span className="font-bold text-gray-900">2 hours</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 px-4 sm:py-3 sm:px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base">Preview</button>
                <button className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-all flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Empty State Card */}
            <div className="lg:col-span-1 xl:col-span-2 bg-white/60 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-12 border-2 border-dashed border-gray-200 text-center hover:border-indigo-300 transition-all group col-span-full lg:col-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all">
                <span className="text-2xl sm:text-3xl">✨</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-gray-700 mb-3">Ready to automate?</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto text-sm sm:text-base">Create your first campaign to start generating and posting AI-powered LinkedIn content automatically.</p>
              <button className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-base sm:text-lg font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all">
                Create First Campaign
              </button>
            </div>
          </div>
        </main>
      }
    />
  );
};

export default Dashboard;