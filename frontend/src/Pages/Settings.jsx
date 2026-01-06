import React, { useState, useEffect } from "react";
import SidebarCollapsed from "../Components/Sidebar/SidebarCollapsed";
import MainLayout from "../Layouts/MainLayout";
import { settingsApi } from "../api/Settings";
import { toast, Bounce } from "react-toastify";
import useUserStore from "../Stores/User.Store";

const Settings = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [groqKeyInput, setGroqKeyInput] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user, setGroqKey } = useUserStore();
  const hasGroqKey = !!user?.groqKey;

  // Sync initial state with user store
  useEffect(() => {
    setIsConnected(hasGroqKey);
  }, [hasGroqKey]);

  const handleSaveGroqKey = async () => {
    if (!groqKeyInput.trim()) return;

    try {
      setIsSaving(true);
      const result = await settingsApi.updateGroqKey(groqKeyInput.trim());
      
      // Update store with the actual key (not boolean)
      setGroqKey(groqKeyInput.trim());
      
      setIsConnected(true);
      setIsEditing(false);
      setGroqKeyInput(""); // Clear input after success
      
      toast.success("API key saved successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err) {
      console.error("Error saving Groq key:", err);
      
      const errorMessage = 
        err.response?.data?.message || 
        err.message || 
        "Failed to save Groq key. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditKey = () => {
    setIsEditing(true);
    setIsConnected(false);
    setGroqKeyInput(""); // Clear input for editing
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setIsConnected(hasGroqKey);
    setGroqKeyInput("");
  };

  return (
    <MainLayout
      component1={
        <SidebarCollapsed
          user={user}
          isHovered={isHovered}
          onHover={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        />
      }
      component2={
        <main className="flex-1 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 sm:p-6 overflow-auto">
          <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8">
              {/* Groq API Key Section */}
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/50">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl ring-2 sm:ring-4 ring-white/30 flex-shrink-0">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2 truncate">
                      Groq API Key
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 font-semibold truncate">
                      Lightning-fast AI inference for campaigns
                    </p>
                  </div>
                </div>

                {isConnected && !isEditing ? (
                  <div className="border-4 border-emerald-200/80 rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-500/20 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-2xl ring-4 ring-emerald-200/50">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-600 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-3xl sm:text-4xl font-black text-emerald-800 mb-3 sm:mb-4">
                      Connected
                    </h3>
                    <p className="text-xl sm:text-2xl text-emerald-700 font-bold mb-6 sm:mb-8">
                      Securely encrypted in Vault
                    </p>
                    <div className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-2xl font-semibold text-emerald-700 bg-emerald-100/80 backdrop-blur-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      End-to-end encrypted
                    </div>
                    <button
                      onClick={handleEditKey}
                      className="mt-6 sm:mt-8 px-8 sm:px-10 py-3 bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-base sm:text-lg rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                    >
                      Edit Key
                    </button>
                  </div>
                ) : (
                  <div className="space-y-5 sm:space-y-6">
                    <div>
                      <label className="block text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4">
                        Enter your Groq API Key
                      </label>
                      <div className="relative">
                        <input
                          type="password"
                          value={groqKeyInput}
                          onChange={(e) => setGroqKeyInput(e.target.value)}
                          placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                          className="w-full px-4 sm:px-6 py-4 sm:py-6 text-lg sm:text-xl border-2 border-gray-200 rounded-2xl sm:rounded-3xl focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 transition-all duration-300 shadow-xl bg-white/60 placeholder-gray-500 font-mono tracking-wide pr-32 disabled:opacity-50"
                          disabled={isSaving}
                        />
                        <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-xs sm:text-sm text-gray-500 bg-gray-100/80 px-3 sm:px-3 py-1 sm:py-1.5 rounded-xl font-mono whitespace-nowrap">
                          Hidden
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 mt-3 flex items-center gap-2 flex-wrap">
                        <span className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-600 text-base sm:text-lg font-bold">G</span>
                        </span>
                        Get key at{" "}
                        <a
                          href="https://console.groq.com/keys"
                          className="text-orange-600 font-semibold hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          console.groq.com/keys
                        </a>
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveGroqKey}
                        disabled={!groqKeyInput.trim() || isSaving}
                        className="flex-1 h-16 sm:h-20 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 text-white text-lg sm:text-xl font-black rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 border border-orange-300"
                      >
                        {isSaving ? (
                          <>
                            <svg className="animate-spin w-7 h-7 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" pathLength="1" className="opacity-25" />
                              <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" fill="currentColor" className="opacity-75" />
                            </svg>
                            Saving...
                          </>
                        ) : (
                          "🔒 Save Securely to Vault"
                        )}
                      </button>
                      {isConnected && (
                        <button
                          onClick={handleCancelEdit}
                          disabled={isSaving}
                          className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-2xl shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center h-16 sm:h-20"
                        >
                          Cancel
                        </button>
                      )}
                    </div>

                    <div className="pt-6 sm:pt-8 border-t-2 border-dashed border-orange-200/80 text-center">
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-800 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-3xl font-bold shadow-xl border border-orange-200/50 backdrop-blur-sm">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        End-To-End Encrypted with Vault
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      }
    />
  );
};

export default Settings;
