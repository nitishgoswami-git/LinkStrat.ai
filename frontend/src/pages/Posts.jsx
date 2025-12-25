// Posts.jsx - Complete Posts History Page
import React, { useState, useEffect } from 'react';
import useUserStore from "../store/User.store";
import Sidebar from '../components/Sidebar/Sidebar';

const Posts = () => {
  // ✅ Zustand user store (exact Profile/Dashboard pattern)
  const { user, loading: userLoading, loadUser } = useUserStore();
  
  // Mock posts data (replace with API later)
  const [posts, setPosts] = useState([
    {
      id: 1,
      campaign: 'AI Trends 2025',
      title: 'Groq just announced 10x faster inference!',
      content: 'Groq\'s new LPU architecture is revolutionizing AI inference speeds. Here are 3 key takeaways...',
      status: 'posted',
      postedAt: 'Dec 25, 2025 10:00 AM',
      linkedinUrl: 'https://linkedin.com/posts/abc123',
      impressions: 247,
      likes: 23,
      comments: 8,
      shares: 2
    },
    {
      id: 2,
      campaign: 'AI Trends 2025',
      title: 'LangChain Agents in 2025: What\'s New?',
      content: 'LangGraph 2.0 brings stateful agents to production. Multi-agent workflows are here...',
      status: 'posted',
      postedAt: 'Dec 24, 2025 10:00 AM',
      linkedinUrl: 'https://linkedin.com/posts/def456',
      impressions: 189,
      likes: 15,
      comments: 5,
      shares: 1
    },
    {
      id: 3,
      campaign: 'SEO Tips',
      title: 'SEO Tips',
      content: 'Google\'s latest algorithm update prioritizes E-E-A-T. Here\'s how to adapt...',
      status: 'failed',
      postedAt: 'Dec 23, 2025 9:00 AM',
      error: 'LinkedIn API rate limit exceeded',
      linkedinUrl: null,
      impressions: 0,
      likes: 0,
      comments: 0,
      shares: 0
    },
    {
      id: 4,
      campaign: 'SEO Tips',
      title: 'Core Web Vitals: The 2025 Checklist',
      content: 'Google\'s performance metrics just got stricter. Optimize or get left behind...',
      status: 'queued',
      queuedAt: 'Dec 26, 2025 9:00 AM',
      linkedinUrl: null,
      impressions: 0,
      likes: 0,
      comments: 0,
      shares: 0
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Load user on mount (exact pattern)
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  const filteredPosts = posts.filter(post => {
    if (filter !== 'all' && post.status !== filter) return false;
    if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'posted': return 'bg-emerald-100 text-emerald-800';
      case 'queued': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 flex">
      <Sidebar />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Posts History
              </h1>
              <p className="text-xl text-gray-600">
                {posts.length} total posts • {posts.filter(p => p.status === 'posted').length} published
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 w-80 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-8">
            {['all', 'posted', 'queued', 'failed'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  filter === status
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                {filter === status && (
                  <span className="ml-1">({posts.filter(p => p.status === status).length})</span>
                )}
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-2xl p-6">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {posts.filter(p => p.status === 'posted').length}
              </div>
              <p className="text-sm text-emerald-700 font-medium">Published</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {posts.filter(p => p.status === 'queued').length}
              </div>
              <p className="text-sm text-blue-700 font-medium">Queued</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-6">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {posts.filter(p => p.status === 'failed').length}
              </div>
              <p className="text-sm text-orange-700 font-medium">Failed</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-2xl p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {posts.reduce((sum, p) => sum + p.impressions, 0)}
              </div>
              <p className="text-sm text-purple-700 font-medium">Total Impressions</p>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Campaign</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Posted</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Engagement</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{post.campaign}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-gray-900">{post.title}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{post.content}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(post.status)}`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                      {post.postedAt || post.queuedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell text-sm text-gray-900">
                      <div className="flex items-center space-x-4 text-xs">
                        <span>👁️ {post.impressions}</span>
                        <span>❤️ {post.likes}</span>
                        <span>💬 {post.comments}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {post.linkedinUrl ? (
                        <a 
                          href={post.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 font-semibold"
                        >
                          View
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                      <button className="text-gray-600 hover:text-gray-900 ml-2">Retry</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your filters or create a new campaign</p>
              <button className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-emerald-700 hover:to-green-700 shadow-lg">
                + New Campaign
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;
