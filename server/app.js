require('dotenv').config();
const express = require('express');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

// MongoDB connection setup
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

client.connect()
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1);
  });

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} request for ${req.url}`);
  next();
});

// Placeholder route for /api/
app.get('/api/', (req, res) => {res.json({ _id: 0, message: 'Root' });});

// Placeholder routes for other endpoints 
app.get('/api/settings', (req, res) => {res.json({ _id: 1, message: 'Personal User Settings' });});
app.get('/api/tours', (req, res) => res.json({ _id: 2, message: 'Tour management placeholder' }));
app.get('/api/inbox', (req, res) => res.json({ _id: 3, message: 'Inbox placeholder' }));
app.get('/api/users', (req, res) => res.json({ _id: 4, message: 'User management placeholder' }));
app.get('/api/music-admin', (req, res) => res.json({ _id: 5, message: 'Music management placeholder' }));
app.get('/api/calendar', (req, res) => res.json({ _id: 6, message: 'Artist progress dashboard placeholder' }));
app.get('/api/home', (req, res) => res.json({ _id: 7, message: 'Customizable HQ dashboard placeholder' }));

// Serve React frontend in production or staging
if (['production', 'staging'].includes(process.env.NODE_ENV)) {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

// 404 handler
app.use((req, res) => {
  res.status(404).send('404: File Not Found');
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

