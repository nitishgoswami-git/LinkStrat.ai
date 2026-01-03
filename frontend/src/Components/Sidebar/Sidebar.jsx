import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  LogOut,
  LayoutDashboard,
  User,
  FileText,
  BarChart3,
  Settings,
  ArrowLeftFromLine,
} from "lucide-react";

const Sidebar = ({
  user = { name: "Nitish Goswami", email: "nitish@linkstart.ai" },
  isOpen = false,
  onClose,
}) => {
  const [localOpen, setLocalOpen] = useState(false); // ✅ Internal mobile state

  // ✅ Sync with parent prop changes
  useEffect(() => {
    setLocalOpen(isOpen);
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleClose = () => {
    setLocalOpen(false);
    onClose?.();
  };

  const handleToggle = () => {
    setLocalOpen((prev) => !prev);
    onClose?.(); // Notify parent if needed
  };

  const menuItems = [
    {
      name: "Dashboard",
      to: "/dashboard",
      icon: LayoutDashboard,
      color: "text-indigo-600",
    },
    { name: "Profile", to: "/profile", icon: User, color: "text-blue-600" },
    { name: "Posts", to: "/posts", icon: FileText, color: "text-emerald-600" },
    {
      name: "Analytics",
      to: "/analytics",
      icon: BarChart3,
      color: "text-purple-600",
    },
    {
      name: "Settings",
      to: "/settings",
      icon: Settings,
      color: "text-orange-600",
    },
  ];

  return (
    <>
      {/* Mobile Hamburger - ONLY mobile */}
      <button
        onClick={handleToggle}
        className="fixed top-6 left-6 z-999 p-3 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 hover:bg-white hover:shadow-3xl transition-all duration-300 hover:scale-105 lg:hidden"
        aria-label="Toggle menu"
      >
        <svg
          className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${
            localOpen ? "rotate-90" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay - ONLY mobile */}
      {localOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar - Persistent on desktop */}
      <div
        className={`flex flex-col fixed inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-r border-gray-200 transform transition-all duration-300 lg:relative lg:translate-x-0 ${
          localOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Profile Header */}
        <div className="flex p-3 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white shrink-0 relative">
         

          <div className="flex items-center gap-2 m-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center ring-2 ring-white/30">
              <span className="text-3xl font-black drop-shadow-2xl">
                {user?.name?.charAt(0)?.toUpperCase() || "N"}
              </span>
            </div>
            <div className="min-w-0 flex-1 hidden lg:block">
              {" "}
              {/*  Hide profile text on mobile */}
              <h2 className="text-lg font-black truncate">{user.name}</h2>
              <p className="text-indigo-100 text-sm opacity-90 truncate">
                {user.email}
              </p>
            </div>
          </div>
           <button
            onClick={handleToggle}
            className=" bg-black/10 p-2 backdrop-blur-xl rounded-2xl  hover:bg-black/30  transition-all duration-300  "
            aria-label="Toggle menu"
          >
            <ArrowLeftFromLine />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 overflow-y-auto">
          <div className="mb-8">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2 mb-4 lg:block hidden">
              Navigation
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className="group flex items-center gap-4 p-4 rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-gray-900 font-semibold transition-all duration-200 mb-3 block hover:shadow-md hover:-translate-x-1 border-l-4 border-transparent hover:border-indigo-500"
                  onClick={handleClose}
                >
                  <div
                    className={`p-2 rounded-xl bg-white/50 group-hover:bg-indigo-100 shadow-sm transition-all w-12 h-12 flex items-center justify-center shrink-0 ${item.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="flex-1 min-w-0 truncate lg:group-hover:translate-x-0">
                    {item.name}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 ml-auto transition-all transform group-hover:translate-x-1 hidden lg:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      strokeMiterlimit={10}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer - Logout */}
        <div className="p-6 pt-0 border-t border-gray-100 bg-gradient-to-r from-rose-50 to-pink-50 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center lg:justify-start gap-3 p-4 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:from-rose-600 hover:to-pink-600 transition-all duration-300 border border-rose-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:block whitespace-nowrap">Sign Out</span>
          </button>
          <p className="text-xs text-gray-500 text-center mt-3 lg:block hidden">
            v1.0.0
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
