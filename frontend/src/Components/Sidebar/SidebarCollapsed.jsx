import React, { useState } from "react";
import {
  LogOut,
  LayoutDashboard,
  User,
  FileText,
  BarChart3,
  Settings,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import useUserStore from "../../Stores/User.Store";

const SidebarCollapsed = ({ isHovered = false, onHover, onHoverEnd }) => {
  // ✅ Zustand destructuring INSIDE component (reactive)
  const { user, logout } = useUserStore();
  const { name = "", email = "",avatar="" } = user || {};
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  // ✅ Single logout call (store handles API + state)
  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();

      // Clear OAuth state only
      sessionStorage.removeItem("oauth_state");

      toast.success("Logged out successfully!", {
        position: "top-right",
        autoClose: 2000,
      });

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoggingOut(false);
    }
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

  // Dynamic width
  const widthClass = isHovered ? "w-72" : "w-20";

  return (
    <div
      className={`flex flex-col inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-xl border-r border-gray-200 shadow-2xl transition-all duration-500 ease-in-out ${widthClass}`}
      onMouseEnter={onHover}
      onMouseLeave={onHoverEnd}
    >
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white shrink-0 p-4 flex items-center justify-between">
        <div
          className={`flex items-center gap-3 ${
            isHovered ? "w-full justify-between" : "justify-center w-full"
          }`}
        >
          <div className="w-12 h-12 overflow-hidden bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-2 ring-white/30 flex-shrink-0">
            <span className="text-2xl font-black drop-shadow-lg">
              {<img src={avatar} alt="" srcset="" /> ||
                name?.charAt(0)?.toUpperCase() ||
                "U"}
            </span>
          </div>

          {/* Profile text */}
          {isHovered && (
            <div className="min-w-0 flex-1 hidden lg:block">
              <h3 className="text-sm font-bold truncate">{name || "User"}</h3>
              <p className="text-indigo-100 text-xs opacity-90 truncate">
                {email || "user@example.com"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              to={item.to}
              title={item.name}
              className={`group flex items-center gap-3 p-3 rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-gray-900 font-semibold transition-all duration-200 hover:shadow-md hover:scale-[1.02] border border-transparent hover:border-indigo-300 block w-full ${
                isHovered ? "justify-start" : "justify-center"
              }`}
            >
              <div
                className={`p-2.5 rounded-xl bg-white/60 backdrop-blur-sm shadow-sm transition-all w-12 h-12 flex items-center justify-center shrink-0 group-hover:shadow-md ${item.color}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {isHovered && (
                <span className="flex-1 min-w-0 text-sm font-medium truncate hidden lg:block">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer - Logout */}
      <div className="p-4 pt-0 border-t border-gray-100 bg-gradient-to-r from-rose-50 to-pink-50">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title="Sign Out"
          className="w-full flex items-center justify-center lg:justify-start gap-3 p-3.5 bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] hover:from-rose-600 hover:to-pink-600 transition-all duration-300 border border-rose-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut className="w-4.5 h-4.5 flex-shrink-0" />
          {isHovered && (
            <span className="hidden lg:block whitespace-nowrap text-sm">
              {loggingOut ? "Signing out..." : "Sign Out"}
            </span>
          )}
        </button>
        <p className="text-xs text-gray-500 text-center mt-2 opacity-75">
          v1.0.0
        </p>
      </div>
    </div>
  );
};

export default SidebarCollapsed;
