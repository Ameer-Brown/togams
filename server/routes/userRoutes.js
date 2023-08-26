const express = require('express');
const userController = require('../controllers/userController');
const passport = require('passport');
const router = express.Router();

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
    console.log("Checking authentication...");
    if (req.isAuthenticated()) {
        console.log("User is authenticated.");
        return next();
    } else {
        console.log("User is not authenticated.");
        res.status(401).send({ message: 'Fucking Unauthorized' });
    }
}


// Public Routes

// Sign-up
router.post('/signup', userController.createUser);
console.log("iGot here from API");

// Login
router.post('/login', (req, res, next) => {
    console.log('Attempting to authenticate');
    console.log('req.body:', req.body);
    console.log('req.body:', req.session);
    passport.authenticate('local', (err, user, info) => {
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user: ${JSON.stringify(req.user)}`);
        if (err) {
            console.log('Error:', err);
            return next(err);
        }
        if (!user) {
            console.log("FAILLLL");
            return res.status(401).json({ message: 'Login failed. Incorrect email or password.' });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log('Error while logging in:', err);
                return next(err);
            }
            console.log('Login successful');
            return res.json({ message: 'Login successful', user: req.user });
        });
    })(req, res, next);
});

// Logout
router.post('/logout', userController.logout);
console.log("Logout route defined");

// Protected Routes (require authentication)
// router.use(ensureAuthenticated);

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;


