import React, { useState } from 'react';
import { X, Info } from 'lucide-react';

const Login = () => {
    const [showModal, setShowModal] = useState(false);

    const handleLinkedInClick = () => {
        setShowModal(true);
    };

    const proceedToLinkedIn = () => {
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
            redirect_uri: 'http://localhost:8000/api/v1/auth/linkedin/loginUser',
            scope: 'openid profile email',
        });
        window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
    };

    const handleGoogle = () => {
        const params = new URLSearchParams({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            redirect_uri: 'http://localhost:8000/api/v1/auth/google/loginUser',
            scope: 'openid email profile',
            response_type: 'code'
        });
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    };

    return (
        <>
            <div className="flex flex-col space-y-3 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg max-w-sm mx-auto">
                <h3 className="text-lg font-semibold text-gray-900 text-center">
                    Connect Your Account
                </h3>
                
                <div className="space-y-3">
                    {/* LinkedIn Button */}
                    <button
                        onClick={handleLinkedInClick}
                        className="group w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#0073b1] to-[#005885] hover:from-[#005885] hover:to-[#004d6f] focus:outline-none focus:ring-2 focus:ring-[#0073b1]/50 focus:ring-offset-2 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    >
                        <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/>
                        </svg>
                        Continue with LinkedIn
                    </button>

                    <p className="text-xs text-gray-600 text-center -mt-1">
                        Connect your LinkedIn profile data
                    </p>

                    {/* Divider */}
                    <div className="flex items-center py-2">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                        <span className="px-3 text-xs text-gray-500 font-medium uppercase tracking-wide flex-shrink-0">or</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                    </div>

                    {/* Google Button */}
                    <button
                        onClick={handleGoogle}
                        className="group w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    >
                        <svg className="w-5 h-5 mr-3 flex-shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.44 1 12.24s.43 3.69 1.18 5.17l2.66-2.08z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </button>

                    <p className="text-xs text-gray-600 text-center -mt-1">
                        Sign in directly with your Google account
                    </p>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
                        {/* Close button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Info className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                            Connect LinkedIn Account
                        </h3>

                        {/* Content */}
                        <div className="space-y-3 mb-6">
                            <p className="text-sm text-gray-600 text-center">
                                To connect your LinkedIn profile, you'll need a LinkedIn password.
                            </p>
                            
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                <p className="text-sm text-gray-700 font-medium mb-2">
                                    📝 Don't have a LinkedIn password?
                                </p>
                                <div className="text-sm text-gray-600 space-y-2">
                                    <p>If you normally sign into LinkedIn with Google:</p>
                                    <ol className="list-decimal list-inside space-y-1 ml-2">
                                        <li>Click "Forgot password?" on the next page</li>
                                        <li>LinkedIn will email you a password reset link</li>
                                        <li>Set a password and return here</li>
                                    </ol>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                                <p className="text-xs text-gray-600">
                                    💡 <span className="font-medium">Alternative:</span> You can skip LinkedIn connection and use Google to sign in. 
                                    LinkedIn connection is optional and can be added later from your profile.
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={proceedToLinkedIn}
                                className="flex-1 py-2.5 px-4 bg-[ #0073b1] hover:bg-[#005885] text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                            >
                                Continue to LinkedIn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;