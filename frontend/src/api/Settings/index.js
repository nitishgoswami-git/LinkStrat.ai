import api from "../axios";

export const settingsApi = {
  updateGroqKey: async (groqKey) => {
    const response = await api.patch("/settings/groq-key", {
      groqKey: groqKey
    });
    return response.data;
  },
};