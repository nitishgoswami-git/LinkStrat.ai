import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // ✅ Ensure email is unique
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
    },
    // ✅ ADD THESE OAUTH FIELDS
    googleId: {
        type: String,
        sparse: true, // Allows null values while maintaining uniqueness when present
    },
    linkedinId: {
        type: String,
        sparse: true,
    },
    provider: {
        type: String,
        enum: ['google', 'linkedin', 'local'], // Only allow these values
        default: 'local',
    },
}, { timestamps: true })

// ✅ ADD INDEXES for faster OAuth lookups
UserSchema.index({ googleId: 1 });
UserSchema.index({ linkedinId: 1 });
UserSchema.index({ email: 1 });

const User = mongoose.model('User', UserSchema, 'users')

export default User