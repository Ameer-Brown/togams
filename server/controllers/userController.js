const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Add bcryptjs dependency

// Create a new user with retry logic
exports.createUser = async (req, res) => {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10);

          userData.password = hashedPassword;
    // Define retry parameters
    const maxRetries = 3;
    let retryCount = 0;

exports.loginUser = (req, res) => {
  // If this function is called, authentication was successful.
  res.json({ message: 'Login successful', user: req.user });
};

    // Function to insert user with retry
    async function insertUserWithRetry() {
        try {
            console.log("DATA 2",userData);
            await User.create(userData);
            console.log(res);
            res.status(201).json({ message: 'User created successfully.' });
        } catch (error) {
            if (retryCount < maxRetries) {
                retryCount++;
                console.log(`Retrying insertion (Attempt ${retryCount})...`, (error));
                await insertUserWithRetry();
            } else {
                console.error("Max retries exceeded. Unable to insert user.", error);
                res.status(500).json({ message: 'Failed to create user.' });
            }
        }
    }

    // Start the initial insertion attempt
    insertUserWithRetry();
};

// Logout user and end the session
exports.logout = (req, res) => {
    console.log("Is authenticated before logout:", req.isAuthenticated());
    req.logout(); // This will clear the login session
    res.json({ message: 'Logout successful' });
};


// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.' });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user.' });
    }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user.' });
    }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user.' });
    }
};

