import React, { useState } from "react";
// import { Link } from 'react-router-dom'
import { Linkedin, ArrowRight, Sparkles, Calendar, Play } from "lucide-react";

const Landing = () => {
  const [topic, setTopic] = useState("");
  return (
    <>
      {/* Navbar */}
      <div className="flex p-2 text-white items-center justify-between">
        <img src="/vite.svg" />
        <button className="bg-gradient-to-r from-indigo-800 to-blue-600 rounded-xl p-2 flex font-bold items-center gap-2">
          <Linkedin
            fill="white"
            size="30"
            className="bg-blue-600 p-1 rounded-md"
          />
          Connect Linkedin
        </button>
      </div>
      {/* Hero Section */}
      <div>
        {" "}
        {/* Demo Section */}
        <section id="demo" className="py-32 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Topic → Viral Post →{" "}
                <span className="text-indigo-600">Published</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Watch AI craft your next LinkedIn banger in real-time
              </p>
            </div>

            {/* Live Demo */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-50 to-indigo-50 p-12 rounded-3xl shadow-2xl">
              <div className="grid md:grid-cols-3 gap-8 items-end">
                {/* Input */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your topic
                  </label>
                  <input
                    type="text"
                    placeholder="AI SEO tools for indie hackers"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl text-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                  />
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Generate Post
                  </button>
                </div>

                {/* Arrow */}
                <div className="hidden md:block">
                  <div className="flex flex-col items-center gap-4 p-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl">
                      <ArrowRight className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-center text-sm text-gray-500 font-medium rotate-[-25deg] whitespace-nowrap">
                      AI Magic ✨
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-4">
                  <div className="bg-white border-2 border-indigo-100 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          LinkStrat.ai
                        </div>
                        <div className="text-sm text-gray-500">
                          2 minutes ago
                        </div>
                      </div>
                    </div>

                    <p className="text-lg leading-relaxed text-gray-800">
                      🚀 Just built an AI SEO tool that ranks #1 in 24hrs.
                      Here's the exact tech stack: • Groq API (free tier = 1000s
                      posts) • LangGraph agents • Vercel deploy DM "SEO" for
                      early access 👇
                    </p>

                    <div className="flex gap-2 mt-8 pt-6 border-t border-gray-100">
                      <button className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-xl text-sm font-medium transition-colors">
                        💬 Comment
                      </button>
                      <button className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl text-sm font-medium transition-colors">
                        📅 Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Features Section */}
      <div>
        {" "}
        {/* Features */}
        <section className="py-32 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8">
                <Calendar className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Auto-Schedule
                </h3>
                <p className="text-lg text-gray-600">
                  Post at peak times automatically. Never miss your audience.
                </p>
              </div>
              <div className="text-center p-8">
                <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  4E Strategy
                </h3>
                <p className="text-lg text-gray-600">
                  AI trained on viral posts: Educate, Entertain, Engage,
                  Empower.
                </p>
              </div>
              <div className="text-center p-8">
                <ArrowRight className="w-16 h-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  1-Click Post
                </h3>
                <p className="text-lg text-gray-600">
                  Official LinkedIn API. No bots, no bans, just results.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Footer Section */}
       <div>
      {" "}
      {/* Footer CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to 10x your LinkedIn?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Connect your account. Generate your first post. Watch engagement
            explode.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/auth"
              className="bg-white text-indigo-600 px-12 py-6 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-2xl"
            >
              Start Free (1 min)
            </a>
            <a
              href="#demo"
              className="border-2 border-white px-12 py-6 rounded-2xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all"
            >
              Watch Demo
            </a>
          </div>
          <p className="mt-8 text-sm opacity-75">
            No credit card • Cancel anytime • Built by devs for devs
          </p>
        </div>
      </section>
    </div>
    </>
  );
};

export default Landing;
