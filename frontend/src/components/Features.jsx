import React from 'react'
import { ArrowRight, Sparkles, Calendar, Play } from "lucide-react";
const Features = () => {
  return (
    <div>      {/* Features */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <Calendar className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Auto-Schedule</h3>
              <p className="text-lg text-gray-600">Post at peak times automatically. Never miss your audience.</p>
            </div>
            <div className="text-center p-8">
              <Sparkles className="w-16 h-16 text-purple-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">4E Strategy</h3>
              <p className="text-lg text-gray-600">AI trained on viral posts: Educate, Entertain, Engage, Empower.</p>
            </div>
            <div className="text-center p-8">
              <ArrowRight className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1-Click Post</h3>
              <p className="text-lg text-gray-600">Official LinkedIn API. No bots, no bans, just results.</p>
            </div>
          </div>
        </div>
      </section></div>
  )
}

export default Features