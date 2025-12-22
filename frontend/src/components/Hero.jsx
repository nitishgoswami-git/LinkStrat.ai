import React from "react";
import { ArrowRight, Sparkles, Calendar, Play } from "lucide-react";

const Hero = () => {
  return (
    <div>
      {" "}
      {/* Hero */}
      <header className="py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2 rounded-full text-white font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            AI LinkedIn Posts → Live in 30s
          </div>

          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
            Your LinkedIn{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Strategist
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Generate viral posts that get 10x engagement. Connect once →
            auto-post forever. No credit card. Built for SaaS founders & devs.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <a
              href="#demo"
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-6 rounded-2xl font-semibold text-lg flex items-center gap-3 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <Play className="w-5 h-5 group-hover:rotate-2 transition" />
              Try Free Demo
            </a>
            <a
              href="/auth"
              className="text-lg font-semibold text-gray-700 hover:text-indigo-600 flex items-center gap-2"
            >
              Connect LinkedIn →
            </a>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Hero;
