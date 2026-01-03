import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import SidebarCollapsed from '../Components/Sidebar/SidebarCollapsed';
import MainLayout from '../Layouts/MainLayout';

const Posts = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mock user for UI
  const user = { name: 'Nitish Goswami', email: 'nitish@linkstart.ai' };

  // Mock posts data (pure UI)
  const [posts] = useState([
    {
      id: 1, campaign: 'AI Trends 2025', title: 'Groq 10x faster inference!', 
      content: 'Groq\'s LPU architecture revolutionizing AI...', status: 'posted',
      postedAt: 'Dec 25, 10:00 AM', linkedinUrl: '#', impressions: 247, likes: 23, comments: 8, shares: 2
    },
    {
      id: 2, campaign: 'AI Trends 2025', title: 'LangGraph 2.0 Agents', 
      content: 'Stateful agents now production-ready...', status: 'posted',
      postedAt: 'Dec 24, 10:00 AM', linkedinUrl: '#', impressions: 189, likes: 15, comments: 5, shares: 1
    },
    {
      id: 3, campaign: 'SEO Tips', title: 'SEO Tips', 
      content: 'Google algorithm prioritizes E-E-A-T...', status: 'failed',
      postedAt: 'Dec 23, 9:00 AM', error: 'API rate limit'
    },
    {
      id: 4, campaign: 'SEO Tips', title: 'Core Web Vitals 2025', 
      content: 'Google performance metrics stricter...', status: 'queued',
      queuedAt: 'Dec 26, 9:00 AM'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post => {
    if (filter !== 'all' && post.status !== filter) return false;
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => ({
    posted: 'bg-emerald-100 text-emerald-800', queued: 'bg-blue-100 text-blue-800', 
    failed: 'bg-red-100 text-red-800'
  }[status] || 'bg-gray-100 text-gray-600');

  return (
    <MainLayout
      component1={
        isCollapsed ? (
          <SidebarCollapsed 
            user={user} 
            isCollapsed={isCollapsed}
            isHovered={isHovered}
            onToggle={() => setIsCollapsed(false)}
            onHover={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          />
        ) : (
          <Sidebar 
            user={user}
            isOpen={true}
            onClose={() => setIsCollapsed(true)}
          />
        )
      }
      component2={
        <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
            
            {/* Hero Header */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/50">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl sm:text-4xl pb-1 font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent leading-tight truncate">
                    Posts History
                  </h1>
                  <p className="text-lg sm:text-2xl text-gray-600 font-semibold mt-2 sm:mt-3 flex flex-wrap items-center gap-2">
                    {posts.length} total • 
                    <span className="font-black text-emerald-600">
                      {posts.filter(p => p.status === 'posted').length} published
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                  <div className="relative group w-72 sm:w-96 flex-shrink-0">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-6 py-3.5 sm:py-4 text-base sm:text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 shadow-xl bg-white/60 transition-all duration-300 placeholder-gray-500 font-medium"
                    />
                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-blue-500 transition-colors pointer-events-none" 
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['all', 'posted', 'queued', 'failed'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-6 sm:px-8 py-3 sm:py-4 rounded-2xl text-base sm:text-lg font-bold transition-all duration-300 shadow-lg flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                      filter === status
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/50 hover:shadow-blue-500/75 transform scale-105'
                        : 'bg-white/60 text-gray-700 border-2 border-gray-200 hover:bg-white hover:shadow-xl hover:border-blue-300 hover:-translate-y-1'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                    <span className="text-sm opacity-90">({posts.filter(p => p.status === status).length})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { label: 'Published', value: posts.filter(p => p.status === 'posted').length, color: 'emerald' },
                { label: 'Queued', value: posts.filter(p => p.status === 'queued').length, color: 'blue' },
                { label: 'Failed', value: posts.filter(p => p.status === 'failed').length, color: 'red' },
                { label: 'Impressions', value: posts.reduce((sum, p) => sum + (p.impressions || 0), 0), color: 'purple' }
              ].map((stat, i) => (
                <div key={i} className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border-4 border-${stat.color}-200/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-300 group`}>
                  <div className={`text-3xl sm:text-4xl font-black text-${stat.color}-600 mb-2 group-hover:scale-110 transition-transform`}>
                    {stat.value}
                  </div>
                  <p className={`text-sm sm:text-base font-bold text-${stat.color}-800 uppercase tracking-wide`}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Posts Table */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      {['Campaign', 'Title', 'Status', 'Posted', 'Engagement', 'Actions'].map((header, i) => (
                        <th key={i} className={`px-4 sm:px-6 sm:py-4 lg:py-6 text-left font-black text-gray-700 uppercase tracking-widest text-xs sm:text-sm ${i < 2 ? '' : 'hidden lg:table-cell'}`}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 group">
                        <td className="px-4 sm:px-6 sm:py-4 lg:py-6 font-bold text-base sm:text-lg text-gray-900 truncate max-w-[150px]">
                          {post.campaign}
                        </td>
                        <td className="px-4 sm:px-6 sm:py-4 lg:py-6 max-w-xs">
                          <div className="font-black text-lg sm:text-xl text-gray-900 mb-1 leading-tight truncate">
                            {post.title}
                          </div>
                          <p className="text-gray-600 font-medium text-sm sm:text-base line-clamp-2">
                            {post.content}
                          </p>
                        </td>
                        <td className="px-4 sm:px-6 sm:py-4 lg:py-6 hidden lg:table-cell">
                          <span className={`px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-bold text-sm shadow-lg ${getStatusColor(post.status)}`}>
                            {post.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 sm:py-4 lg:py-6 text-base sm:text-lg text-gray-900 hidden lg:table-cell font-mono truncate">
                          {post.postedAt || post.queuedAt || '—'}
                        </td>
                        <td className="px-4 sm:px-6 sm:py-4 lg:py-6 hidden lg:table-cell">
                          <div className="flex items-center gap-4 sm:gap-6 text-base sm:text-lg font-bold text-gray-700">
                            <span>👁️ {post.impressions || 0}</span>
                            <span>❤️ {post.likes || 0}</span>
                            <span>💬 {post.comments || 0}</span>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 sm:py-4 lg:py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {post.linkedinUrl ? (
                              <a href={post.linkedinUrl} target="_blank" rel="noopener noreferrer" 
                                 className="inline-flex items-center bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm sm:text-base whitespace-nowrap">
                                View Post
                              </a>
                            ) : (
                              <span className="px-4 py-2.5 text-gray-400 font-bold text-sm">—</span>
                            )}
                            <button className="p-2 sm:p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-2xl transition-all group-hover:scale-110 flex-shrink-0">
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16 sm:py-24 px-4 sm:px-8">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl">
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 sm:mb-4">
                    No posts match your filter
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto leading-relaxed">
                    Try adjusting your search or filter to see post history
                  </p>
                  <button className="px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg sm:text-xl font-black rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300">
                    🚀 Create First Campaign
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      }
    />
  );
};

export default Posts;
