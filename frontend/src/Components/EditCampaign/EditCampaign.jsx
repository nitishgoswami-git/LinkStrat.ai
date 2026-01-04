import React, { useState, useEffect } from 'react';

const EditCampaign = ({ campaign, onSave, onClose, onDelete }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(campaign);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load campaign data
  useEffect(() => {
    if (campaign) {
      setFormData(campaign);
      setLoading(false);
    }
  }, [campaign]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      onSave?.(formData);
      onClose?.();
    }, 1000);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      onDelete?.(formData.id);
      onClose?.();
    }, 1000);
  };

  if (loading && !campaign) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black mb-1">Edit Campaign</h2>
              <div className="flex items-center gap-2 text-orange-100 text-sm opacity-90">
                <div className={`w-3 h-3 rounded-full ${campaign?.isActive ? 'bg-emerald-400' : 'bg-orange-400'}`} />
                <span>{campaign?.isActive ? 'Active' : 'Paused'}</span>
                <span>• {campaign?.postsSent || 0} posts sent</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-2xl transition-all hover:scale-105"
              disabled={loading || isDeleting}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-220px)]">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6">
              {/* Campaign Name */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Campaign Name
                </label>
                <input
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  disabled={loading || isDeleting}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-lg font-semibold bg-white/50"
                />
              </div>

              {/* Topic */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Topic Description
                </label>
                <textarea
                  name="topic"
                  value={formData.topic || ''}
                  onChange={handleChange}
                  rows={4}
                  disabled={loading || isDeleting}
                  className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-vertical bg-white/50"
                  placeholder="Latest AI developments, LLM agents, automation trends..."
                />
              </div>

              {/* Status Toggle */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl border-2 border-orange-100">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1">Status</label>
                  <p className="text-xs text-gray-600">Toggle to pause/resume posting</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive || false}
                    onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                    className="sr-only peer"
                    disabled={loading || isDeleting}
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-emerald-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-7"></div>
                </label>
              </div>

              {/* Schedule & Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-3xl border border-gray-200">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Schedule</label>
                  <select
                    name="schedule"
                    value={formData.schedule || 'daily'}
                    onChange={handleChange}
                    disabled={loading || isDeleting}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="daily">Daily • 10AM</option>
                    <option value="weekdays">Weekdays • 10AM</option>
                    <option value="weekly">Weekly • Mon 10AM</option>
                  </select>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Posts Sent</span>
                    <span className="font-bold text-xl text-gray-900">{formData.postsSent || 0}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Next Post</span>
                    <span className="font-bold text-emerald-600">{formData.nextPost || 'Today 10AM'}</span>
                  </div>
                </div>
              </div>

              {/* Next Post Preview */}
              <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-3xl border-2 border-emerald-100">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">
                      {formData.nextPreview || 'AI agents revolutionizing workflows...'}
                    </p>
                    <p className="text-sm text-emerald-700 font-semibold">
                      Next: <span className="text-gray-900">{formData.nextPost || '2 hours'}</span>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50/50 backdrop-blur-sm px-6 py-5 border-t border-gray-100 flex gap-3 justify-end">
          <button
            onClick={handleDelete}
            disabled={loading || isDeleting}
            className="px-6 py-3 text-red-600 font-bold border border-red-200 rounded-2xl hover:bg-red-50 hover:shadow-md transition-all disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Campaign'}
          </button>
          
          <button
            type="button"
            onClick={onSave ? handleSave : onClose}
            disabled={loading || isDeleting}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-black rounded-2xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-600 hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </div>
            ) : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCampaign;
