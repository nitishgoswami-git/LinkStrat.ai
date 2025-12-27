import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
    },
    // OAuth fields
    googleId: {
        type: String,
        sparse: true,
    },
    linkedinId: {
        type: String,
        sparse: true,
    },
    provider: {
        type: String,
        enum: ['google', 'linkedin', 'local'],
        default: 'local',
    },
    
    groqApiKey: {
        type: String,
        
    },
}, { timestamps: true });

// Indexes for faster lookups
UserSchema.index({ googleId: 1 });
UserSchema.index({ linkedinId: 1 });
UserSchema.index({ email: 1 });

const User = mongoose.model('User', UserSchema, 'users');

export default User;