// backend/controllers/settings.controller.js
import { saveGroqKey, getGroqKey } from '../services/settings.service.js';

export const saveGroqKeyController = async (req, res) => {
  try {
    const { groqKey } = req.body;
    
    if (!groqKey || groqKey.trim() === '') {
      return res.status(400).json({ error: 'Groq key is required' });
    }
    
    const userId = req.user.id || req.user._id;
    
    await saveGroqKey(userId, groqKey);
    
    res.json({ success: true, message: 'Groq key saved securely!' });
  } catch (error) {
    console.error('Save error:', error);
    res.status(500).json({ error: 'Failed to save key' });
  }
};

export const getGroqKeyController = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const encryptedKey = await getGroqKey(userId);
    
    if (!encryptedKey) {
      return res.status(404).json({ error: 'No Groq key found' });
    }
    
    // Don't send the actual key, just confirm it exists
    res.json({ success: true, hasKey: true });
  } catch (error) {
    console.error('Get error:', error);
    res.status(500).json({ error: 'Failed to retrieve key' });
  }
};