import React, { useState, useEffect } from "react";
import useUserStore from "../store/User.store";
import Sidebar from "../components/Sidebar/Sidebar";

const Settings = () => {
  const { user, loading, loadUser } = useUserStore();
  const [groqKey, setGroqKey] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [keyLoading, setKeyLoading] = useState(true);

  // Load user profile
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  // ✅ Check existing Groq key on mount
  useEffect(() => {
    const checkExistingKey = async () => {
      if (loading) return;
      
      try {
        setKeyLoading(true);
        const response = await fetch("/api/v1/settings/groq-key", {
          method: 'GET',
          credentials: 'include'
        });
        
        if (response.ok) {
          const data = await response.json();
          setIsConnected(data.hasKey || false);
        }
      } catch (error) {
        console.error('Failed to check existing key:', error);
      } finally {
        setKeyLoading(false);
      }
    };

    checkExistingKey();
  }, [loading]);

  const handleSaveGroqKey = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/v1/settings/groq-key", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groqKey: groqKey.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsConnected(data.hasKey || true);
        setGroqKey("");
        loadUser(); // Refresh user data
      } else {
        const errorData = await response.json();
        console.error("Save error:", errorData);
      }
    } catch (error) {
      console.error("Failed to save Groq key:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || keyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 flex">
      <Sidebar />
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-gray-200">
          <div className="mb-12">
            <h1 className="font-bold text-3xl bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage your API integrations
            </p>
          </div>

          {/* Groq API Key Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/50">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Groq API Key
                </h2>
                <p className="text-lg text-gray-600 font-medium">
                  Lightning-fast AI inference
                </p>
              </div>
            </div>

            {isConnected ? (
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                    <svg
                      className="w-8 h-8 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                      Connected ✅
                    </h3>
                    <p className="text-emerald-700 font-medium">
                      Securely stored and encrypted
                    </p>
                  </div>
                  <button
                    onClick={() => setIsConnected(false)}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-200 shadow-md"
                  >
                    Edit Key
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-slate-200 rounded-3xl p-8 shadow-xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Groq API Key (gsk_...)
                    </label>
                    <input
                      type="password"
                      value={groqKey}
                      onChange={(e) => setGroqKey(e.target.value)}
                      placeholder="gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-lg placeholder-gray-500 shadow-inner bg-white/80"
                    />
                    <p className="text-xs text-gray-500 mt-2 flex items-center">
                      <span className="w-4 h-4 bg-orange-100 rounded-sm flex items-center justify-center mr-2">
                        <span className="text-orange-600 text-xs font-bold">G</span>
                      </span>
                      Get from console.groq.com → API Keys
                    </p>
                  </div>

                  <button
                    onClick={handleSaveGroqKey}
                    disabled={!groqKey.trim() || isSaving}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-500 text-white py-5 px-8 rounded-2xl font-bold text-lg hover:from-orange-700 hover:to-red-600 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSaving ? (
                      <span className="flex items-center justify-center space-x-2">
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            pathLength="1"
                            className="opacity-25"
                          />
                          <path
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                            className="opacity-75"
                          />
                        </svg>
                        Saving to Vault...
                      </span>
                    ) : (
                      "🔒 Save Securely to Vault"
                    )}
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-xs text-slate-700 font-semibold text-center bg-slate-100/80 px-4 py-2 rounded-full inline-block shadow-sm">
                    <span className="inline-flex items-center space-x-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Vault Protected
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="h-12"></div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
