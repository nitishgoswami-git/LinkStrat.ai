// models/User.model.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    linkedinId: {
      type: String,
      required: true,
      unique: true,
    },
    provider: {
      type: String,
      enum: ['linkedin'],
      default: 'linkedin',
    },
    accessToken: {
      type: String, // Store LinkedIn access token for posting
      required: true,
    },
    refreshToken: {
      type: String, // If LinkedIn provides refresh tokens
    },
    groqKey:{
      type:String,
      required:false

    },
    tokenExpiresAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;