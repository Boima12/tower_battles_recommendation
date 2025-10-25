const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Account schema
const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format']
    },
    phone: {
        type: String, // Store as string to preserve leading zeros or country codes
        required: false,
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'] // E.164 standard
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false // Don’t return password by default when querying
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Automatically hash password before saving
accountSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare candidate password with stored hash
accountSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Update `updatedAt` timestamp on update
accountSchema.pre('findOneAndUpdate', function (next) {
    this.set({ updatedAt: new Date() });
    next();
});

module.exports = mongoose.model('Account', accountSchema);
