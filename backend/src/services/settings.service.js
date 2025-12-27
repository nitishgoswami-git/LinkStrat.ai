// backend/services/settings.service.js
import bcrypt from 'bcrypt';
import User from '../models/User.model.js'; // Adjust path to your User model

const SALT_ROUNDS = 10;

export const saveGroqKey = async (userId, groqKey) => {
  // Encrypt the Groq key
  const encryptedKey = await bcrypt.hash(groqKey, SALT_ROUNDS);
  
  // Save to database
  await User.findByIdAndUpdate(userId, {
    groqApiKey: encryptedKey
  });
  
  console.log(`✅ Saved encrypted Groq key for user ${userId}`);
  return true;
};

export const getGroqKey = async (userId) => {
  const user = await User.findById(userId).select('groqApiKey');
  
  if (!user || !user.groqApiKey) {
    return null;
  }
  
  // Return the encrypted key (you'll need the original to compare)
  return user.groqApiKey;
};

// Helper function to verify if a provided key matches the stored hash
export const verifyGroqKey = async (userId, providedKey) => {
  const user = await User.findById(userId).select('groqApiKey');
  
  if (!user || !user.groqApiKey) {
    return false;
  }
  
  return await bcrypt.compare(providedKey, user.groqApiKey);
};