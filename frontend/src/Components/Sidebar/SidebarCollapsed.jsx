import React, { useState } from 'react';
import { LogOut, LayoutDashboard, User, FileText, BarChart3, Settings, Expand } from 'lucide-react';
import Sidebar from './Sidebar';

const SidebarCollapsed = ({ user = { name: 'Nitish Goswami', email: 'nitish@linkstart.ai' } }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, color: 'text-indigo-600' },
    { name: 'Profile', href: '/profile', icon: User, color: 'text-blue-600' },
    { name: 'Posts', href: '/posts', icon: FileText, color: 'text-emerald-600' },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, color: 'text-purple-600' },
    { name: 'Settings', href: '/settings', icon: Settings, color: 'text-orange-600' },
  ];

  if (isSidebarOpen) {
    return <Sidebar user={user} onClose={() => setIsSidebarOpen(false)} />;
  }

  return (
    <div className="flex flex-col inset-y-0 left-0 z-50 w-20 bg-white/95 border-r border-gray-200">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white shrink-0 flex items-center justify-center">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-white/30 rounded-lg transition-all"
          title="Expand sidebar"
        >
          <Expand className="m-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <div className="mb-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                title={item.name}
                className="group flex items-center justify-center p-4 rounded-2xl text-gray-700 font-semibold transition-all duration-200 block hover:border-indigo-500 border-b-4 border-transparent"
              >
                <div className={`p-2 rounded-xl bg-white/50 transition-all w-12 h-12 flex items-center justify-center shrink-0 ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </a>
            );
          })}
        </div>
      </nav>

      {/* Footer - Logout */}
      <div className="p-3 pt-0 border-t border-gray-100 bg-gradient-to-r from-rose-50 to-pink-50">
        <button
          onClick={handleLogout}
          title="Logout"
          className="w-full flex items-center justify-center p-4 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:from-rose-600 hover:to-pink-600 transition-all duration-300 border border-rose-200"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SidebarCollapsed;