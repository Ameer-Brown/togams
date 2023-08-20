require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const crypto = require('crypto');
const app = express();
const port = process.env.PORT || 3000;

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());

// MongoDB connection setup using Mongoose
const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log("Successfully connected to MongoDB!");
})
.catch(err => {
  console.error("Error connecting to MongoDB", err);
  process.exit(1);
});

// Initialize Passport and use sessions
app.use(session({
    secret: crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// // Configure Passport to use LocalStrategy
// passport.use(new LocalStrategy(
//     { usernameField: 'email' },
//     async (email, password, done) => {
//         try {
//             const user = await User.findOne({ email: email });
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect email.' });
//             }
//             if (!await bcrypt.compare(password, user.password)) {
//                 return done(null, false, { message: 'Incorrect password.' });
//             }
//             return done(null, user);
//         } catch (err) {
//             return done(err);
//         }
//     }
// ));

// // Serialize user instance to the session
// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// // Deserialize user from the session
// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await User.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Placeholder routes for other endpoints 
app.get('/api/', (req, res) => { res.json({ _id: 0, message: 'Root' }); });
app.use('/api/users', userRoutes);
app.get('/api/settings', (req, res) => { res.json({ _id: 1, message: 'Personal User Settings' }); });
app.get('/api/tours', (req, res) => res.json({ _id: 2, message: 'Tour management placeholder' }));
app.get('/api/inbox', (req, res) => res.json({ _id: 3, message: 'Inbox placeholder' }));
app.get('/api/users', (req, res) => res.json({ _id: 4, message: 'User management placeholder' }));
app.get('/api/music-admin', (req, res) => res.json({ _id: 5, message: 'Music management placeholder' }));
app.get('/api/calendar', (req, res) => res.json({ _id: 6, message: 'Artist progress dashboard placeholder' }));
app.get('/api/home', (req, res) => res.json({ _id: 7, message: 'Customizable HQ dashboard placeholder' }));

if (['production', 'staging'].includes(process.env.NODE_ENV)) {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

app.use((req, res) => {
  res.status(404).send('404: File Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
