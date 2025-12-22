import React,{useState} from "react";
import { ArrowRight, Sparkles, Calendar, Play } from "lucide-react";

const Demo = () => {
    const [topic, setTopic] = useState("");
  return (
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
                      <div className="text-sm text-gray-500">2 minutes ago</div>
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed text-gray-800">
                    🚀 Just built an AI SEO tool that ranks #1 in 24hrs. Here's
                    the exact tech stack: • Groq API (free tier = 1000s posts) •
                    LangGraph agents • Vercel deploy DM "SEO" for early access
                    👇
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
  );
};

export default Demo;
