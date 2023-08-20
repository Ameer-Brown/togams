const express = require('express');
const userController = require('../controllers/userController');
const passport = require('passport');
const router = express.Router();

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).send({ message: 'Unauthorized' });
    }
}

// Create a new user (Sign-up)
router.post('/signup', userController.createUser);

// Authenticate user and generate session (Login)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Login failed. Incorrect email or password.' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({ message: 'Login successful', user: req.user });
        });
    })(req, res, next);
});

router.get('/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated
    res.json({ authenticated: true, user: req.user });
  } else {
    // User is not authenticated
    res.json({ authenticated: false });
    console.log("NOPE");
  }
});

// Define routes with authentication middleware
router.use(ensureAuthenticated); // Apply authentication middleware to all subsequent routes

// Logout user and end the session
router.post('/logout', (req, res) => {
    req.logout(); // This will clear the login session
    res.json({ message: 'Logout successful' });
});

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById); // Route for updating user
router.delete('/:id', userController.deleteUserById);


module.exports = router;
