const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    // ... other fields for user data ...

    role: {
        type: String,
        required: true,
        enum:['Executive Manager', 'Label Manager', 'Label Team', 'Daily Manager', 'Legal Team', 'Touring Team', 'Merch Team', 'Content Team', 'A&R Team', 'Financial Advisor']}, // User roles

    accessLevel: { type: Number, required: true }, // Access level

});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
