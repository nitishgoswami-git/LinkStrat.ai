import React, { useState } from 'react';

const NewCampaign = ({ onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    topic: '',
    schedule: 'daily',
    time: '10:00',
    tone: 'professional',
    length: 'medium',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate?.(formData);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black mb-1">New Campaign</h2>
              <p className="text-emerald-100 text-sm opacity-90">
                Step {step} of 3 • AI-powered LinkedIn automation
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-2xl transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mt-4">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Step 1: Basics */}
          {step === 1 && (
            <div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Campaign Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="AI Trends 2025"
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-lg font-semibold"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Main Topic
                  </label>
                  <textarea
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="Latest AI developments, LLM agents, automation trends..."
                    rows={4}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-vertical"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    className="p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekdays">Weekdays</option>
                    <option value="weekly">Weekly</option>
                    <option value="custom">Custom</option>
                  </select>
                  
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Post Time</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Tone</label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="professional">Professional</option>
                    <option value="casual">Casual</option>
                    <option value="thought-leadership">Thought Leadership</option>
                    <option value="storytelling">Storytelling</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Length</label>
                  <select
                    name="length"
                    value={formData.length}
                    onChange={handleChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  >
                    <option value="short">Short (100 words)</option>
                    <option value="medium">Medium (250 words)</option>
                    <option value="long">Long (500+ words)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preview & Confirm */}
          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">{formData.name}</h3>
                <p className="text-gray-600 text-lg mb-1">{formData.topic}</p>
                <p className="text-sm text-gray-500">
                  {formData.schedule} at {formData.time} • {formData.tone} • {formData.length}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="bg-gray-50/50 backdrop-blur-sm px-6 py-5 border-t border-gray-100 flex gap-3 justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 text-gray-700 font-semibold border border-gray-200 rounded-2xl hover:bg-gray-100 hover:shadow-md transition-all"
            >
              Previous
            </button>
          )}
          
          <div className="flex-1 flex justify-end gap-3">
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:bg-emerald-600 hover:scale-105 transition-all"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-lg rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 hover:from-emerald-600 hover:to-teal-700 transition-all border border-emerald-200"
              >
                🚀 Create Campaign
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCampaign;
